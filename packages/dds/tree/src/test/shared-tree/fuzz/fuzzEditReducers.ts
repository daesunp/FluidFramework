/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { AsyncReducer, combineReducers } from "@fluid-private/stochastic-test-utils";
import { DDSFuzzTestState } from "@fluid-private/test-dds-utils";
import {
	DownPath,
	FlexTreeField,
	FlexTreeNode,
	cursorForJsonableTreeNode,
	cursorForJsonableTreeField,
	SchemaBuilderInternal,
	LeafNodeSchema,
	intoStoredSchema,
} from "../../../feature-libraries/index.js";
import { brand, fail } from "../../../util/index.js";
import { validateTreeConsistency } from "../../utils.js";
import {
	ISharedTree,
	FlexTreeView,
	SharedTreeFactory,
	SharedTree,
} from "../../../shared-tree/index.js";
import { Revertible, ValueSchema } from "../../../core/index.js";
// eslint-disable-next-line import/no-internal-modules
import { leaf } from "../../../domains/leafDomain.js";
import {
	FieldEdit,
	FuzzRemove,
	FuzzFieldChange,
	FuzzSet,
	FuzzTransactionType,
	FuzzUndoRedoType,
	Operation,
	FuzzSchemaOpType,
} from "./operationTypes.js";
import { createTreeStoredSchema, fuzzSchema, isRevertibleSharedTreeView } from "./fuzzUtils.js";
import { FuzzTestState, viewFromState } from "./fuzzEditGenerators.js";

const syncFuzzReducer = combineReducers<Operation, DDSFuzzTestState<SharedTreeFactory>>({
	edit: (state, operation) => {
		const { contents } = operation;
		switch (contents.type) {
			case "fieldEdit": {
				applyFieldEdit(viewFromState(state), contents);
				break;
			}
			default:
				break;
		}
	},
	transaction: (state, operation) => {
		applyTransactionEdit(state, operation.contents);
	},
	undoRedo: (state, operation) => {
		const view = viewFromState(state).checkout;
		assert(isRevertibleSharedTreeView(view));
		applyUndoRedoEdit(view.undoStack, view.redoStack, operation.contents);
	},
	synchronizeTrees: (state) => {
		applySynchronizationOp(state);
	},
	schema: (state, operation) => {
		applySchemaOp(state, operation.contents);
		// const test = (state.client.channel as SharedTree).storedSchema.on("afterSchemaChange", ()=>)
	},
});
export const fuzzReducer: AsyncReducer<Operation, DDSFuzzTestState<SharedTreeFactory>> = async (
	state,
	operation,
) => syncFuzzReducer(state, operation);

export function checkTreesAreSynchronized(trees: readonly ISharedTree[]) {
	for (const tree of trees) {
		validateTreeConsistency(trees[0], tree);
	}
}

export function applySynchronizationOp(state: DDSFuzzTestState<SharedTreeFactory>) {
	state.containerRuntimeFactory.processAllMessages();
	const connectedClients = state.clients.filter((client) => client.containerRuntime.connected);
	if (connectedClients.length > 0) {
		const readonlyChannel = state.summarizerClient.channel;
		for (const { channel } of connectedClients) {
			validateTreeConsistency(channel, readonlyChannel);
		}
	}
}

export function applySchemaOp(state: FuzzTestState, contents: FuzzSchemaOpType) {
	const fuzzLeafBuilder = new SchemaBuilderInternal({ scope: "com.fluidframework.fuzz.leaf" });
	const leafSchemas = getFuzzLeafTypes(state, state.client.channel);
	leafSchemas.push(fuzzLeafBuilder.leaf(contents.type, ValueSchema.Number));
	const newSchema = createTreeStoredSchema(leafSchemas);
	const treeView = viewFromState(state, state.client);

	treeView.checkout.updateSchema(intoStoredSchema(newSchema));
}

