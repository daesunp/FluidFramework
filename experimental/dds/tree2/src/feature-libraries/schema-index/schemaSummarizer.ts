/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { bufferToString } from "@fluid-internal/client-utils";
import { assert } from "@fluidframework/core-utils";
import {
	IFluidDataStoreRuntime,
	IChannelStorageService,
} from "@fluidframework/datastore-definitions";
import {
	ITelemetryContext,
	ISummaryTreeWithStats,
	IGarbageCollectionData,
	IExperimentalIncrementalSummaryContext,
} from "@fluidframework/runtime-definitions";
import { ICodecOptions, IJsonCodec } from "../../codec";
import { MutableTreeStoredSchema, TreeStoredSchema, schemaDataIsEmpty } from "../../core";
import {
	Summarizable,
	SummaryElementParser,
	SummaryElementStringifier,
} from "../../shared-tree-core";
import { JsonCompatible } from "../../util";
import { Format } from "./format";
import { encodeRepo, makeSchemaCodec } from "./codec";

const schemaStringKey = "SchemaString";

/**
 * Manages the collaboration window for incremental summarization.
 */
export interface CollabWindow {
	/**
	 * Function which returns the most recent sequenceNumber on a message processed by `SharedTree`.
	 * Updated before processing an op, such that reading `currentSeq` while processing an op
	 * gives the sequenceNumber of the op currently being processed.
	 * `undefined` if no message has been processed, e.g. for a detached document or document loaded
	 * from summary without any subsequent ops.
	 * @remarks - Most rebasing is built atop a revision system decoupled from message sequence number.
	 * However, this is sometimes necessary to interop with Fluid runtime APIs, e.g. for incremental summarization.
	 */
	getCurrentSeq: () => number | undefined;
}
/**
 * Provides methods for summarizing and loading a schema repository.
 */
export class SchemaSummarizer implements Summarizable {
	public readonly key = "Schema";

	private readonly codec: IJsonCodec<TreeStoredSchema, Format>;

	private schemaIndexLastChangedSeq: number | undefined;

	public constructor(
		private readonly runtime: IFluidDataStoreRuntime,
		private readonly schema: MutableTreeStoredSchema,
		options: ICodecOptions,
		collabWindow: CollabWindow,
	) {
		this.codec = makeSchemaCodec(options);
		this.schema.on("afterSchemaChange", () => {
			// Invalidate the cache, as we need to regenerate the blob if the schema changes
			// We are assuming that schema changes from remote ops are valid, as we are in a summarization context.
			this.schemaIndexLastChangedSeq = collabWindow.getCurrentSeq();
		});
	}

	public getAttachSummary(
		stringify: SummaryElementStringifier,
		fullTree?: boolean,
		trackState?: boolean,
		telemetryContext?: ITelemetryContext,
		incrementalSummaryContext?: IExperimentalIncrementalSummaryContext | undefined,
	): ISummaryTreeWithStats {
		const builder = new SummaryTreeBuilder();
		if (
			incrementalSummaryContext !== undefined &&
			this.schemaIndexLastChangedSeq !== undefined &&
			incrementalSummaryContext.latestSummarySequenceNumber >= this.schemaIndexLastChangedSeq
		) {
			builder.addHandle(
				schemaStringKey,
				SummaryType.Blob,
				`${incrementalSummaryContext.summaryPath}/indexes/${this.key}/${schemaStringKey}`,
			);
		} else {
			const dataString = JSON.stringify(this.codec.encode(this.schema));
			builder.addBlob(schemaStringKey, dataString);
		}
		return builder.getSummaryTree();
	}

	public async summarize(
		stringify: SummaryElementStringifier,
		fullTree?: boolean,
		trackState?: boolean,
		telemetryContext?: ITelemetryContext,
		incrementalSummaryContext?: IExperimentalIncrementalSummaryContext | undefined,
	): Promise<ISummaryTreeWithStats> {
		throw new Error("Method not implemented.");
	}

	public getGCData(fullGC?: boolean): IGarbageCollectionData {
		// TODO: Properly implement garbage collection. Right now, garbage collection is performed automatically
		// by the code in SharedObject (from which SharedTreeCore extends). The `runtime.uploadBlob` API delegates
		// to the `BlobManager`, which automatically populates the summary with ISummaryAttachment entries for each
		// blob.
		return {
			gcNodes: {},
		};
	}

