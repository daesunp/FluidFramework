/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type { TypeOnly, MinimalType, FullType, requireAssignableTo } from "@fluidframework/build-tools";
import type * as old from "@fluidframework/protocol-base-previous";

import type * as current from "../../index.js";

declare type MakeUnusedImportErrorsGoAway<T> = TypeOnly<T> | MinimalType<T> | FullType<T> | typeof old | typeof current | requireAssignableTo<true, true>;

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_ProtocolOpHandler": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_ProtocolOpHandler = requireAssignableTo<TypeOnly<old.ProtocolOpHandler>, TypeOnly<current.ProtocolOpHandler>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_ProtocolOpHandler": {"backCompat": false}
 */
declare type current_as_old_for_Class_ProtocolOpHandler = requireAssignableTo<TypeOnly<current.ProtocolOpHandler>, TypeOnly<old.ProtocolOpHandler>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_Quorum": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_Quorum = requireAssignableTo<TypeOnly<old.Quorum>, TypeOnly<current.Quorum>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_Quorum": {"backCompat": false}
 */
declare type current_as_old_for_Class_Quorum = requireAssignableTo<TypeOnly<current.Quorum>, TypeOnly<old.Quorum>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_QuorumClients": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_QuorumClients = requireAssignableTo<TypeOnly<old.QuorumClients>, TypeOnly<current.QuorumClients>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_QuorumClients": {"backCompat": false}
 */
declare type current_as_old_for_Class_QuorumClients = requireAssignableTo<TypeOnly<current.QuorumClients>, TypeOnly<old.QuorumClients>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_QuorumProposals": {"forwardCompat": false}
 */
declare type old_as_current_for_Class_QuorumProposals = requireAssignableTo<TypeOnly<old.QuorumProposals>, TypeOnly<current.QuorumProposals>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Class_QuorumProposals": {"backCompat": false}
 */
declare type current_as_old_for_Class_QuorumProposals = requireAssignableTo<TypeOnly<current.QuorumProposals>, TypeOnly<old.QuorumProposals>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_ProtocolOpHandler": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_ProtocolOpHandler = requireAssignableTo<TypeOnly<typeof current.ProtocolOpHandler>, TypeOnly<typeof old.ProtocolOpHandler>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_Quorum": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_Quorum = requireAssignableTo<TypeOnly<typeof current.Quorum>, TypeOnly<typeof old.Quorum>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_QuorumClients": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_QuorumClients = requireAssignableTo<TypeOnly<typeof current.QuorumClients>, TypeOnly<typeof old.QuorumClients>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassStatics_QuorumProposals": {"backCompat": false}
 */
declare type current_as_old_for_ClassStatics_QuorumProposals = requireAssignableTo<TypeOnly<typeof current.QuorumProposals>, TypeOnly<typeof old.QuorumProposals>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_buildGitTreeHierarchy": {"backCompat": false}
 */
declare type current_as_old_for_Function_buildGitTreeHierarchy = requireAssignableTo<TypeOnly<typeof current.buildGitTreeHierarchy>, TypeOnly<typeof old.buildGitTreeHierarchy>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_getGitMode": {"backCompat": false}
 */
declare type current_as_old_for_Function_getGitMode = requireAssignableTo<TypeOnly<typeof current.getGitMode>, TypeOnly<typeof old.getGitMode>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Function_getGitType": {"backCompat": false}
 */
declare type current_as_old_for_Function_getGitType = requireAssignableTo<TypeOnly<typeof current.getGitType>, TypeOnly<typeof old.getGitType>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_IProtocolHandler": {"forwardCompat": false}
 */
declare type old_as_current_for_Interface_IProtocolHandler = requireAssignableTo<TypeOnly<old.IProtocolHandler>, TypeOnly<current.IProtocolHandler>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_IProtocolHandler": {"backCompat": false}
 */
declare type current_as_old_for_Interface_IProtocolHandler = requireAssignableTo<TypeOnly<current.IProtocolHandler>, TypeOnly<old.IProtocolHandler>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_IQuorumSnapshot": {"forwardCompat": false}
 */
declare type old_as_current_for_Interface_IQuorumSnapshot = requireAssignableTo<TypeOnly<old.IQuorumSnapshot>, TypeOnly<current.IQuorumSnapshot>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_IQuorumSnapshot": {"backCompat": false}
 */
declare type current_as_old_for_Interface_IQuorumSnapshot = requireAssignableTo<TypeOnly<current.IQuorumSnapshot>, TypeOnly<old.IQuorumSnapshot>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_IScribeProtocolState": {"forwardCompat": false}
 */
declare type old_as_current_for_Interface_IScribeProtocolState = requireAssignableTo<TypeOnly<old.IScribeProtocolState>, TypeOnly<current.IScribeProtocolState>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "Interface_IScribeProtocolState": {"backCompat": false}
 */
declare type current_as_old_for_Interface_IScribeProtocolState = requireAssignableTo<TypeOnly<current.IScribeProtocolState>, TypeOnly<old.IScribeProtocolState>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_QuorumClientsSnapshot": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAlias_QuorumClientsSnapshot = requireAssignableTo<TypeOnly<old.QuorumClientsSnapshot>, TypeOnly<current.QuorumClientsSnapshot>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_QuorumClientsSnapshot": {"backCompat": false}
 */
declare type current_as_old_for_TypeAlias_QuorumClientsSnapshot = requireAssignableTo<TypeOnly<current.QuorumClientsSnapshot>, TypeOnly<old.QuorumClientsSnapshot>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_QuorumProposalsSnapshot": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAlias_QuorumProposalsSnapshot = requireAssignableTo<TypeOnly<old.QuorumProposalsSnapshot>, TypeOnly<current.QuorumProposalsSnapshot>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAlias_QuorumProposalsSnapshot": {"backCompat": false}
 */
declare type current_as_old_for_TypeAlias_QuorumProposalsSnapshot = requireAssignableTo<TypeOnly<current.QuorumProposalsSnapshot>, TypeOnly<old.QuorumProposalsSnapshot>>
