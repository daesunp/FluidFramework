/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type * as old from "@fluidframework/ordered-collection-previous/internal";

import type * as current from "../../index.js";

// See 'build-tools/src/type-test-generator/compatibility.ts' for more information.
type TypeOnly<T> = T extends number
	? number
	: T extends string
	? string
	: T extends boolean | bigint | symbol
	? T
	: {
			[P in keyof T]: TypeOnly<T[P]>;
	  };

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_ConsensusCallback": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_ConsensusCallback():
    TypeOnly<old.ConsensusCallback<any>>;
declare function use_current_TypeAliasDeclaration_ConsensusCallback(
    use: TypeOnly<current.ConsensusCallback<any>>): void;
use_current_TypeAliasDeclaration_ConsensusCallback(
    get_old_TypeAliasDeclaration_ConsensusCallback());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_ConsensusCallback": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_ConsensusCallback():
    TypeOnly<current.ConsensusCallback<any>>;
declare function use_old_TypeAliasDeclaration_ConsensusCallback(
    use: TypeOnly<old.ConsensusCallback<any>>): void;
use_old_TypeAliasDeclaration_ConsensusCallback(
    get_current_TypeAliasDeclaration_ConsensusCallback());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusOrderedCollection": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_ConsensusOrderedCollection():
    TypeOnly<old.ConsensusOrderedCollection>;
declare function use_current_ClassDeclaration_ConsensusOrderedCollection(
    use: TypeOnly<current.ConsensusOrderedCollection>): void;
use_current_ClassDeclaration_ConsensusOrderedCollection(
    // @ts-expect-error compatibility expected to be broken
    get_old_ClassDeclaration_ConsensusOrderedCollection());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusOrderedCollection": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_ConsensusOrderedCollection():
    TypeOnly<current.ConsensusOrderedCollection>;
declare function use_old_ClassDeclaration_ConsensusOrderedCollection(
    use: TypeOnly<old.ConsensusOrderedCollection>): void;
use_old_ClassDeclaration_ConsensusOrderedCollection(
    get_current_ClassDeclaration_ConsensusOrderedCollection());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "RemovedClassDeclaration_ConsensusQueue": {"forwardCompat": false}
 */

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "RemovedClassDeclaration_ConsensusQueue": {"backCompat": false}
 */
declare function get_current_RemovedClassDeclaration_ConsensusQueue():
    TypeOnly<current.ConsensusQueue>;
declare function use_old_ClassDeclaration_ConsensusQueue(
    use: TypeOnly<old.ConsensusQueue>): void;
use_old_ClassDeclaration_ConsensusQueue(
    get_current_RemovedClassDeclaration_ConsensusQueue());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusQueueFactory": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_ConsensusQueueFactory():
    TypeOnly<old.ConsensusQueueFactory>;
declare function use_current_ClassDeclaration_ConsensusQueueFactory(
    use: TypeOnly<current.ConsensusQueueFactory>): void;
use_current_ClassDeclaration_ConsensusQueueFactory(
    get_old_ClassDeclaration_ConsensusQueueFactory());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_ConsensusQueueFactory": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_ConsensusQueueFactory():
    TypeOnly<current.ConsensusQueueFactory>;
declare function use_old_ClassDeclaration_ConsensusQueueFactory(
    use: TypeOnly<old.ConsensusQueueFactory>): void;
use_old_ClassDeclaration_ConsensusQueueFactory(
    get_current_ClassDeclaration_ConsensusQueueFactory());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "EnumDeclaration_ConsensusResult": {"forwardCompat": false}
 */
declare function get_old_EnumDeclaration_ConsensusResult():
    TypeOnly<old.ConsensusResult>;
declare function use_current_EnumDeclaration_ConsensusResult(
    use: TypeOnly<current.ConsensusResult>): void;
use_current_EnumDeclaration_ConsensusResult(
    get_old_EnumDeclaration_ConsensusResult());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "EnumDeclaration_ConsensusResult": {"backCompat": false}
 */
declare function get_current_EnumDeclaration_ConsensusResult():
    TypeOnly<current.ConsensusResult>;
declare function use_old_EnumDeclaration_ConsensusResult(
    use: TypeOnly<old.ConsensusResult>): void;
use_old_EnumDeclaration_ConsensusResult(
    get_current_EnumDeclaration_ConsensusResult());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollection": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IConsensusOrderedCollection():
    TypeOnly<old.IConsensusOrderedCollection>;
declare function use_current_InterfaceDeclaration_IConsensusOrderedCollection(
    use: TypeOnly<current.IConsensusOrderedCollection>): void;
