/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { assert } from "@fluidframework/core-utils/internal";

import { fail } from "./utils.js";

/**
 * Used for allocating IDs unique to a particular instance of the allocator.
 */
export interface IdAllocator<TId = number> {
	/**
	 * Allocates a block of `count` consecutive IDs and returns the first ID in the block.
	 * For convenience can be called with no parameters to allocate a single ID.
	 */
	allocate: (count?: number) => TId;
	/**
	 * @returns The maximum ID that was generated by this allocator.
	 */
	getMaxId: () => TId;
}

export interface IdAllocationState {
	maxId: number;
}

export function idAllocatorFromMaxId(maxId: number | undefined = undefined): IdAllocator {
	return idAllocatorFromState({ maxId: maxId ?? -1 });
}

export function idAllocatorFromState(state: IdAllocationState): IdAllocator {
	return {
		allocate: (c?: number): number => {
			const count = c ?? 1;
			assert(count > 0, 0x5cf /* Must allocate at least one ID */);
			const id: number = state.maxId + 1;
			state.maxId += count;
			return id;
		},
		getMaxId: () => state.maxId,
	};
}

export const fakeIdAllocator: IdAllocator = {
	allocate: () => fail(0xae6 /* Should not allocate IDs */),
	getMaxId: () => 0,
};
