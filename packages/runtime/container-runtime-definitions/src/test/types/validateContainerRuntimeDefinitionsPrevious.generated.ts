/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import type * as old from "@fluidframework/container-runtime-definitions-previous";
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
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IContainerRuntime": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IContainerRuntime():
    TypeOnly<old.IContainerRuntime>;
declare function use_current_InterfaceDeclaration_IContainerRuntime(
    use: TypeOnly<current.IContainerRuntime>): void;
use_current_InterfaceDeclaration_IContainerRuntime(
    get_old_InterfaceDeclaration_IContainerRuntime());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IContainerRuntime": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IContainerRuntime():
    TypeOnly<current.IContainerRuntime>;
declare function use_old_InterfaceDeclaration_IContainerRuntime(
    use: TypeOnly<old.IContainerRuntime>): void;
use_old_InterfaceDeclaration_IContainerRuntime(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_IContainerRuntime());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents():
    TypeOnly<old.IContainerRuntimeBaseWithCombinedEvents>;
declare function use_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    use: TypeOnly<current.IContainerRuntimeBaseWithCombinedEvents>): void;
use_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    get_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents():
    TypeOnly<current.IContainerRuntimeBaseWithCombinedEvents>;
declare function use_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    use: TypeOnly<old.IContainerRuntimeBaseWithCombinedEvents>): void;
use_old_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents(
    get_current_TypeAliasDeclaration_IContainerRuntimeBaseWithCombinedEvents());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IContainerRuntimeEvents": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IContainerRuntimeEvents():
    TypeOnly<old.IContainerRuntimeEvents>;
declare function use_current_InterfaceDeclaration_IContainerRuntimeEvents(
    use: TypeOnly<current.IContainerRuntimeEvents>): void;
use_current_InterfaceDeclaration_IContainerRuntimeEvents(
    get_old_InterfaceDeclaration_IContainerRuntimeEvents());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IContainerRuntimeEvents": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IContainerRuntimeEvents():
    TypeOnly<current.IContainerRuntimeEvents>;
declare function use_old_InterfaceDeclaration_IContainerRuntimeEvents(
    use: TypeOnly<old.IContainerRuntimeEvents>): void;
use_old_InterfaceDeclaration_IContainerRuntimeEvents(
    get_current_InterfaceDeclaration_IContainerRuntimeEvents());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated():
    TypeOnly<old.IContainerRuntimeWithResolveHandle_Deprecated>;
declare function use_current_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated(
    use: TypeOnly<current.IContainerRuntimeWithResolveHandle_Deprecated>): void;
use_current_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated(
    get_old_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated():
    TypeOnly<current.IContainerRuntimeWithResolveHandle_Deprecated>;
declare function use_old_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated(
    use: TypeOnly<old.IContainerRuntimeWithResolveHandle_Deprecated>): void;
use_old_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_IContainerRuntimeWithResolveHandle_Deprecated());
