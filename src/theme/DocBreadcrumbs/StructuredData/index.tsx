/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/**
 * Suppresses the theme's standalone BreadcrumbList structured-data script. The unified `@graph`
 * script emitted by the injected `Metadata` component carries the BreadcrumbList node (built from
 * the same `useSidebarBreadcrumbs()` data), keeping exactly one `application/ld+json` script per
 * docs page.
 * @returns {ReturnType} Always null; the visible breadcrumb navigation itself stays untouched.
 */
export default function DocBreadcrumbsStructuredDataWrapper(): null {
  return null;
}
