/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type * as old from "@fluid-internal/client-utils-previous";

import type * as current from "../../index.js";

type ValueOf<T> = T[keyof T];
type OnlySymbols<T> = T extends symbol ? T : never;
type WellKnownSymbols = OnlySymbols<ValueOf<typeof Symbol>>;
/**
 * Omit (replace with never) a key if it is a custom symbol,
 * not just symbol or a well known symbol from the global Symbol.
 */
type SkipUniqueSymbols<Key> = symbol extends Key
	? Key // Key is symbol or a generalization of symbol, so leave it as is.
	: Key extends symbol
		? Key extends WellKnownSymbols
			? Key // Key is a well known symbol from the global Symbol object. These are shared between packages, so they are fine and kept as is.
			: never // Key is most likely some specialized symbol, typically a unique symbol. These break type comparisons so are removed by replacing them with never.
		: Key; // Key is not a symbol (for example its a string or number), so leave it as is.
/**
 * Remove details of T which are incompatible with type testing while keeping as much as is practical.
 *
 * See 'build-tools/packages/build-tools/src/typeValidator/compatibility.ts' for more information.
 */
type TypeOnly<T> = T extends number
	? number
	: T extends boolean | bigint | string
		? T
		: T extends symbol
			? SkipUniqueSymbols<T>
			: {
					[P in keyof T as SkipUniqueSymbols<P>]: TypeOnly<T[P]>;
				};

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Buffer": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_Buffer():
    TypeOnly<old.Buffer>;
declare function use_current_ClassDeclaration_Buffer(
    use: TypeOnly<current.Buffer>): void;
use_current_ClassDeclaration_Buffer(
    get_old_ClassDeclaration_Buffer());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Buffer": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_Buffer():
    TypeOnly<current.Buffer>;
declare function use_old_ClassDeclaration_Buffer(
    use: TypeOnly<old.Buffer>): void;
use_old_ClassDeclaration_Buffer(
    get_current_ClassDeclaration_Buffer());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_EventEmitter": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_EventEmitter():
    TypeOnly<old.EventEmitter>;
declare function use_current_ClassDeclaration_EventEmitter(
    use: TypeOnly<current.EventEmitter>): void;
use_current_ClassDeclaration_EventEmitter(
    get_old_ClassDeclaration_EventEmitter());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_EventEmitter": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_EventEmitter():
    TypeOnly<current.EventEmitter>;
declare function use_old_ClassDeclaration_EventEmitter(
    use: TypeOnly<old.EventEmitter>): void;
use_old_ClassDeclaration_EventEmitter(
    get_current_ClassDeclaration_EventEmitter());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_EventEmitterEventType": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_EventEmitterEventType():
    TypeOnly<old.EventEmitterEventType>;
declare function use_current_TypeAliasDeclaration_EventEmitterEventType(
    use: TypeOnly<current.EventEmitterEventType>): void;
use_current_TypeAliasDeclaration_EventEmitterEventType(
    get_old_TypeAliasDeclaration_EventEmitterEventType());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_EventEmitterEventType": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_EventEmitterEventType():
    TypeOnly<current.EventEmitterEventType>;
declare function use_old_TypeAliasDeclaration_EventEmitterEventType(
    use: TypeOnly<old.EventEmitterEventType>): void;
use_old_TypeAliasDeclaration_EventEmitterEventType(
    get_current_TypeAliasDeclaration_EventEmitterEventType());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ITraceEvent": {"forwardCompat": false}
 */
declare function get_old_InterfaceDeclaration_ITraceEvent():
    TypeOnly<old.ITraceEvent>;
declare function use_current_InterfaceDeclaration_ITraceEvent(
    use: TypeOnly<current.ITraceEvent>): void;
use_current_InterfaceDeclaration_ITraceEvent(
    get_old_InterfaceDeclaration_ITraceEvent());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ITraceEvent": {"backCompat": false}
 */
declare function get_current_InterfaceDeclaration_ITraceEvent():
    TypeOnly<current.ITraceEvent>;
declare function use_old_InterfaceDeclaration_ITraceEvent(
    use: TypeOnly<old.ITraceEvent>): void;
