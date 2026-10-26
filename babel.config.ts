/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { fileURLToPath } from 'node:url';
import {
  babelSmartSpace,
  // Node ESM type-stripping resolves this config import, so the .ts extension is required.
  // eslint-disable-next-line import/extensions
} from '#root/src/plugins/smart-space.ts';

/**
 * Babel configuration for the site: babelSmartSpace keeps JSX text whitespace HTML-semantic in
 * .ts/.tsx sources (see src/plugins/smart-space for the rule table), and the Docusaurus preset
 * supplies the syntax transformation.
 */
export default {
  plugins: [babelSmartSpace],
  presets: [fileURLToPath(import.meta.resolve('@docusaurus/core/lib/babel/preset'))],
};
