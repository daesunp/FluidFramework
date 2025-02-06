/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { translate } from "@docusaurus/Translate";
import {
	useVersions,
	useActiveDocContext,
	useDocsVersionCandidates,
	useDocsPreferredVersion,
} from "@docusaurus/plugin-content-docs/client";
import type {
	GlobalVersion,
	GlobalDoc,
	ActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type { Props } from "@theme/NavbarItem/DocsVersionDropdownNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import React from "react";

/**
 * Gets the documentation page marked as the main/landing page for a version,
 * identified by the mainDocId property.
 *
 * @param version - The version object to get the main doc from
 * @returns The main documentation page for this version
 */
function getVersionMainDoc(version: GlobalVersion): GlobalDoc {
	return version.docs.find((doc) => doc.id === version.mainDocId);
}

/**
 * When navigating between versions, attempts to keep the user on the same page.
 * If the current page doesn't exist in the target version, falls back to that version's main page.
 *
 * @param version - The version being navigated to
 * @param activeDocContext - Information about the currently viewed documentation
 * @returns Either the equivalent page in the target version, or that version's main page
 */
function getVersionTargetDoc(
	version: GlobalVersion,
	activeDocContext: ActiveDocContext,
): GlobalDoc {
	return activeDocContext.alternateDocVersions[version.name] ?? getVersionMainDoc(version);
}

type AccessibleLinkProps = LinkLikeNavbarItemProps & {
	"aria-label"?: string;
	"role"?: string;
	"aria-setsize"?: number;
	"aria-posinset"?: number;
	"className"?: string;
};

/**
 * This module provides a custom implementation of the DropdownNavbarItem to enhance accessibility of the dropdown menu for navigation between doc versions.
 *
 * Context:
 * - The default Docusaurus component does not allow modification of version items for accessibility or customization.
 * - This implementation uses internal hooks (e.g., `useVersions`, `useDocsPreferredVersion`) to overcome that limitation.
 *
 * @remarks this module was generated by `swizzling` the Docusaurus "classic" theme's Footer component.
 * See {@link https://docusaurus.io/docs/swizzling/ | here} for more information on swizzling.
 */
export default function DocsVersionDropdownNavbarItem({
	mobile,
	docsPluginId,
	dropdownItemsBefore,
	dropdownItemsAfter,
	...props
}: Props): JSX.Element {
	const { search, hash } = useLocation();
	const activeDocContext = useActiveDocContext(docsPluginId);
	const versions = useVersions(docsPluginId);
	const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);

	function versionToAccessibleLink(version: GlobalVersion, index: number): AccessibleLinkProps {
		const targetDoc = getVersionTargetDoc(version, activeDocContext);
		return {
			"label": version.label,
			"to": `${targetDoc.path}${search}${hash}`,
			"isActive": () => version === activeDocContext.activeVersion,
			"onClick": () => savePreferredVersionName(version.name),
			"aria-label": `Version ${version.label}, item ${index + 1} of ${versions.length}`,
			"role": "menuitem",
			"aria-setsize": versions.length,
			"aria-posinset": index + 1,
			"className": "version-dropdown__item",
		};
	}

	const items: AccessibleLinkProps[] = [
		...dropdownItemsBefore,
		...versions.map((version, index) => versionToAccessibleLink(version, index)),
		...dropdownItemsAfter,
	];

	const dropdownVersion = useDocsVersionCandidates(docsPluginId)?.[0];

	const dropdownLabel =
		mobile === true && items.length > 1
			? translate({
					id: "theme.navbar.mobileVersionsDropdown.label",
					message: "Versions",
					description: "The label for the navbar versions dropdown on mobile view",
				})
			: dropdownVersion.label;
	const dropdownTo =
		mobile === true && items.length > 1
			? undefined
			: getVersionTargetDoc(dropdownVersion, activeDocContext).path;

	// Do not display this navbar item if current page is not a doc
	if (!activeDocContext.activeDoc) {
		return <></>;
	}

	if (items.length <= 1) {
		return (
			<DefaultNavbarItem {...props} mobile={mobile} label={dropdownLabel} to={dropdownTo} />
		);
	}

	return (
		<div className="version-dropdown-wrapper">
			<DropdownNavbarItem
				{...props}
				mobile={mobile}
				label={dropdownLabel}
				to={dropdownTo}
				items={items}
				aria-label="Select documentation version"
				role="combobox"
				aria-haspopup="listbox"
			/>
		</div>
	);
}