use_old_InterfaceDeclaration_ITraceEvent(
    get_current_InterfaceDeclaration_ITraceEvent());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_IsoBuffer": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_IsoBuffer():
    TypeOnly<typeof old.IsoBuffer>;
declare function use_current_VariableDeclaration_IsoBuffer(
    use: TypeOnly<typeof current.IsoBuffer>): void;
use_current_VariableDeclaration_IsoBuffer(
    get_old_VariableDeclaration_IsoBuffer());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_IsoBuffer": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_IsoBuffer():
    TypeOnly<typeof current.IsoBuffer>;
declare function use_old_VariableDeclaration_IsoBuffer(
    use: TypeOnly<typeof old.IsoBuffer>): void;
use_old_VariableDeclaration_IsoBuffer(
    get_current_VariableDeclaration_IsoBuffer());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_IsoBuffer": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_IsoBuffer():
    TypeOnly<old.IsoBuffer>;
declare function use_current_TypeAliasDeclaration_IsoBuffer(
    use: TypeOnly<current.IsoBuffer>): void;
use_current_TypeAliasDeclaration_IsoBuffer(
    get_old_TypeAliasDeclaration_IsoBuffer());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_IsoBuffer": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_IsoBuffer():
    TypeOnly<current.IsoBuffer>;
declare function use_old_TypeAliasDeclaration_IsoBuffer(
    use: TypeOnly<old.IsoBuffer>): void;
use_old_TypeAliasDeclaration_IsoBuffer(
    get_current_TypeAliasDeclaration_IsoBuffer());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_IsomorphicPerformance": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_IsomorphicPerformance():
    TypeOnly<old.IsomorphicPerformance>;
declare function use_current_TypeAliasDeclaration_IsomorphicPerformance(
    use: TypeOnly<current.IsomorphicPerformance>): void;
use_current_TypeAliasDeclaration_IsomorphicPerformance(
    get_old_TypeAliasDeclaration_IsomorphicPerformance());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_IsomorphicPerformance": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_IsomorphicPerformance():
    TypeOnly<current.IsomorphicPerformance>;
declare function use_old_TypeAliasDeclaration_IsomorphicPerformance(
    use: TypeOnly<old.IsomorphicPerformance>): void;
use_old_TypeAliasDeclaration_IsomorphicPerformance(
    get_current_TypeAliasDeclaration_IsomorphicPerformance());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Trace": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_Trace():
    TypeOnly<old.Trace>;
declare function use_current_ClassDeclaration_Trace(
    use: TypeOnly<current.Trace>): void;
use_current_ClassDeclaration_Trace(
    get_old_ClassDeclaration_Trace());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_Trace": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_Trace():
    TypeOnly<current.Trace>;
declare function use_old_ClassDeclaration_Trace(
    use: TypeOnly<old.Trace>): void;
use_old_ClassDeclaration_Trace(
    get_current_ClassDeclaration_Trace());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_TypedEventEmitter": {"forwardCompat": false}
 */
declare function get_old_ClassDeclaration_TypedEventEmitter():
    TypeOnly<old.TypedEventEmitter<any>>;
declare function use_current_ClassDeclaration_TypedEventEmitter(
    use: TypeOnly<current.TypedEventEmitter<any>>): void;
use_current_ClassDeclaration_TypedEventEmitter(
    get_old_ClassDeclaration_TypedEventEmitter());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_TypedEventEmitter": {"backCompat": false}
 */
declare function get_current_ClassDeclaration_TypedEventEmitter():
    TypeOnly<current.TypedEventEmitter<any>>;
declare function use_old_ClassDeclaration_TypedEventEmitter(
    use: TypeOnly<old.TypedEventEmitter<any>>): void;
use_old_ClassDeclaration_TypedEventEmitter(
    get_current_ClassDeclaration_TypedEventEmitter());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_TypedEventTransform": {"forwardCompat": false}
 */
declare function get_old_TypeAliasDeclaration_TypedEventTransform():
    TypeOnly<old.TypedEventTransform<any,any>>;
declare function use_current_TypeAliasDeclaration_TypedEventTransform(
    use: TypeOnly<current.TypedEventTransform<any,any>>): void;
