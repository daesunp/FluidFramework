/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { assert } from "@fluidframework/core-utils/internal";

import type { ConnectedClientId } from "./baseTypes.js";
import type { InternalTypes } from "./exposedInternalTypes.js";
import type { ClientRecord } from "./internalTypes.js";
import type { ISessionClient } from "./presence.js";
import { handleFromDatastore, type StateDatastore } from "./stateDatastore.js";
import type { PresenceStates, PresenceStatesMethods, PresenceStatesSchema } from "./types.js";
import { unbrandIVM } from "./valueManager.js";

/**
 * @internal
 */
export type MapSchemaElement<
	TSchema extends PresenceStatesSchema,
	Part extends keyof ReturnType<TSchema[keyof TSchema]>,
	Keys extends keyof TSchema = keyof TSchema,
> = ReturnType<TSchema[Keys]>[Part];

/**
 * @internal
 */
export interface PresenceRuntime {
	clientId(): ConnectedClientId | undefined;
	lookupClient(clientId: ConnectedClientId): ISessionClient;
	localUpdate(stateKey: string, value: ClientUpdateEntry, forceBroadcast: boolean): void;
}

type PresenceSubSchemaFromWorkspaceSchema<
	TSchema extends PresenceStatesSchema,
	Part extends keyof ReturnType<TSchema[keyof TSchema]>,
> = {
	[Key in keyof TSchema]: MapSchemaElement<TSchema, Part, Key>;
};

type MapEntries<TSchema extends PresenceStatesSchema> = PresenceSubSchemaFromWorkspaceSchema<
	TSchema,
	"manager"
>;

/**
 * ValueElementMap is a map of key to a map of clientId to ValueState.
 * It is not restricted to the schema of the map as it may receive updates from other clients
 * with managers that have not been registered locally. Each map node is responsible for keeping
 * all sessions state to be able to pick arbitrary client to rebroadcast to others.
 *
 * This generic aspect makes some typing difficult. The loose typing is not broadcast to the
 * consumers that are expected to maintain their schema over multiple versions of clients.
 *
 * @internal
 */
export interface ValueElementMap<_TSchema extends PresenceStatesSchema> {
	[key: string]: ClientRecord<InternalTypes.ValueDirectoryOrState<unknown>>;
}

// An attempt to make the type more precise, but it is not working.
// If the casting in support code is too much we could keep two references to the same
// complete datastore, but with the respective types desired.
// type ValueElementMap<TSchema extends PresenceStatesNodeSchema> =
// 	| {
// 			[Key in keyof TSchema & string]?: {
// 				[ClientId: ClientId]: InternalTypes.ValueDirectoryOrState<MapSchemaElement<TSchema,"value",Key>>;
// 			};
// 	  }
// 	| {
// 			[key: string]: ClientRecord<InternalTypes.ValueDirectoryOrState<unknown>>;
// 	  };
// interface ValueElementMap<TValue> {
// 	[Id: string]: ClientRecord<InternalTypes.ValueDirectoryOrState<TValue>>;
// 	// Version with local packed in is convenient for map, but not for join broadcast to serialize simply.
// 	// [Id: string]: {
// 	// 	local: InternalTypes.ValueDirectoryOrState<TValue>;
// 	// 	all: ClientRecord<InternalTypes.ValueDirectoryOrState<TValue>>;
// 	// };
// }

/**
 * @internal
 */
export type ClientUpdateEntry = InternalTypes.ValueDirectoryOrState<unknown> & {
	ignoreUnmonitored?: true;
};

type ClientUpdateRecord = ClientRecord<ClientUpdateEntry>;

interface ValueUpdateRecord {
	[valueKey: string]: ClientUpdateRecord;
}

/**
 * @internal
 */
export interface PresenceStatesInternal {
	ensureContent<TSchemaAdditional extends PresenceStatesSchema>(
		content: TSchemaAdditional,
	): PresenceStates<TSchemaAdditional>;
	onConnect(clientId: ConnectedClientId): void;
	processUpdate(
		received: number,
		timeModifier: number,
		remoteDatastore: ValueUpdateRecord,
	): void;
}

function isValueDirectory<
	T,
	TValueState extends
		| InternalTypes.ValueRequiredState<T>
		| InternalTypes.ValueOptionalState<T>,