function getFuzzLeafTypes(state: FuzzTestState, tree: ISharedTree) {
	const allowedTypes = state.currentSchemaTypes?.get(tree) ?? [];
	const leafSchemas: LeafNodeSchema[] = [leaf.number, leaf.string];
	const fuzzLeafBuilder = new SchemaBuilderInternal({ scope: "com.fluidframework.fuzz.leaf" });
	for (const allowedType of allowedTypes) {
		leafSchemas.push(fuzzLeafBuilder.leaf(allowedType.type, ValueSchema.Number));
	}

	return leafSchemas;
}

/**
 * Assumes tree is using the fuzzSchema.
 * TODO: Maybe take in a schema aware strongly typed Tree node or field.
 */
export function applyFieldEdit(
	tree: FlexTreeView<typeof fuzzSchema.rootFieldSchema>,
	fieldEdit: FieldEdit,
): void {
	switch (fieldEdit.change.type) {
		case "sequence":
			applySequenceFieldEdit(tree, fieldEdit.change.edit);
			break;
		case "value":
			applyValueFieldEdit(tree, fieldEdit.change.edit);
			break;
		case "optional":
			applyOptionalFieldEdit(tree, fieldEdit.change.edit);
			break;
		default:
			break;
	}
}

function applySequenceFieldEdit(
	tree: FlexTreeView<typeof fuzzSchema.rootFieldSchema>,
	change: FuzzFieldChange,
): void {
	const nodeSchema = tree.context.schema.nodeSchema.get(brand("tree2fuzz.node"));
	assert(nodeSchema !== undefined);
	switch (change.type) {
		case "insert": {
			assert(change.parent !== undefined, "Sequence change should not occur at the root.");

			const parent = navigateToNode(tree, change.parent);
			assert(parent?.is(nodeSchema), "Defined down-path should point to a valid parent");
			const field = (parent as any).boxedSequence;
			field.insertAt(change.index, cursorForJsonableTreeField([change.value]));
			break;
		}
		case "remove": {
			const firstNode = navigateToNode(tree, change.firstNode);
			assert(firstNode !== undefined, "Down-path should point to a valid firstNode");
			const { parent: field, index } = firstNode.parentField;
			assert(
				field?.is((nodeSchema as any).objectNodeFieldsObject.sequence),
				"Defined down-path should point to a valid parent",
			);
			(field as any).removeRange(index, index + change.count);
			break;
		}
		case "move": {
			const firstNode = navigateToNode(tree, change.firstNode);
			assert(firstNode !== undefined, "Down-path should point to a valid firstNode");
			const { parent: field, index } = firstNode.parentField;
			assert(
				field?.is((nodeSchema as any).objectNodeFieldsObject.sequence),
				"Defined down-path should point to a valid parent",
			);
			(field as any).moveRangeToIndex(change.dstIndex, index, index + change.count);
			break;
		}
		default:
			fail("Invalid edit.");
	}
}

function applyValueFieldEdit(
	tree: FlexTreeView<typeof fuzzSchema.rootFieldSchema>,
	change: FuzzSet,
): void {
	const nodeSchema = tree.context.schema.nodeSchema.get(brand("tree2fuzz.node"));
	assert(nodeSchema !== undefined);
	assert(change.parent !== undefined, "Value change should not occur at the root.");
	const parent = navigateToNode(tree, change.parent);
	assert(parent?.is(nodeSchema), "Defined down-path should point to a valid parent");
	const field = parent.tryGetField(change.key);
	assert(
		field?.is((nodeSchema as any).objectNodeFieldsObject.valueField),
		"Parent of Value change should have an optional field to modify",
	);
	(field as any).content = cursorForJsonableTreeNode(change.value) as any;
}

