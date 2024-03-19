/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import type * as old from "@fluidframework/server-routerlicious-base-previous";
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
* "ClassDeclaration_AlfredResources": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_AlfredResources():
    TypeOnly<old.AlfredResources>;
declare function use_current_ClassDeclaration_AlfredResources(
    use: TypeOnly<current.AlfredResources>): void;
use_current_ClassDeclaration_AlfredResources(
    get_old_ClassDeclaration_AlfredResources());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AlfredResources": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_AlfredResources():
    TypeOnly<current.AlfredResources>;
declare function use_old_ClassDeclaration_AlfredResources(
    use: TypeOnly<old.AlfredResources>): void;
use_old_ClassDeclaration_AlfredResources(
    // @ts-expect-error compatibility expected to be broken
    get_current_ClassDeclaration_AlfredResources());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AlfredResourcesFactory": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_AlfredResourcesFactory():
    TypeOnly<old.AlfredResourcesFactory>;
declare function use_current_ClassDeclaration_AlfredResourcesFactory(
    use: TypeOnly<current.AlfredResourcesFactory>): void;
use_current_ClassDeclaration_AlfredResourcesFactory(
    get_old_ClassDeclaration_AlfredResourcesFactory());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AlfredResourcesFactory": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_AlfredResourcesFactory():
    TypeOnly<current.AlfredResourcesFactory>;
declare function use_old_ClassDeclaration_AlfredResourcesFactory(
    use: TypeOnly<old.AlfredResourcesFactory>): void;
use_old_ClassDeclaration_AlfredResourcesFactory(
    get_current_ClassDeclaration_AlfredResourcesFactory());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AlfredRunner": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_AlfredRunner():
    TypeOnly<old.AlfredRunner>;
declare function use_current_ClassDeclaration_AlfredRunner(
    use: TypeOnly<current.AlfredRunner>): void;
use_current_ClassDeclaration_AlfredRunner(
    get_old_ClassDeclaration_AlfredRunner());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AlfredRunner": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_AlfredRunner():
    TypeOnly<current.AlfredRunner>;
declare function use_old_ClassDeclaration_AlfredRunner(
    use: TypeOnly<old.AlfredRunner>): void;
use_old_ClassDeclaration_AlfredRunner(
    get_current_ClassDeclaration_AlfredRunner());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AlfredRunnerFactory": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_AlfredRunnerFactory():
    TypeOnly<old.AlfredRunnerFactory>;
declare function use_current_ClassDeclaration_AlfredRunnerFactory(
    use: TypeOnly<current.AlfredRunnerFactory>): void;
use_current_ClassDeclaration_AlfredRunnerFactory(
    get_old_ClassDeclaration_AlfredRunnerFactory());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_AlfredRunnerFactory": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_AlfredRunnerFactory():
    TypeOnly<current.AlfredRunnerFactory>;
declare function use_old_ClassDeclaration_AlfredRunnerFactory(
    use: TypeOnly<old.AlfredRunnerFactory>): void;
use_old_ClassDeclaration_AlfredRunnerFactory(
    get_current_ClassDeclaration_AlfredRunnerFactory());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_Constants": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_Constants():
    TypeOnly<typeof old.Constants>;
declare function use_current_VariableDeclaration_Constants(
    use: TypeOnly<typeof current.Constants>): void;
use_current_VariableDeclaration_Constants(
    get_old_VariableDeclaration_Constants());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_Constants": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_Constants():
    TypeOnly<typeof current.Constants>;
declare function use_old_VariableDeclaration_Constants(
    use: TypeOnly<typeof old.Constants>): void;
use_old_VariableDeclaration_Constants(
    get_current_VariableDeclaration_Constants());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_DeltaService": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_DeltaService():
    TypeOnly<old.DeltaService>;
declare function use_current_ClassDeclaration_DeltaService(
    use: TypeOnly<current.DeltaService>): void;
use_current_ClassDeclaration_DeltaService(
    get_old_ClassDeclaration_DeltaService());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_DeltaService": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_DeltaService():
    TypeOnly<current.DeltaService>;
declare function use_old_ClassDeclaration_DeltaService(
    use: TypeOnly<old.DeltaService>): void;
use_old_ClassDeclaration_DeltaService(
    get_current_ClassDeclaration_DeltaService());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_DocumentDeleteService": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_DocumentDeleteService():
    TypeOnly<old.DocumentDeleteService>;
