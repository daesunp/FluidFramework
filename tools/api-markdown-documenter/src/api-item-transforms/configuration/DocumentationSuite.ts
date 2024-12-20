/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import {
	type ApiDeclaredItem,
	type ApiItem,
	ApiItemKind,
	type ApiPackage,
	ReleaseTag,
} from "@microsoft/api-extractor-model";

import {
	type ApiMemberKind,
	getApiItemKind,
	getConciseSignature,
	getFileSafeNameForApiItem,
	getFileSafeNameForApiItemName,
	getReleaseTag,
	getSingleLineExcerptText,
	getUnscopedPackageName,
	isDeprecated,
} from "../../utilities/index.js";

/**
 * List of item kinds for which separate documents should be generated.
 * Items specified will be rendered to their own documents.
 * Items not specified will be rendered into their parent's contents.
 *
 * @remarks Note that `Model` and `Package` items will *always* have separate documents generated for them, even if
 * not specified.
 *
 * Also note that `EntryPoint` items will always be ignored by the system, even if specified here.
 *
 * @example
 *
 * A configuration like the following:
 *
 * ```typescript
 * ...
 * documentBoundaries: [
 *  ApiItemKind.Namespace,
 * ],
 * ...
 * ```
 *
 * will result in separate documents being generated for `Namespace` items, but will not for other item kinds
 * (`Classes`, `Interfaces`, etc.).
 *
 * @public
 */
export type DocumentBoundaries = ApiMemberKind[];

/**
 * List of item kinds for which sub-directories will be generated, and under which child item documents will be created.
 * If not specified for an item kind, any children of items of that kind will be generated adjacent to the parent.
 *
 * @remarks Note that `Package` items will *always* have separate documents generated for them, even if
 * not specified.
 *
 * @example
 *
 * A configuration like the following:
 *
 * ```typescript
 * ...
 * hierarchyBoundaries: [
 *  ApiItemKind.Namespace,
 * ],
 * ...
 * ```
 *
 * will result in documents rendered for children of the `Namespace` to be generated in a subdirectory named after
 * the `Namespace` item.
 *
 * So for some namespace `Foo` with children `Bar` and `Baz` (assuming `Bar` and `Baz` are item kinds matching
 * the configured {@link DocumentationSuiteConfiguration.documentBoundaries}), the resulting file structure would look like the
 * following:
 *
 * ```
 * foo.md
 * foo
 *  | bar.md
 *  | baz.md
 * ```
 *
 * @public
 */
export type HierarchyBoundaries = ApiMemberKind[];

/**
 * Options for configuring the documentation suite generated by the API Item -\> Documentation Domain transformation.
 *
 * @public
 */
export interface DocumentationSuiteConfiguration {
	/**
	 * Whether or not to include a top-level heading in rendered documents.
	 *
	 * @defaultValue `true`
	 *
	 * @remarks If you will be rendering the document contents into some other document content that will inject its
	 * own root heading, this can be used to omit that heading from what is rendered by this system.
	 */
	readonly includeTopLevelDocumentHeading: boolean;

	/**
	 * Whether or not to include a navigation breadcrumb at the top of rendered documents.
	 *
	 * @defaultValue `true`
	 *
	 * @remarks Note: `Model` items will never have a breadcrumb rendered, even if this is specfied.
	 */
	readonly includeBreadcrumb: boolean;

	/**
	 * See {@link DocumentBoundaries}.
	 *
	 * @defaultValue {@link DefaultDocumentationSuiteOptions.defaultDocumentBoundaries}
	 */
	readonly documentBoundaries: DocumentBoundaries;

	/**
	 * See {@link HierarchyBoundaries}.
	 *
	 * @defaultValue {@link DefaultDocumentationSuiteOptions.defaultHierarchyBoundaries}
	 */
	readonly hierarchyBoundaries: HierarchyBoundaries;

	/**
	 * Generate a file name for the provided `ApiItem`.
	 *
	 * @remarks
	 *
	 * Note that this is not the complete file name, but the "leaf" component of the final file name.
	 * Additional prefixes and suffixes will be appended to ensure file name collisions do not occur.
	 *
	 * This also does not contain the file extension.
	 *
	 * @example
	 *
	 * We are given a class API item "Bar" in package "Foo", and this returns "foo".
	 * The final file name in this case might be something like "foo-bar-class".
	 *
	 * @param apiItem - The API item for which the pre-modification file name is being generated.
	 *
	 * @returns The pre-modification file name for the API item.
	 *
	 * @defaultValue {@link DefaultDocumentationSuiteOptions.defaultGetFileNameForItem}
	 */
	readonly getFileNameForItem: (apiItem: ApiItem) => string;