function navigateToNode(
	tree: FlexTreeView<typeof fuzzSchema.rootFieldSchema>,
	path: DownPath | undefined,
): FlexTreeNode | undefined {
	const rootField = tree.flexTree;
	if (path === undefined) {
		return undefined;
	}
	const nodeSchema = tree.context.schema.nodeSchema.get(brand("tree2fuzz.node"));
	assert(nodeSchema !== undefined);
	const finalLocation = path.reduce<{
		field: FlexTreeField;
		containedNode: FlexTreeNode | undefined;
	}>(
		({ containedNode }, nextStep) => {
			const childField = containedNode?.tryGetField(nextStep.field);
			// Checking "=== true" causes tsc to fail to typecheck, as it is no longer able to narrow according
			// to the .is typeguard.
			/* eslint-disable @typescript-eslint/strict-boolean-expressions */
			if (childField?.is((nodeSchema as any).objectNodeFieldsObject.sequence)) {
				assert(nextStep.index !== undefined);
				return {
					field: childField,
					containedNode: (childField as any).at(nextStep.index),
				};
			} else if (
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				childField?.is((nodeSchema as any).objectNodeFieldsObject.optional) ||
				childField?.is((nodeSchema as any).objectNodeFieldsObject.valueField)
			) {
				return { field: childField, containedNode: (childField as any).content };
			}
			/* eslint-enable @typescript-eslint/strict-boolean-expressions */

			fail(`Unexpected field type: ${childField?.key}`);
		},
		{ field: rootField, containedNode: rootField.content },
	);

	return finalLocation.containedNode;
}

function applyOptionalFieldEdit(
	tree: FlexTreeView<typeof fuzzSchema.rootFieldSchema>,
	change: FuzzSet | FuzzRemove,
): void {
	const nodeSchema = tree.context.schema.nodeSchema.get(brand("tree2fuzz.node"));
	assert(nodeSchema !== undefined);
	switch (change.type) {
		case "set": {
			const rootField = tree.flexTree;
			if (change.parent === undefined) {
				rootField.content = cursorForJsonableTreeNode(change.value) as any;
			} else {
				const parent = navigateToNode(tree, change.parent);
				assert(parent?.is(nodeSchema), "Defined down-path should point to a valid parent");
				(parent as any).boxedOptional.content = cursorForJsonableTreeNode(
					change.value,
				) as any;
			}
			break;
		}
		case "remove": {
			const field = navigateToNode(tree, change.firstNode)?.parentField.parent;
			assert(field?.is((nodeSchema as any).objectNodeFieldsObject.optional));
			(field as any).content = undefined;
			break;
		}
		default:
			fail("Invalid edit.");
	}
}

export function applyTransactionEdit(state: FuzzTestState, contents: FuzzTransactionType): void {
	state.transactionViews ??= new Map();
	let view = state.transactionViews.get(state.client.channel);
	if (view === undefined) {
		assert(
			contents.fuzzType === "transactionStart",
			"Forked view should be present in the fuzz state unless a (non-nested) transaction is being started.",
		);
		view = viewFromState(state).fork();
		state.transactionViews.set(state.client.channel, view);
	}

	const { checkout } = view;
	switch (contents.fuzzType) {
		case "transactionStart": {
			checkout.transaction.start();
			break;
		}
		case "transactionCommit": {
			checkout.transaction.commit();
			break;
		}
		case "transactionAbort": {
			checkout.transaction.abort();
			break;
		}
		default:
			fail("Invalid edit.");
	}

	if (!checkout.transaction.inProgress()) {
		// Transaction is complete, so merge the changes into the root view and clean up the fork from the state.
		state.transactionViews.delete(state.client.channel);
		const rootView = viewFromState(state);
		rootView.checkout.merge(checkout);
	}
}

export function applyUndoRedoEdit(
	undoStack: Revertible[],
	redoStack: Revertible[],
	contents: FuzzUndoRedoType,
): void {
	switch (contents.type) {
		case "undo": {
			undoStack.pop()?.revert();
			break;
		}
		case "redo": {
			redoStack.pop()?.revert();
			break;
		}
		default:
			fail("Invalid edit.");
	}
}