use_current_TypeAliasDeclaration_TypedEventTransform(
    get_old_TypeAliasDeclaration_TypedEventTransform());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_TypedEventTransform": {"backCompat": false}
 */
declare function get_current_TypeAliasDeclaration_TypedEventTransform():
    TypeOnly<current.TypedEventTransform<any,any>>;
declare function use_old_TypeAliasDeclaration_TypedEventTransform(
    use: TypeOnly<old.TypedEventTransform<any,any>>): void;
use_old_TypeAliasDeclaration_TypedEventTransform(
    get_current_TypeAliasDeclaration_TypedEventTransform());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_Uint8ArrayToArrayBuffer": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_Uint8ArrayToArrayBuffer():
    TypeOnly<typeof old.Uint8ArrayToArrayBuffer>;
declare function use_current_FunctionDeclaration_Uint8ArrayToArrayBuffer(
    use: TypeOnly<typeof current.Uint8ArrayToArrayBuffer>): void;
use_current_FunctionDeclaration_Uint8ArrayToArrayBuffer(
    get_old_FunctionDeclaration_Uint8ArrayToArrayBuffer());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_Uint8ArrayToArrayBuffer": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_Uint8ArrayToArrayBuffer():
    TypeOnly<typeof current.Uint8ArrayToArrayBuffer>;
declare function use_old_FunctionDeclaration_Uint8ArrayToArrayBuffer(
    use: TypeOnly<typeof old.Uint8ArrayToArrayBuffer>): void;
use_old_FunctionDeclaration_Uint8ArrayToArrayBuffer(
    get_current_FunctionDeclaration_Uint8ArrayToArrayBuffer());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_Uint8ArrayToString": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_Uint8ArrayToString():
    TypeOnly<typeof old.Uint8ArrayToString>;
declare function use_current_FunctionDeclaration_Uint8ArrayToString(
    use: TypeOnly<typeof current.Uint8ArrayToString>): void;
use_current_FunctionDeclaration_Uint8ArrayToString(
    get_old_FunctionDeclaration_Uint8ArrayToString());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_Uint8ArrayToString": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_Uint8ArrayToString():
    TypeOnly<typeof current.Uint8ArrayToString>;
declare function use_old_FunctionDeclaration_Uint8ArrayToString(
    use: TypeOnly<typeof old.Uint8ArrayToString>): void;
use_old_FunctionDeclaration_Uint8ArrayToString(
    get_current_FunctionDeclaration_Uint8ArrayToString());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_bufferToString": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_bufferToString():
    TypeOnly<typeof old.bufferToString>;
declare function use_current_VariableDeclaration_bufferToString(
    use: TypeOnly<typeof current.bufferToString>): void;
use_current_VariableDeclaration_bufferToString(
    get_old_VariableDeclaration_bufferToString());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_bufferToString": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_bufferToString():
    TypeOnly<typeof current.bufferToString>;
declare function use_old_VariableDeclaration_bufferToString(
    use: TypeOnly<typeof old.bufferToString>): void;
use_old_VariableDeclaration_bufferToString(
    get_current_VariableDeclaration_bufferToString());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_fromBase64ToUtf8": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_fromBase64ToUtf8():
    TypeOnly<typeof old.fromBase64ToUtf8>;
declare function use_current_VariableDeclaration_fromBase64ToUtf8(
    use: TypeOnly<typeof current.fromBase64ToUtf8>): void;
use_current_VariableDeclaration_fromBase64ToUtf8(
    get_old_VariableDeclaration_fromBase64ToUtf8());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_fromBase64ToUtf8": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_fromBase64ToUtf8():
    TypeOnly<typeof current.fromBase64ToUtf8>;
declare function use_old_VariableDeclaration_fromBase64ToUtf8(
    use: TypeOnly<typeof old.fromBase64ToUtf8>): void;
use_old_VariableDeclaration_fromBase64ToUtf8(
    get_current_VariableDeclaration_fromBase64ToUtf8());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_fromUtf8ToBase64": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_fromUtf8ToBase64():
    TypeOnly<typeof old.fromUtf8ToBase64>;
