/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export const DEFAULT_BUILD_DIR_NAME = 'build';

export const DEFAULT_CONFIG_FILE_NAME = 'docusaurus.config.ts';

export const getFileCommitDate = jest.fn();

export const siteConfig = { title: 'site-title', url: 'https://example.com' };

// After siteConfig assignment.
export const loadFreshModule = jest.fn(() => siteConfig);