	public async load(
		services: IChannelStorageService,
		parse: SummaryElementParser,
	): Promise<void> {
		const schemaBuffer: ArrayBufferLike = await services.readBlob(schemaStringKey);
		// After the awaits, validate that the schema is in a clean state.
		// This detects any schema that could have been accidentally added through
		// invalid means and are about to be overwritten.
		assert(
			schemaDataIsEmpty(this.schema),
			0x3da /* there should not already be stored schema when loading stored schema */,
		);

		const schemaString = bufferToString(schemaBuffer, "utf-8");
		// Currently no Fluid handles are used, so just use JSON.parse.
		const decoded = this.codec.decode(JSON.parse(schemaString));
		this.schema.update(decoded);
		this.schemaIndexLastChangedSeq = 0;
	}
}

interface SchemaOp {
	readonly type: "SchemaOp";
	readonly data: Format;
}

/**
 * Wraps a StoredSchemaRepository, adjusting its "update" function to hook into Fluid Ops.
 *
 * TODO: this should be more integrated with transactions.
 */
export class SchemaEditor<TRepository extends StoredSchemaRepository>
	implements StoredSchemaRepository
{
	private readonly codec: IJsonCodec<TreeStoredSchema, Format, unknown>;
	private readonly formatValidator: SchemaValidationFunction<typeof Format>;
	public constructor(
		public readonly inner: TRepository,
		private readonly submit: (op: SchemaOp) => void,
		options: ICodecOptions,
	) {
		this.codec = makeSchemaCodec(options);
		this.formatValidator = options.jsonValidator.compile(Format);
	}

	public on<K extends keyof SchemaEvents>(eventName: K, listener: SchemaEvents[K]): () => void {
		return this.inner.on(eventName, listener);
	}

	/**
	 * @returns true if this is a schema op and was handled.
	 *
	 * TODO: Shared tree needs a pattern for handling non-changeset operations.
	 * See TODO on `SharedTree.processCore`.
	 */
	public tryHandleOp(encodedOp: JsonCompatibleReadOnly): boolean {
		const op = this.tryDecodeOp(encodedOp);
		if (op !== undefined) {
			// TODO: This does not correctly handle concurrency of schema edits.
			this.inner.update(op);
			return true;
		}
		return false;
	}

	public tryApplyStashedOp(encodedOp: JsonCompatibleReadOnly): boolean {
		return this.tryHandleOp(encodedOp);
	}

	/**
	 * @returns true iff this is a schema op and was submitted.
	 *
	 * TODO: Shared tree needs a pattern for handling non-changeset operations.
	 * See TODO on `SharedTree.processCore`.
	 */
	public tryResubmitOp(content: JsonCompatibleReadOnly): boolean {
		const op: JsonCompatibleReadOnly = content;
		if (isJsonObject(op) && op.type === "SchemaOp") {
			assert(
				this.formatValidator.check(op.data),
				0x79b /* unexpected format for resubmitted schema op */,
			);
			const schemaOp: SchemaOp = {
				type: op.type,
				data: op.data,
			};
			this.submit(schemaOp);
			return true;
		}
		return false;
	}

	public update(newSchema: TreeStoredSchema): void {
		const op: SchemaOp = { type: "SchemaOp", data: this.codec.encode(newSchema) };
		this.submit(op);
		this.inner.update(newSchema);
	}

	public get rootFieldSchema(): TreeFieldStoredSchema {
		return this.inner.rootFieldSchema;
	}

	public get nodeSchema(): ReadonlyMap<TreeNodeSchemaIdentifier, TreeNodeStoredSchema> {
		return this.inner.nodeSchema;
	}

	private tryDecodeOp(encodedOp: JsonCompatibleReadOnly): TreeStoredSchema | undefined {
		if (isJsonObject(encodedOp) && encodedOp.type === "SchemaOp") {
			return this.codec.decode(encodedOp.data);
		}

		return undefined;
		this.schema.apply(decoded);
	}
}

/**
 * Dumps schema into a deterministic JSON compatible semi-human readable but unspecified format.
 *
 * @remarks
 * This can be used to help inspect schema for debugging, and to save a snapshot of schema to help detect and review changes to an applications schema.
 *
 * This format may change across major versions of this package: such changes are considered breaking.
 * Beyond that, no compatibility guarantee is provided for this format: it should never be relied upon to load data, it should only be used for comparing outputs from this function.
 * @privateRemarks
 * This currently uses the schema summary format, but that could be changed to something more human readable (particularly if the encoded format becomes less human readable).
 * This intentionally does not leak the format types in the API.
 * @alpha
 */
export function encodeTreeSchema(schema: TreeStoredSchema): JsonCompatible {
	return encodeRepo(schema);
}