declare function use_current_ClassDeclaration_DocumentDeleteService(
    use: TypeOnly<current.DocumentDeleteService>): void;
use_current_ClassDeclaration_DocumentDeleteService(
    get_old_ClassDeclaration_DocumentDeleteService());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_DocumentDeleteService": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_DocumentDeleteService():
    TypeOnly<current.DocumentDeleteService>;
declare function use_old_ClassDeclaration_DocumentDeleteService(
    use: TypeOnly<old.DocumentDeleteService>): void;
use_old_ClassDeclaration_DocumentDeleteService(
    get_current_ClassDeclaration_DocumentDeleteService());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IAlfredResourcesCustomizations": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IAlfredResourcesCustomizations():
    TypeOnly<old.IAlfredResourcesCustomizations>;
declare function use_current_InterfaceDeclaration_IAlfredResourcesCustomizations(
    use: TypeOnly<current.IAlfredResourcesCustomizations>): void;
use_current_InterfaceDeclaration_IAlfredResourcesCustomizations(
    // @ts-expect-error compatibility expected to be broken
    get_old_InterfaceDeclaration_IAlfredResourcesCustomizations());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IAlfredResourcesCustomizations": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IAlfredResourcesCustomizations():
    TypeOnly<current.IAlfredResourcesCustomizations>;
declare function use_old_InterfaceDeclaration_IAlfredResourcesCustomizations(
    use: TypeOnly<old.IAlfredResourcesCustomizations>): void;
use_old_InterfaceDeclaration_IAlfredResourcesCustomizations(
    get_current_InterfaceDeclaration_IAlfredResourcesCustomizations());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IDocumentDeleteService": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IDocumentDeleteService():
    TypeOnly<old.IDocumentDeleteService>;
declare function use_current_InterfaceDeclaration_IDocumentDeleteService(
    use: TypeOnly<current.IDocumentDeleteService>): void;
use_current_InterfaceDeclaration_IDocumentDeleteService(
    get_old_InterfaceDeclaration_IDocumentDeleteService());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IDocumentDeleteService": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IDocumentDeleteService():
    TypeOnly<current.IDocumentDeleteService>;
declare function use_old_InterfaceDeclaration_IDocumentDeleteService(
    use: TypeOnly<old.IDocumentDeleteService>): void;
use_old_InterfaceDeclaration_IDocumentDeleteService(
    get_current_InterfaceDeclaration_IDocumentDeleteService());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IPlugin": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IPlugin():
    TypeOnly<old.IPlugin>;
declare function use_current_InterfaceDeclaration_IPlugin(
    use: TypeOnly<current.IPlugin>): void;
use_current_InterfaceDeclaration_IPlugin(
    get_old_InterfaceDeclaration_IPlugin());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IPlugin": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IPlugin():
    TypeOnly<current.IPlugin>;
declare function use_old_InterfaceDeclaration_IPlugin(
    use: TypeOnly<old.IPlugin>): void;
use_old_InterfaceDeclaration_IPlugin(
    get_current_InterfaceDeclaration_IPlugin());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITenantDocument": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITenantDocument():
    TypeOnly<old.ITenantDocument>;
declare function use_current_InterfaceDeclaration_ITenantDocument(
    use: TypeOnly<current.ITenantDocument>): void;
use_current_InterfaceDeclaration_ITenantDocument(
    get_old_InterfaceDeclaration_ITenantDocument());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITenantDocument": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITenantDocument():
    TypeOnly<current.ITenantDocument>;
declare function use_old_InterfaceDeclaration_ITenantDocument(
    use: TypeOnly<old.ITenantDocument>): void;
use_old_InterfaceDeclaration_ITenantDocument(
    get_current_InterfaceDeclaration_ITenantDocument());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_OrdererManager": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_OrdererManager():
    TypeOnly<old.OrdererManager>;
declare function use_current_ClassDeclaration_OrdererManager(
    use: TypeOnly<current.OrdererManager>): void;
use_current_ClassDeclaration_OrdererManager(
    get_old_ClassDeclaration_OrdererManager());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_OrdererManager": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_OrdererManager():
    TypeOnly<current.OrdererManager>;
declare function use_old_ClassDeclaration_OrdererManager(
    use: TypeOnly<old.OrdererManager>): void;
use_old_ClassDeclaration_OrdererManager(
    get_current_ClassDeclaration_OrdererManager());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_OrderingResourcesFactory": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_OrderingResourcesFactory():
    TypeOnly<old.OrderingResourcesFactory>;