use_current_InterfaceDeclaration_IConsensusOrderedCollection(
    // @ts-expect-error compatibility expected to be broken
    get_old_InterfaceDeclaration_IConsensusOrderedCollection());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollection": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IConsensusOrderedCollection():
    TypeOnly<current.IConsensusOrderedCollection>;
declare function use_old_InterfaceDeclaration_IConsensusOrderedCollection(
    use: TypeOnly<old.IConsensusOrderedCollection>): void;
use_old_InterfaceDeclaration_IConsensusOrderedCollection(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_IConsensusOrderedCollection());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionEvents": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents():
    TypeOnly<old.IConsensusOrderedCollectionEvents<any>>;
declare function use_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    use: TypeOnly<current.IConsensusOrderedCollectionEvents<any>>): void;
use_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    get_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionEvents": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents():
    TypeOnly<current.IConsensusOrderedCollectionEvents<any>>;
declare function use_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    use: TypeOnly<old.IConsensusOrderedCollectionEvents<any>>): void;
use_old_InterfaceDeclaration_IConsensusOrderedCollectionEvents(
    get_current_InterfaceDeclaration_IConsensusOrderedCollectionEvents());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionFactory": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory():
    TypeOnly<old.IConsensusOrderedCollectionFactory>;
declare function use_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    use: TypeOnly<current.IConsensusOrderedCollectionFactory>): void;
use_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    get_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IConsensusOrderedCollectionFactory": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory():
    TypeOnly<current.IConsensusOrderedCollectionFactory>;
declare function use_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    use: TypeOnly<old.IConsensusOrderedCollectionFactory>): void;
use_old_InterfaceDeclaration_IConsensusOrderedCollectionFactory(
    get_current_InterfaceDeclaration_IConsensusOrderedCollectionFactory());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IOrderedCollection": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_IOrderedCollection():
    TypeOnly<old.IOrderedCollection>;
declare function use_current_InterfaceDeclaration_IOrderedCollection(
    use: TypeOnly<current.IOrderedCollection>): void;
use_current_InterfaceDeclaration_IOrderedCollection(
    get_old_InterfaceDeclaration_IOrderedCollection());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IOrderedCollection": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_IOrderedCollection():
    TypeOnly<current.IOrderedCollection>;
declare function use_old_InterfaceDeclaration_IOrderedCollection(
    use: TypeOnly<old.IOrderedCollection>): void;
use_old_InterfaceDeclaration_IOrderedCollection(
    get_current_InterfaceDeclaration_IOrderedCollection());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISnapshotable": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_ISnapshotable():
    TypeOnly<old.ISnapshotable<any>>;
declare function use_current_InterfaceDeclaration_ISnapshotable(
    use: TypeOnly<current.ISnapshotable<any>>): void;
use_current_InterfaceDeclaration_ISnapshotable(
    get_old_InterfaceDeclaration_ISnapshotable());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISnapshotable": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_ISnapshotable():
    TypeOnly<current.ISnapshotable<any>>;
declare function use_old_InterfaceDeclaration_ISnapshotable(
    use: TypeOnly<old.ISnapshotable<any>>): void;
use_old_InterfaceDeclaration_ISnapshotable(
    get_current_InterfaceDeclaration_ISnapshotable());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_acquireAndComplete": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_acquireAndComplete():
    TypeOnly<typeof old.acquireAndComplete>;
declare function use_current_FunctionDeclaration_acquireAndComplete(
    use: TypeOnly<typeof current.acquireAndComplete>): void;
use_current_FunctionDeclaration_acquireAndComplete(
    get_old_FunctionDeclaration_acquireAndComplete());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_acquireAndComplete": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_acquireAndComplete():
    TypeOnly<typeof current.acquireAndComplete>;
declare function use_old_FunctionDeclaration_acquireAndComplete(
    use: TypeOnly<typeof old.acquireAndComplete>): void;
use_old_FunctionDeclaration_acquireAndComplete(
    get_current_FunctionDeclaration_acquireAndComplete());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_waitAcquireAndComplete": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_waitAcquireAndComplete():
    TypeOnly<typeof old.waitAcquireAndComplete>;
declare function use_current_FunctionDeclaration_waitAcquireAndComplete(
    use: TypeOnly<typeof current.waitAcquireAndComplete>): void;
use_current_FunctionDeclaration_waitAcquireAndComplete(
    get_old_FunctionDeclaration_waitAcquireAndComplete());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_waitAcquireAndComplete": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_waitAcquireAndComplete():
    TypeOnly<typeof current.waitAcquireAndComplete>;
declare function use_old_FunctionDeclaration_waitAcquireAndComplete(
    use: TypeOnly<typeof old.waitAcquireAndComplete>): void;
use_old_FunctionDeclaration_waitAcquireAndComplete(
    get_current_FunctionDeclaration_waitAcquireAndComplete());
