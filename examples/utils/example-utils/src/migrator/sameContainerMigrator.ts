/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { TypedEventEmitter } from "@fluid-internal/client-utils";
import { assert } from "@fluidframework/core-utils";
import type {
	DataTransformationCallback,
	ISameContainerMigratableModel,
	ISameContainerMigrator,
	ISameContainerMigratorEvents,
	SameContainerMigrationState,
} from "../migrationInterfaces";
import type { IModelLoader, IDetachedModel } from "../modelLoader";

// TODO: Note that this class is far from the expected state - it effectively does nothing since takeAppropriateActionForCurrentMigratable is commented out.
// Eventually it will be in charge of extracting the v1 data and calling migrationTool.finalizeMigration() with the transformed summary, but for now it's probably best to ignore it.
export class SameContainerMigrator
	extends TypedEventEmitter<ISameContainerMigratorEvents>
	implements ISameContainerMigrator
{
	private _currentModel: ISameContainerMigratableModel;
	public get currentModel(): ISameContainerMigratableModel {
		return this._currentModel;
	}

	private _currentModelId: string;
	public get currentModelId(): string {
		return this._currentModelId;
	}

	public get migrationState(): SameContainerMigrationState {
		return this._currentModel.migrationTool.migrationState;
	}

	public get connected(): boolean {
		return this._currentModel.connected();
	}

	/**
	 * If migration is in progress, the promise that will resolve when it completes.  Mutually exclusive with
	 * _migratedLoadP promise.
	 */
	private _migrationP: Promise<void> | undefined;

	/**
	 * If loading the migrated container is in progress, the promise that will resolve when it completes.  Mutually
	 * exclusive with _migrationP promise.
	 */
	private _migratedLoadP: Promise<void> | undefined;

	/**
	 * Detached model that is ready to attach. This is stored for retry scenarios.
	 */
	private _preparedDetachedModel: IDetachedModel<ISameContainerMigratableModel> | undefined;

	public constructor(
		private readonly modelLoader: IModelLoader<ISameContainerMigratableModel>,
		initialMigratable: ISameContainerMigratableModel,
		initialId: string,
		private readonly dataTransformationCallback?: DataTransformationCallback,
	) {
		super();
		this._currentModel = initialMigratable;
		this._currentModelId = initialId;
		this._currentModel.migrationTool.setContainerRef(this._currentModel.container);
		this.takeAppropriateActionForCurrentMigratable();
	}

	/**
	 * This method makes no assumptions about the state of the current migratable - this is particularly important
	 * for the case that we just finished loading a migrated container, but that migrated container is also either
	 * in the process of migrating or already migrated (and thus we need to load again).  It is not safe to assume
	 * that a freshly-loaded migrated container is in collaborating state.
	 */
	private readonly takeAppropriateActionForCurrentMigratable = () => {
		// TODO: Real stuff
		// const migrationState = this._currentModel.migrationTool.migrationState;
		// if (migrationState === "migrating") {
		// 	this.ensureMigrating();
		// } else if (migrationState === "migrated") {
		// 	this.ensureLoading();
		// } else {
		// 	this._currentModel.migrationTool.once(
		// 		"migrating",
		// 		this.takeAppropriateActionForCurrentMigratable,
		// 	);
		// }
		// TODO: One responsibility here will be generating the v2 summary

		// TODO: Remove this log when actually using.
		console.info(
			"Just logging these to quiet the 'unused member' error: ",
			this.ensureMigrating,
			this.ensureLoading,
		);
	};

	private readonly ensureMigrating = () => {
		// ensureMigrating() is called when we reach the "migrating" state. This should likely only happen once, but
		// can happen multiple times if we disconnect during the migration process.

		if (!this.connected) {
			// If we are not connected we should wait until we reconnect and try again. Note: we re-enter the state
			// machine, since its possible another client has already completed the migration by the time we reconnect.
			this.currentModel.once("connected", this.takeAppropriateActionForCurrentMigratable);
			return;
		}

		if (this._migrationP !== undefined) {
			return;
		}

		if (this._migratedLoadP !== undefined) {
			throw new Error("Cannot perform migration, we are currently trying to load");
		}

		const migratable = this._currentModel;
		const acceptedVersion = migratable.migrationTool.acceptedVersion;
		if (acceptedVersion === undefined) {
			throw new Error("Expect an accepted version before migration starts");
		}

		const doTheMigration = async () => {
			// doTheMigration() is called at the start of migration and should only resolve in two cases. First, is if
			// either the local or another client successfully completes the migration. Second, is if we disconnect
			// during the migration process. In both cases we should re-enter the state machine and take the
			// appropriate action (see then() block below).

			const prepareTheMigration = async () => {
				// It's possible that our modelLoader is older and doesn't understand the new acceptedVersion.
				// Currently this fails the migration gracefully and emits an event so the app developer can know
				// they're stuck. Ideally the app developer would find a way to acquire a new ModelLoader and move
				// forward, or at least advise the end user to refresh the page or something.
				// TODO: Does the app developer have everything they need to dispose gracefully when recovering with
				// a new ModelLoader?
				const migrationSupported = await this.modelLoader.supportsVersion(acceptedVersion);
				if (!migrationSupported) {
					this.emit("migrationNotSupported", acceptedVersion);
					this._migrationP = undefined;
					return;
				}

				const detachedModel = await this.modelLoader.createDetached(acceptedVersion);
				const migratedModel = detachedModel.model;

				const exportedData = await migratable.exportData();

				// TODO: Is there a reasonable way to validate at proposal time whether we'll be able to get the
				// exported data into a format that the new model can import?  If we can determine it early, then
				// clients with old ModelLoaders can use that opportunity to dispose early and try to get new
				// ModelLoaders.
				let transformedData: unknown;
				if (migratedModel.supportsDataFormat(exportedData)) {
					// If the migrated model already supports the data format, go ahead with the migration.
					transformedData = exportedData;
				} else if (this.dataTransformationCallback !== undefined) {
					// Otherwise, try using the dataTransformationCallback if provided to get the exported data into
					// a format that we can import.
					try {
						transformedData = await this.dataTransformationCallback(
							exportedData,
							migratedModel.version,
						);
					} catch {
						// TODO: This implies that the contract is to throw if the data can't be transformed, which
						// isn't great.  How should the dataTransformationCallback indicate failure?
						this.emit("migrationNotSupported", acceptedVersion);
						this._migrationP = undefined;
						return;
					}
				} else {
					// We can't get the data into a format that we can import, give up.
					this.emit("migrationNotSupported", acceptedVersion);
					this._migrationP = undefined;
					return;
				}
				await migratedModel.importData(transformedData);

				// Store the detached model for later use and retry scenarios
				this._preparedDetachedModel = detachedModel;
			};

			const completeTheMigration = async () => {
				assert(
					this._preparedDetachedModel !== undefined,
					"this._preparedDetachedModel should be defined",
				);

				// TODO: This is substantially different now
			};

			// Prepare the detached model if we haven't already.
			if (this._preparedDetachedModel === undefined) {
				await prepareTheMigration();
			}

			// Ensure another client has not already completed the migration.
			// TODO: Real stuff
			// if (this.migrationState !== "migrating") {
			// 	return;
			// }

			await completeTheMigration();
		};

		this.emit("migrating");

		this._migrationP = doTheMigration()
			.then(() => {
				// We assume that if we resolved that either the migration was completed or we disconnected.
				// In either case, we should re-enter the state machine to take the appropriate action.
				if (this.connected) {
					// We assume if we are still connected after exiting the loop, then we should be in the "migrated"
					// state. The following assert validates this assumption.
					// assert(
					// 	this.currentModel.migrationTool.newContainerId !== undefined,
					// 	"newContainerId should be defined",
					// );
				}
				this._migrationP = undefined;
				this.takeAppropriateActionForCurrentMigratable();
			})
			.catch(console.error);
	};

	private readonly ensureLoading = () => {
		// We assume ensureLoading() is called a single time after we reach the "migrated" state.

		if (this._migratedLoadP !== undefined) {
			return;
		}

		if (this._migrationP !== undefined) {
			throw new Error("Cannot start loading the migrated before migration is complete");
		}

		const migratable = this._currentModel;
		const acceptedVersion = migratable.migrationTool.acceptedVersion;
		if (acceptedVersion === undefined) {
			throw new Error("Expect an accepted version before migration starts");
		}

		const doTheLoad = async () => {
			// doTheLoad() should only be called once. It will resolve once we complete loading.

			const migrationSupported = await this.modelLoader.supportsVersion(acceptedVersion);
			if (!migrationSupported) {
				this.emit("migrationNotSupported", acceptedVersion);
				this._migratedLoadP = undefined;
				return;
			}
			// TODO this should be a reload of the same container basically
			const migratedId = "foobar";
			const migrated = await this.modelLoader.loadExisting(migratedId);
			// Note: I'm choosing not to close the old migratable here, and instead allow the lifecycle management
			// of the migratable to be the responsibility of whoever created the Migrator (and handed it its first
			// migratable).  It could also be fine to close here, just need to have an explicit contract to clarify
			// who is responsible for managing that.
			this._currentModel = migrated;
			this._currentModelId = migratedId;
			this.emit("migrated", migrated, migratedId);
			this._migratedLoadP = undefined;

			// Reset retry values
			this._preparedDetachedModel = undefined;

			// Only once we've completely finished with the old migratable, start on the new one.
			this.takeAppropriateActionForCurrentMigratable();
		};

		this._migratedLoadP = doTheLoad().catch(console.error);
	};
}