declare function use_current_ClassDeclaration_OrderingResourcesFactory(
    use: TypeOnly<current.OrderingResourcesFactory>): void;
use_current_ClassDeclaration_OrderingResourcesFactory(
    get_old_ClassDeclaration_OrderingResourcesFactory());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_OrderingResourcesFactory": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_OrderingResourcesFactory():
    TypeOnly<current.OrderingResourcesFactory>;
declare function use_old_ClassDeclaration_OrderingResourcesFactory(
    use: TypeOnly<old.OrderingResourcesFactory>): void;
use_old_ClassDeclaration_OrderingResourcesFactory(
    get_current_ClassDeclaration_OrderingResourcesFactory());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerResources": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_RiddlerResources():
    TypeOnly<old.RiddlerResources>;
declare function use_current_ClassDeclaration_RiddlerResources(
    use: TypeOnly<current.RiddlerResources>): void;
use_current_ClassDeclaration_RiddlerResources(
    // @ts-expect-error compatibility expected to be broken
    get_old_ClassDeclaration_RiddlerResources());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerResources": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_RiddlerResources():
    TypeOnly<current.RiddlerResources>;
declare function use_old_ClassDeclaration_RiddlerResources(
    use: TypeOnly<old.RiddlerResources>): void;
use_old_ClassDeclaration_RiddlerResources(
    // @ts-expect-error compatibility expected to be broken
    get_current_ClassDeclaration_RiddlerResources());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerResourcesFactory": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_RiddlerResourcesFactory():
    TypeOnly<old.RiddlerResourcesFactory>;
declare function use_current_ClassDeclaration_RiddlerResourcesFactory(
    use: TypeOnly<current.RiddlerResourcesFactory>): void;
use_current_ClassDeclaration_RiddlerResourcesFactory(
    get_old_ClassDeclaration_RiddlerResourcesFactory());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerResourcesFactory": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_RiddlerResourcesFactory():
    TypeOnly<current.RiddlerResourcesFactory>;
declare function use_old_ClassDeclaration_RiddlerResourcesFactory(
    use: TypeOnly<old.RiddlerResourcesFactory>): void;
use_old_ClassDeclaration_RiddlerResourcesFactory(
    get_current_ClassDeclaration_RiddlerResourcesFactory());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerRunner": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_RiddlerRunner():
    TypeOnly<old.RiddlerRunner>;
declare function use_current_ClassDeclaration_RiddlerRunner(
    use: TypeOnly<current.RiddlerRunner>): void;
use_current_ClassDeclaration_RiddlerRunner(
    get_old_ClassDeclaration_RiddlerRunner());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerRunner": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_RiddlerRunner():
    TypeOnly<current.RiddlerRunner>;
declare function use_old_ClassDeclaration_RiddlerRunner(
    use: TypeOnly<old.RiddlerRunner>): void;
use_old_ClassDeclaration_RiddlerRunner(
    get_current_ClassDeclaration_RiddlerRunner());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerRunnerFactory": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_RiddlerRunnerFactory():
    TypeOnly<old.RiddlerRunnerFactory>;
declare function use_current_ClassDeclaration_RiddlerRunnerFactory(
    use: TypeOnly<current.RiddlerRunnerFactory>): void;
use_current_ClassDeclaration_RiddlerRunnerFactory(
    get_old_ClassDeclaration_RiddlerRunnerFactory());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_RiddlerRunnerFactory": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_RiddlerRunnerFactory():
    TypeOnly<current.RiddlerRunnerFactory>;
declare function use_old_ClassDeclaration_RiddlerRunnerFactory(
    use: TypeOnly<old.RiddlerRunnerFactory>): void;
use_old_ClassDeclaration_RiddlerRunnerFactory(
    get_current_ClassDeclaration_RiddlerRunnerFactory());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_TenantManager": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_TenantManager():
    TypeOnly<old.TenantManager>;
declare function use_current_ClassDeclaration_TenantManager(
    use: TypeOnly<current.TenantManager>): void;
use_current_ClassDeclaration_TenantManager(
    get_old_ClassDeclaration_TenantManager());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_TenantManager": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_TenantManager():
    TypeOnly<current.TenantManager>;
declare function use_old_ClassDeclaration_TenantManager(
    use: TypeOnly<old.TenantManager>): void;
