/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { assert, unreachableCase } from "@fluidframework/core-utils/internal";

import {
	LeafNodeStoredSchema,
	MapNodeStoredSchema,
	ObjectNodeStoredSchema,
	StoredSchemaCollection,
	TreeFieldStoredSchema,
	TreeNodeSchemaIdentifier,
	ValueSchema,
	Multiplicity,
} from "../../../core/index.js";
import { fail } from "../../../util/index.js";
import { FullSchemaPolicy } from "../../modular-schema/index.js";

import {
	EncoderCache,
	FieldEncoder,
	FieldShaper,
	KeyedFieldEncoder,
	TreeShaper,
	anyNodeEncoder,
	asFieldEncoder,
	compressedEncode,
} from "./compressedEncode.js";
import { FieldBatch } from "./fieldBatch.js";
import { EncodedFieldBatch, EncodedValueShape } from "./format.js";
import { NodeShape } from "./nodeShape.js";
import { IIdCompressor } from "@fluidframework/id-compressor";
// eslint-disable-next-line import/no-internal-modules
import { identifier } from "../../default-schema/defaultFieldKinds.js";

/**
 * Encode data from `fieldBatch` in into an `EncodedChunk`.
 *
 * Optimized for encoded size and encoding performance.
 * TODO: This function should eventually also take in the root FieldSchema to more efficiently compress the nodes.
 */
export function schemaCompressedEncode(
	schema: StoredSchemaCollection,
	policy: FullSchemaPolicy,
	fieldBatch: FieldBatch,
	idCompressor: IIdCompressor,
): EncodedFieldBatch {
	return compressedEncode(fieldBatch, buildCache(schema, policy, idCompressor));
}

export function buildCache(
	schema: StoredSchemaCollection,
	policy: FullSchemaPolicy,
	idCompressor: IIdCompressor,
): EncoderCache {
	const cache: EncoderCache = new EncoderCache(
		(fieldHandler: FieldShaper, schemaName: TreeNodeSchemaIdentifier) =>
			treeShaper(schema, policy, fieldHandler, schemaName),
		(treeHandler: TreeShaper, field: TreeFieldStoredSchema) =>
			fieldShaper(treeHandler, field, cache),
		policy.fieldKinds,
		idCompressor,
	);
	return cache;
}

/**
 * Selects shapes to use to encode fields.
 */
export function fieldShaper(
	treeHandler: TreeShaper,
	field: TreeFieldStoredSchema,
	cache: EncoderCache,
): FieldEncoder {
	const kind = cache.fieldShapes.get(field.kind) ?? fail("missing FieldKind");
	const type = oneFromSet(field.types);
	const nodeEncoder = type !== undefined ? treeHandler.shapeFromTree(type) : anyNodeEncoder;
	// eslint-disable-next-line unicorn/prefer-ternary
	if (kind.multiplicity === Multiplicity.Single) {
		if (field.kind === identifier.identifier) {
			assert(field.types !== undefined, "field types must be defined in identifier field");
			const identifierNodeEncoder = new NodeShape(
				Array.from(field.types)[0],
				0,
				[],
				undefined,
			);
			return asFieldEncoder(identifierNodeEncoder);
		}
		return asFieldEncoder(nodeEncoder);
	} else {
		return cache.nestedArray(nodeEncoder);
	}
}

/**
 * Selects shapes to use to encode trees.
 */
export function treeShaper(
	fullSchema: StoredSchemaCollection,
	policy: FullSchemaPolicy,
	fieldHandler: FieldShaper,
	schemaName: TreeNodeSchemaIdentifier,
): NodeShape {
	const schema = fullSchema.nodeSchema.get(schemaName) ?? fail("missing node schema");

	if (schema instanceof ObjectNodeStoredSchema) {
		// TODO:Performance:
		// consider moving some optional and sequence fields to extra fields if they are commonly empty
		// to reduce encoded size.

		const objectNodeFields: KeyedFieldEncoder[] = [];
		for (const [key, field] of schema.objectNodeFields ?? []) {
			objectNodeFields.push({ key, shape: fieldHandler.shapeFromField(field) });
		}

		const shape = new NodeShape(schemaName, false, objectNodeFields, undefined);
		return shape;
	}
	if (schema instanceof LeafNodeStoredSchema) {
		const shape = new NodeShape(
			schemaName,
			valueShapeFromSchema(schema.leafValue),
			[],
			undefined,
		);
		return shape;
	}
	if (schema instanceof MapNodeStoredSchema) {
		const shape = new NodeShape(
			schemaName,
			false,
			[],
			fieldHandler.shapeFromField(schema.mapFields),
		);
		return shape;
	}
	fail("unsupported node kind");
}

export function oneFromSet<T>(set: ReadonlySet<T> | undefined): T | undefined {
	if (set === undefined) {
		return undefined;
	}
	if (set.size !== 1) {
		return undefined;
	}
	for (const item of set) {
		return item;
	}
}

function valueShapeFromSchema(schema: ValueSchema | undefined): undefined | EncodedValueShape {
	switch (schema) {
		case undefined:
			return false;
		case ValueSchema.Number:
		case ValueSchema.String:
		case ValueSchema.Boolean:
		case ValueSchema.FluidHandle:
			return true;
		case ValueSchema.Null:
			return [null];
		default:
			unreachableCase(schema);
	}
}
