/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import type { IUser } from "./users.js";

/**
 * {@link https://jwt.io/introduction/ | JSON Web Token (JWT)} Claims
 *
 * See {@link https://datatracker.ietf.org/doc/html/rfc7519#section-4}
 * @legacy
 * @alpha
 */
export interface ITokenClaims {
	/**
	 * Identifies the document (a.k.a container) for which the token is being generated.
	 * Generated by the service.
	 */
	documentId: string;

	/**
	 * Identifies the permissions required by the client on the document or summary.
	 * For every scope, you can define the permissions you want to give to the client.
	 */
	scopes: string[];

	/**
	 * Unique tenant identifier.
	 */
	tenantId: string;

	/**
	 * User for whom the token was created.
	 */
	user: IUser;

	/**
	 * "Issued At"
	 * Indicates when the authentication for this token occurred.
	 * Expressed in {@link https://en.wikipedia.org/wiki/Unix_time | Unix Time}.
	 *
	 * See {@link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6}
	 */
	iat: number;

	/**
	 * "Expiration Time"
	 * Identifies the expiration time on or after which the token must not be accepted for processing.
	 * Expressed in {@link https://en.wikipedia.org/wiki/Unix_time | Unix Time}.
	 *
	 * See {@link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4}
	 */
	exp: number;

	/**
	 * "Version"
	 * Version of the access token.
	 */
	ver: string;

	/**
	 * "JWT ID"
	 * A unique identifier for the token.
	 *
	 * See {@link https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7}
	 */
	jti?: string;
}

/**
 * @deprecated Please use client-specific types instead. E.g. from `@fluidframework/routerlicious-driver`.
 * @internal
 */
export interface ISummaryTokenClaims {
	sub: string;
	act: IActorClient;
	claims: ITokenClaims;
}

/**
 * @deprecated Please use client-specific types instead. E.g. from `@fluidframework/routerlicious-driver`.
 * @internal
 */
export interface IActorClient {
	sub: string;
}

/**
 * @deprecated Please use client-specific types instead. E.g. from `@fluidframework/routerlicious-driver`.
 * @internal
 */
export interface ITokenService {
	extractClaims(token: string): ITokenClaims;
}

/**
 * @deprecated Please use client-specific types instead. E.g. from `@fluidframework/routerlicious-driver`.
 * @internal
 */
export interface ITokenProvider {
	/**
	 * Whether or not the token is still valid to use.
	 */
	isValid(): boolean;
}