>(
	value: InternalTypes.ValueDirectory<T> | TValueState,
): value is InternalTypes.ValueDirectory<T> {
	return "items" in value;
}

function mergeValueDirectory<
	T,
	TValueState extends
		| InternalTypes.ValueRequiredState<T>
		| InternalTypes.ValueOptionalState<T>,
>(
	base: TValueState | InternalTypes.ValueDirectory<T> | undefined,
	update: TValueState | InternalTypes.ValueDirectory<T>,
	timeDelta: number,
): TValueState | InternalTypes.ValueDirectory<T> {
	if (!isValueDirectory(update)) {
		if (base === undefined || update.rev > base.rev) {
			return { ...update, timestamp: update.timestamp + timeDelta };
		}
		return base;
	}

	let mergeBase: InternalTypes.ValueDirectory<T>;
	if (base === undefined) {
		mergeBase = { rev: update.rev, items: {} };
	} else {
		const baseIsDirectory = isValueDirectory(base);
		if (base.rev >= update.rev) {
			if (!baseIsDirectory) {
				// base is leaf value that is more recent - nothing to do
				return base;
			}
			// While base has more advanced revision, assume mis-ordering or
			// missed and catchup update needs merged in.
			mergeBase = base;
		} else {
			mergeBase = { rev: update.rev, items: baseIsDirectory ? base.items : {} };
		}
	}
	for (const [key, value] of Object.entries(update.items)) {
		const baseElement = mergeBase.items[key];
		mergeBase.items[key] = mergeValueDirectory(baseElement, value, timeDelta);
	}
	return mergeBase;
}

/**
 * Updates remote state into the local [untracked] datastore.
 *
 * @param key - The key of the datastore to merge the untracked data into.
 * @param remoteAllKnownState - The remote state to merge into the datastore.
 * @param datastore - The datastore to merge the untracked data into.
 *
 * @remarks
 * In the case of ignored unmonitored data, the client entries are not stored,
 * though the value keys will be populated and often remain empty.
 *
 * @internal
 */
export function mergeUntrackedDatastore(
	key: string,
	remoteAllKnownState: ClientUpdateRecord,
	datastore: ValueElementMap<PresenceStatesSchema>,
	timeModifier: number,
): void {
	if (!(key in datastore)) {
		datastore[key] = {};
	}
	const localAllKnownState = datastore[key];
	for (const [clientId, value] of Object.entries(remoteAllKnownState)) {
		if (!("ignoreUnmonitored" in value)) {
			localAllKnownState[clientId] = mergeValueDirectory(
				localAllKnownState[clientId],
				value,
				timeModifier,
			);
		}
	}
}