	/**
	 * Optionally provide an override for the URI base used in links generated for the provided `ApiItem`.
	 *
	 * @remarks
	 *
	 * This can be used to match on particular item kinds, package names, etc., and adjust the links generated
	 * in the documentation accordingly.
	 *
	 * @param apiItem - The API item in question.
	 *
	 * @returns The URI base to use for the API item, or undefined if the default base should be used.
	 *
	 * @defaultValue Always use the default URI base.
	 */
	readonly getUriBaseOverrideForItem: (apiItem: ApiItem) => string | undefined;

	/**
	 * Generate heading text for the provided `ApiItem`.
	 *
	 * @param apiItem - The API item for which the heading is being generated.
	 *
	 * @returns The heading title for the API item.
	 *
	 * @defaultValue {@link DefaultDocumentationSuiteOptions.defaultGetHeadingTextForItem}
	 */
	readonly getHeadingTextForItem: (apiItem: ApiItem) => string;

	/**
	 * Generate link text for the provided `ApiItem`.
	 *
	 * @param apiItem - The API item for which the link is being generated.
	 *
	 * @returns The text to use in the link to the API item.
	 *
	 * @defaultValue {@link DefaultDocumentationSuiteOptions.defaultGetLinkTextForItem}
	 */
	readonly getLinkTextForItem: (apiItem: ApiItem) => string;

	/**
	 * Generate a list of "alerts" to display in API items tables for a given API item.
	 *
	 * @param apiItem - The API item for which table cell contents are being generated.
	 *
	 * @returns The list of "alert" strings to display.
	 *
	 * @defaultValue {@link DefaultDocumentationSuiteOptions.defaultGetAlertsForItem}
	 */
	readonly getAlertsForItem: (apiItem: ApiItem) => string[];

	/**
	 * Whether or not the provided `ApiPackage` should be skipped during documentation generation.
	 *
	 * @param apiPackage - The package that may or may not be skipped.
	 *
	 * @returns
	 *
	 * `true` if the package should not be included documentation generation. `false` otherwise.
	 *
	 * @defaultValue No packages are skipped.
	 */
	readonly skipPackage: (apiPackage: ApiPackage) => boolean;

	/**
	 * Minimal release scope to include in generated documentation suite.
	 * API members with matching or higher scope will be included, while lower scoped items will be omitted.
	 *
	 * @remarks
	 *
	 * Note that items tagged as `@internal` are not included in the models generated by API-Extractor,
	 * so `@internal` items will never be included for such models.
	 *
	 * Hierarchy: `@public` \> `@beta` \> `@alpha` \> `@internal`
	 *
	 * @defaultValue Include everything in the input model.
	 *
	 * @example `@beta` and `@public`
	 *
	 * To only include `@beta` and `@public` items (and omit `@alpha` items), specify:
	 *
	 * ```typescript
	 * releaseLevel: ReleaseTag.Beta
	 * ```
	 */
	readonly minimumReleaseLevel: Omit<ReleaseTag, ReleaseTag.None>;
}

