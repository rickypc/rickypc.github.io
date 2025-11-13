/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const DEFAULT_BUILD_DIR_NAME = 'build';

export const DEFAULT_CONFIG_FILE_NAME = 'docusaurus.config.js';

export const getFileCommitDate = jest.fn();

export const siteConfig = { title: 'site-title', url: 'https://example.com' };

// After siteConfig assignment.
export const loadFreshModule = jest.fn(() => siteConfig);
