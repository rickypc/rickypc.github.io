/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { basename, extname } from 'node:path';

/**
 * Jest transformer for static assets with extension-specific behavior.
 *
 * This function transforms imported asset files into mock modules for
 * Jest testing. It supports the following extensions: `.avif`, `.css`, `.gif`,
 * `.jpeg`, `.jpg`, `.png`, `.svg`, `.webp`, and others.
 *
 * Behavior by extension:
 * - `.avif`, `.webp`: Returns an object with a `default` key containing
 *   the filename string. This supports usage like
 *   `require('./image.avif').default === 'image.avif'`.
 * - `.css`: Returns a Proxy object that mimics CSS module behavior, mapping
 *   any property access to its own name (e.g., `styles.foo === 'foo'`).
 * - `.gif`, `.jpeg`, `.jpg`, `.png`: Returns the filename string directly
 *   as a CommonJS export. This supports usage like
 *   `require('./image.jpg') === 'image.jpg'`.
 * - `.svg`: Returns a mock React component, compatible with
 *   `import Icon from './icon.svg'`.
 * - Other extensions: Returns an object with a `default` key containing
 *   the filename string, similar to `.avif` and `.webp`, to support
 *   default-style imports.
 * @param {string} _ - The file content (ignored in this transformer).
 * @param {string} path - The full path to the asset file being transformed.
 * @returns {{ code: string }} - A string of JavaScript code exporting
 *   the mocked asset.
 */
// eslint-disable-next-line import/prefer-default-export
export function process(_: string, path: string) {
  let code = '';
  switch (extname(path).toLowerCase()) {
    case '.css':
      code = `module.exports = new Proxy({}, {
        get(target, key) {
          return key === '__esModule' ? false : key;
        },
      });`;
      break;

    case '.gif':
    case '.jpeg':
    case '.jpg':
    case '.png':
      code = `module.exports = ${JSON.stringify(basename(path))};`;
      break;

    case '.svg':
      code = `const { createElement } = require('react');
      module.exports = function SVG({ ref, ...props }) {
        return createElement('svg', { ...props, ref });
      };`;
      break;

    default:
      code = `module.exports.default = ${JSON.stringify(basename(path))};`;
  }

  return { code };
}