declare function use_current_VariableDeclaration_fromUtf8ToBase64(
    use: TypeOnly<typeof current.fromUtf8ToBase64>): void;
use_current_VariableDeclaration_fromUtf8ToBase64(
    get_old_VariableDeclaration_fromUtf8ToBase64());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_fromUtf8ToBase64": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_fromUtf8ToBase64():
    TypeOnly<typeof current.fromUtf8ToBase64>;
declare function use_old_VariableDeclaration_fromUtf8ToBase64(
    use: TypeOnly<typeof old.fromUtf8ToBase64>): void;
use_old_VariableDeclaration_fromUtf8ToBase64(
    get_current_VariableDeclaration_fromUtf8ToBase64());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_gitHashFile": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_gitHashFile():
    TypeOnly<typeof old.gitHashFile>;
declare function use_current_FunctionDeclaration_gitHashFile(
    use: TypeOnly<typeof current.gitHashFile>): void;
use_current_FunctionDeclaration_gitHashFile(
    get_old_FunctionDeclaration_gitHashFile());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_gitHashFile": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_gitHashFile():
    TypeOnly<typeof current.gitHashFile>;
declare function use_old_FunctionDeclaration_gitHashFile(
    use: TypeOnly<typeof old.gitHashFile>): void;
use_old_FunctionDeclaration_gitHashFile(
    get_current_FunctionDeclaration_gitHashFile());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_hashFile": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_hashFile():
    TypeOnly<typeof old.hashFile>;
declare function use_current_FunctionDeclaration_hashFile(
    use: TypeOnly<typeof current.hashFile>): void;
use_current_FunctionDeclaration_hashFile(
    get_old_FunctionDeclaration_hashFile());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_hashFile": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_hashFile():
    TypeOnly<typeof current.hashFile>;
declare function use_old_FunctionDeclaration_hashFile(
    use: TypeOnly<typeof old.hashFile>): void;
use_old_FunctionDeclaration_hashFile(
    get_current_FunctionDeclaration_hashFile());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_performance": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_performance():
    TypeOnly<typeof old.performance>;
declare function use_current_VariableDeclaration_performance(
    use: TypeOnly<typeof current.performance>): void;
use_current_VariableDeclaration_performance(
    get_old_VariableDeclaration_performance());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_performance": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_performance():
    TypeOnly<typeof current.performance>;
declare function use_old_VariableDeclaration_performance(
    use: TypeOnly<typeof old.performance>): void;
use_old_VariableDeclaration_performance(
    get_current_VariableDeclaration_performance());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_stringToBuffer": {"forwardCompat": false}
 */
declare function get_old_FunctionDeclaration_stringToBuffer():
    TypeOnly<typeof old.stringToBuffer>;
declare function use_current_FunctionDeclaration_stringToBuffer(
    use: TypeOnly<typeof current.stringToBuffer>): void;
use_current_FunctionDeclaration_stringToBuffer(
    get_old_FunctionDeclaration_stringToBuffer());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "FunctionDeclaration_stringToBuffer": {"backCompat": false}
 */
declare function get_current_FunctionDeclaration_stringToBuffer():
    TypeOnly<typeof current.stringToBuffer>;
declare function use_old_FunctionDeclaration_stringToBuffer(
    use: TypeOnly<typeof old.stringToBuffer>): void;
use_old_FunctionDeclaration_stringToBuffer(
    get_current_FunctionDeclaration_stringToBuffer());

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_toUtf8": {"forwardCompat": false}
 */
declare function get_old_VariableDeclaration_toUtf8():
    TypeOnly<typeof old.toUtf8>;
declare function use_current_VariableDeclaration_toUtf8(
    use: TypeOnly<typeof current.toUtf8>): void;
use_current_VariableDeclaration_toUtf8(
    get_old_VariableDeclaration_toUtf8());

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_toUtf8": {"backCompat": false}
 */
declare function get_current_VariableDeclaration_toUtf8():
    TypeOnly<typeof current.toUtf8>;
declare function use_old_VariableDeclaration_toUtf8(
    use: TypeOnly<typeof old.toUtf8>): void;
use_old_VariableDeclaration_toUtf8(
    get_current_VariableDeclaration_toUtf8());
