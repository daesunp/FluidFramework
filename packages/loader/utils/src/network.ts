/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { INetworkError } from "@microsoft/fluid-protocol-definitions";

/**
 * Network error error class - used to communicate all  network errors
 */
export class NetworkError extends Error implements INetworkError {

    private readonly customProperties = new Map<string, any>();

    constructor(
            errorMessage: string,
            customProperties: [string, any][]) {
        super(errorMessage);
        customProperties.push([INetworkErrorProperties.online, OnlineStatus[isOnline()]]);
        for (const [key, val] of customProperties) {
            Object.defineProperty(NetworkError.prototype, key, {
                get: () => {
                    return val;
                },
            });
            this.customProperties.set(key, val);
        }
    }

    public getCustomProperties() {
        const prop = {};
        for (const [key, value] of this.customProperties) {
            prop[key] = value;
        }
        return prop;
    }
}

export function throwNetworkError(
        errorMessage: string,
        statusCode: number,
        canRetry: boolean,
        response?: Response) {
    let message = errorMessage;
    if (response) {
        message = `${message}, msg = ${response.statusText}, type = ${response.type}`;
    }
    throw new NetworkError(message, [
        [INetworkErrorProperties.statusCode , statusCode],
        [INetworkErrorProperties.canRetry, canRetry],
        [INetworkErrorProperties.sprequestguid, response ? `${response.headers.get("sprequestguid")}` : undefined],
    ]);
}

export enum INetworkErrorProperties {
    canRetry = "canRetry",
    statusCode = "statusCode",
    retryAfterSeconds = "retryAfterSeconds",
    sprequestguid = "sprequestguid",
    online = "online",
}

export enum OnlineStatus {
    Offline,
    Online,
    Unknown,
}

// It tells if we have local connection only - we might not have connection to web.
// No solution for node.js (other than resolve dns names / ping specific sites)
// Can also use window.addEventListener("online" / "offline")
export function isOnline(): OnlineStatus {
    if (typeof navigator === "object" && navigator !== null && typeof navigator.onLine === "boolean") {
        return navigator.onLine ? OnlineStatus.Online : OnlineStatus.Offline;
    }
    return OnlineStatus.Unknown;
}