use_old_ClassDeclaration_TenantManager(
    get_current_ClassDeclaration_TenantManager());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_catch404": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_catch404():
    TypeOnly<typeof old.catch404>;
declare function use_current_VariableDeclaration_catch404(
    use: TypeOnly<typeof current.catch404>): void;
use_current_VariableDeclaration_catch404(
    get_old_VariableDeclaration_catch404());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_catch404": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_catch404():
    TypeOnly<typeof current.catch404>;
declare function use_old_VariableDeclaration_catch404(
    use: TypeOnly<typeof old.catch404>): void;
use_old_VariableDeclaration_catch404(
    get_current_VariableDeclaration_catch404());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_createDocumentRouter": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_createDocumentRouter():
    TypeOnly<typeof old.createDocumentRouter>;
declare function use_current_FunctionDeclaration_createDocumentRouter(
    use: TypeOnly<typeof current.createDocumentRouter>): void;
use_current_FunctionDeclaration_createDocumentRouter(
    get_old_FunctionDeclaration_createDocumentRouter());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_createDocumentRouter": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_createDocumentRouter():
    TypeOnly<typeof current.createDocumentRouter>;
declare function use_old_FunctionDeclaration_createDocumentRouter(
    use: TypeOnly<typeof old.createDocumentRouter>): void;
use_old_FunctionDeclaration_createDocumentRouter(
    get_current_FunctionDeclaration_createDocumentRouter());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_getIdFromRequest": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_getIdFromRequest():
    TypeOnly<typeof old.getIdFromRequest>;
declare function use_current_VariableDeclaration_getIdFromRequest(
    use: TypeOnly<typeof current.getIdFromRequest>): void;
use_current_VariableDeclaration_getIdFromRequest(
    get_old_VariableDeclaration_getIdFromRequest());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_getIdFromRequest": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_getIdFromRequest():
    TypeOnly<typeof current.getIdFromRequest>;
declare function use_old_VariableDeclaration_getIdFromRequest(
    use: TypeOnly<typeof old.getIdFromRequest>): void;
use_old_VariableDeclaration_getIdFromRequest(
    get_current_VariableDeclaration_getIdFromRequest());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getSession": {"forwardCompat": false}
*/
declare function get_old_FunctionDeclaration_getSession():
    TypeOnly<typeof old.getSession>;
declare function use_current_FunctionDeclaration_getSession(
    use: TypeOnly<typeof current.getSession>): void;
use_current_FunctionDeclaration_getSession(
    get_old_FunctionDeclaration_getSession());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "FunctionDeclaration_getSession": {"backCompat": false}
*/
declare function get_current_FunctionDeclaration_getSession():
    TypeOnly<typeof current.getSession>;
declare function use_old_FunctionDeclaration_getSession(
    use: TypeOnly<typeof old.getSession>): void;
use_old_FunctionDeclaration_getSession(
    get_current_FunctionDeclaration_getSession());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_getTenantIdFromRequest": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_getTenantIdFromRequest():
    TypeOnly<typeof old.getTenantIdFromRequest>;
declare function use_current_VariableDeclaration_getTenantIdFromRequest(
    use: TypeOnly<typeof current.getTenantIdFromRequest>): void;
use_current_VariableDeclaration_getTenantIdFromRequest(
    get_old_VariableDeclaration_getTenantIdFromRequest());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_getTenantIdFromRequest": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_getTenantIdFromRequest():
    TypeOnly<typeof current.getTenantIdFromRequest>;
declare function use_old_VariableDeclaration_getTenantIdFromRequest(
    use: TypeOnly<typeof old.getTenantIdFromRequest>): void;
use_old_VariableDeclaration_getTenantIdFromRequest(
    get_current_VariableDeclaration_getTenantIdFromRequest());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_handleError": {"forwardCompat": false}
*/
declare function get_old_VariableDeclaration_handleError():
    TypeOnly<typeof old.handleError>;
declare function use_current_VariableDeclaration_handleError(
    use: TypeOnly<typeof current.handleError>): void;
use_current_VariableDeclaration_handleError(
    get_old_VariableDeclaration_handleError());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "VariableDeclaration_handleError": {"backCompat": false}
*/
declare function get_current_VariableDeclaration_handleError():
    TypeOnly<typeof current.handleError>;
declare function use_old_VariableDeclaration_handleError(
    use: TypeOnly<typeof old.handleError>): void;
use_old_VariableDeclaration_handleError(
    get_current_VariableDeclaration_handleError());