/**
 * Contains a list of default documentation transformations, used by {@link DocumentationSuiteConfiguration}.
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DefaultDocumentationSuiteOptions {
	/**
	 * Default {@link DocumentationSuiteConfiguration.documentBoundaries}.
	 *
	 * Generates separate documents for the following API item kinds:
	 *
	 * - Class
	 *
	 * - Interface
	 *
	 * - Namespace
	 */
	export const defaultDocumentBoundaries: ApiMemberKind[] = [
		ApiItemKind.Class,
		ApiItemKind.Interface,
		ApiItemKind.Namespace,
	];

	/**
	 * Default {@link DocumentationSuiteConfiguration.hierarchyBoundaries}.
	 *
	 * Creates sub-directories for the following API item kinds:
	 *
	 * - Namespace
	 */
	export const defaultHierarchyBoundaries: ApiMemberKind[] = [ApiItemKind.Namespace];

	/**
	 * Default {@link DocumentationSuiteConfiguration.getFileNameForItem}.
	 *
	 * Uses the item's qualified API name, but is handled differently for the following items:
	 *
	 * - Model: Uses "index".
	 *
	 * - Package: Uses the unscoped package name.
	 */
	export function defaultGetFileNameForItem(apiItem: ApiItem): string {
		const itemKind = getApiItemKind(apiItem);
		switch (itemKind) {
			case ApiItemKind.Model: {
				return "index";
			}
			case ApiItemKind.Package: {
				return getFileSafeNameForApiItemName(getUnscopedPackageName(apiItem as ApiPackage));
			}
			default: {
				return getFileSafeNameForApiItem(apiItem);
			}
		}
	}

	/**
	 * Default {@link DocumentationSuiteConfiguration.getUriBaseOverrideForItem}.
	 *
	 * Always uses default URI base.
	 */
	export function defaultGetUriBaseOverrideForItem(): string | undefined {
		return undefined;
	}

	/**
	 * Default {@link DocumentationSuiteConfiguration.getHeadingTextForItem}.
	 *
	 * Uses the item's `displayName`, except for `Model` items, in which case the text "API Overview" is displayed.
	 */
	export function defaultGetHeadingTextForItem(apiItem: ApiItem): string {
		const itemKind = getApiItemKind(apiItem);
		switch (itemKind) {
			case ApiItemKind.Model: {
				return "API Overview";
			}
			case ApiItemKind.CallSignature:
			case ApiItemKind.ConstructSignature:
			case ApiItemKind.IndexSignature: {
				// For signature items, the display-name is not particularly useful information
				// ("(constructor)", "(call)", etc.).
				// Instead, we will use a cleaned up variation on the type signature.
				const excerpt = getSingleLineExcerptText((apiItem as ApiDeclaredItem).excerpt);
				return trimTrailingSemicolon(excerpt);
			}
			default: {
				return apiItem.displayName;
			}
		}
	}

	/**
	 * Default {@link DocumentationSuiteConfiguration.getLinkTextForItem}.
	 *
	 * Uses the item's signature, except for `Model` items, in which case the text "Packages" is displayed.
	 */
	export function defaultGetLinkTextForItem(apiItem: ApiItem): string {
		const itemKind = getApiItemKind(apiItem);
		switch (itemKind) {
			case ApiItemKind.Model: {
				return "Packages";
			}
			case ApiItemKind.CallSignature:
			case ApiItemKind.ConstructSignature:
			case ApiItemKind.IndexSignature: {
				// For signature items, the display-name is not particularly useful information
				// ("(constructor)", "(call)", etc.).
				// Instead, we will use a cleaned up variation on the type signature.
				const excerpt = getSingleLineExcerptText((apiItem as ApiDeclaredItem).excerpt);
				return trimTrailingSemicolon(excerpt);
			}
			default: {
				return getConciseSignature(apiItem);
			}
		}
	}

	/**
	 * Default {@link DocumentationSuiteConfiguration.getHeadingTextForItem}.
	 *
	 * Generates alerts for the following tags, if found:
	 *
	 * - `@alpha`: "Alpha"
	 *
	 * - `@beta`: "Beta"
	 *
	 * - `@deprecated`: "Deprecated"
	 */
	export function defaultGetAlertsForItem(apiItem: ApiItem): string[] {
		const alerts: string[] = [];
		if (isDeprecated(apiItem)) {
			alerts.push("Deprecated");
		}

		const releaseTag = getReleaseTag(apiItem);
		if (releaseTag === ReleaseTag.Alpha) {
			alerts.push("Alpha");
		} else if (releaseTag === ReleaseTag.Beta) {
			alerts.push("Beta");
		}
		return alerts;
	}

	/**
	 * Default {@link DocumentationSuiteConfiguration.skipPackage}.
	 *
	 * Unconditionally returns `false` (i.e. no packages will be filtered out).
	 */
	export function defaultSkipPackage(): boolean {
		return false;
	}
}

/**
 * Default {@link DocumentationSuiteConfiguration}.
 */
const defaultDocumentationSuiteConfiguration: DocumentationSuiteConfiguration = {
	includeTopLevelDocumentHeading: true,
	includeBreadcrumb: true,
	documentBoundaries: DefaultDocumentationSuiteOptions.defaultDocumentBoundaries,
	hierarchyBoundaries: DefaultDocumentationSuiteOptions.defaultHierarchyBoundaries,
	getFileNameForItem: DefaultDocumentationSuiteOptions.defaultGetFileNameForItem,
	getUriBaseOverrideForItem: DefaultDocumentationSuiteOptions.defaultGetUriBaseOverrideForItem,
	getHeadingTextForItem: DefaultDocumentationSuiteOptions.defaultGetHeadingTextForItem,
	getLinkTextForItem: DefaultDocumentationSuiteOptions.defaultGetLinkTextForItem,
	getAlertsForItem: DefaultDocumentationSuiteOptions.defaultGetAlertsForItem,
	skipPackage: DefaultDocumentationSuiteOptions.defaultSkipPackage,
	minimumReleaseLevel: ReleaseTag.Internal, // Include everything in the input model
};

/**
 * Gets a complete {@link DocumentationSuiteConfiguration} using the provided partial configuration, and filling
 * in the remainder with the documented defaults.
 */
export function getDocumentationSuiteConfigurationWithDefaults(
	options?: Partial<DocumentationSuiteConfiguration>,
): DocumentationSuiteConfiguration {
	return {
		...defaultDocumentationSuiteConfiguration,
		...options,
	};
}

/**
 * Trims a trailing semicolon from the provided text, if the text contains one.
 */
function trimTrailingSemicolon(text: string): string {
	if (text.endsWith(";")) {
		return text.slice(0, text.length - 1);
	}
	return text;
}