class PresenceStatesImpl<TSchema extends PresenceStatesSchema>
	implements
		PresenceStatesInternal,
		PresenceStatesMethods<TSchema, unknown>,
		StateDatastore<
			keyof TSchema & string,
			MapSchemaElement<TSchema, "value", keyof TSchema & string>
		>
{
	public readonly nodes: MapEntries<TSchema>;

	public constructor(
		private readonly runtime: PresenceRuntime,
		private readonly datastore: ValueElementMap<TSchema>,
		initialContent: TSchema,
	) {
		// Prepare initial map content from initial state
		{
			const clientId = this.runtime.clientId();
			// eslint-disable-next-line unicorn/no-array-reduce
			const initial = Object.entries(initialContent).reduce(
				(acc, [key, nodeFactory]) => {
					const newNodeData = nodeFactory(key, handleFromDatastore(this));
					acc.nodes[key as keyof TSchema] = newNodeData.manager;
					acc.datastore[key] = acc.datastore[key] ?? {};
					if (clientId !== undefined && clientId) {
						acc.datastore[key][clientId] = newNodeData.value;
					}
					return acc;
				},
				{
					nodes: {} as unknown as MapEntries<TSchema>,
					datastore,
				},
			);
			this.nodes = initial.nodes;
		}
	}

	public onConnect(clientId: ConnectedClientId): void {
		for (const [key, allKnownState] of Object.entries(this.datastore)) {
			if (key in this.nodes) {
				allKnownState[clientId] = unbrandIVM(this.nodes[key]).value;
			}
		}
	}

	public knownValues<Key extends keyof TSchema & string>(
		key: Key,
	): {
		self: string | undefined;
		states: ClientRecord<MapSchemaElement<TSchema, "value", Key>>;
	} {
		return {
			self: this.runtime.clientId(),
			states: this.datastore[key],
		};
	}

	public localUpdate<Key extends keyof TSchema & string>(
		key: Key,
		value: MapSchemaElement<TSchema, "value", Key> & ClientUpdateEntry,
		_forceBroadcast: boolean,
	): void {
		this.runtime.localUpdate(key, value, _forceBroadcast);
	}

	public update<Key extends keyof TSchema & string>(
		key: Key,
		clientId: string,
		value: MapSchemaElement<TSchema, "value", Key>,
	): void {
		const allKnownState = this.datastore[key];
		allKnownState[clientId] = mergeValueDirectory(allKnownState[clientId], value, 0);
	}

	public lookupClient(clientId: ConnectedClientId): ISessionClient {
		return this.runtime.lookupClient(clientId);
	}

	public add<
		TKey extends string,
		TValue extends InternalTypes.ValueDirectoryOrState<unknown>,
		TValueManager,
	>(
		key: TKey,
		nodeFactory: InternalTypes.ManagerFactory<TKey, TValue, TValueManager>,
	): asserts this is PresenceStates<
		TSchema & Record<TKey, InternalTypes.ManagerFactory<TKey, TValue, TValueManager>>
	> {
		assert(!(key in this.nodes), "Already have entry for key in map");
		const nodeData = nodeFactory(key, handleFromDatastore(this));
		this.nodes[key] = nodeData.manager;
		if (key in this.datastore) {
			// Already have received state from other clients. Kept in `all`.
			// TODO: Send current `all` state to state manager.
		} else {
			this.datastore[key] = {};
		}
		// If we have a clientId, then add the local state entry to the all state.
		const clientId = this.runtime.clientId();
		if (clientId !== undefined && clientId) {
			this.datastore[key][clientId] = nodeData.value;
		}
	}

	public ensureContent<TSchemaAdditional extends PresenceStatesSchema>(
		content: TSchemaAdditional,
	): PresenceStates<TSchema & TSchemaAdditional> {
		for (const [key, nodeFactory] of Object.entries(content)) {
			this.add(key, nodeFactory);
		}
		return this as PresenceStates<TSchema & TSchemaAdditional>;
	}

	public processUpdate(
		received: number,
		timeModifier: number,
		remoteDatastore: ValueUpdateRecord,
	): void {
		for (const [key, remoteAllKnownState] of Object.entries(remoteDatastore)) {
			if (key in this.nodes) {
				const node = unbrandIVM(this.nodes[key]);
				for (const [clientId, value] of Object.entries(remoteAllKnownState)) {
					const client = this.runtime.lookupClient(clientId);
					node.update(client, received, value);
				}
			} else {
				// Assume all broadcast state is meant to be kept even if not currently registered.
				mergeUntrackedDatastore(key, remoteAllKnownState, this.datastore, timeModifier);
			}
		}
	}
}

/**
 * Create a new PresenceStates using the DataStoreRuntime provided.
 * @param initialContent - The initial value managers to register.
 */
export function createPresenceStates<TSchema extends PresenceStatesSchema>(
	runtime: PresenceRuntime,
	datastore: ValueElementMap<PresenceStatesSchema>,
	initialContent: TSchema,
): { public: PresenceStates<TSchema>; internal: PresenceStatesInternal } {
	const impl = new PresenceStatesImpl(runtime, datastore, initialContent);

	// Capture the top level "public" map. Both the map implementation and
	// the wrapper object reference this object.
	const nodes = impl.nodes;

	// Create a wrapper object that has just the public interface methods and nothing more.
	const wrapper = {
		add: impl.add.bind(impl),
	};

	return {
		public: new Proxy(wrapper as PresenceStates<TSchema>, {
			get(target, p, receiver): unknown {
				if (typeof p === "string") {
					return target[p] ?? nodes[p];
				}
				return Reflect.get(target, p, receiver);
			},
			set(_target, _p, _newValue, _receiver): false {
				return false;
			},
		}),
		internal: impl,
	};
}