/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import docusaurus from '@docusaurus/eslint-plugin';
import parser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import * as jsdoc from 'eslint-plugin-jsdoc';
import noSecrets from 'eslint-plugin-no-secrets';
import security from 'eslint-plugin-security';
import testing from 'eslint-plugin-testing-library';
import globals from 'globals';

const config: Linter.Config[] = [
  // Order Matters™!
  { ignores: ['build', 'coverage', '.docusaurus', 'supports'] },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsdoc.configs['flat/recommended'],
  security.configs.recommended,
  {
    files: ['tests/unit/**/*.{ts,tsx}'],
    ...testing.configs['flat/react'],
  },
  {
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        EventListener: 'readonly',
        EventListenerOrEventListenerObject: 'readonly',
        IntersectionObserverCallback: 'readonly',
      },
    },
    plugins: { '@docusaurus': docusaurus as any, 'no-secrets': noSecrets },
    rules: {
      ...(docusaurus.configs.recommended.rules as any),
      'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, optionalDependencies: true },
      ],
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
      'max-depth': ['error', 4],
      'no-secrets/no-secrets': [
        'error',
        {
          ignoreContent: [
            /@docusaurus\//,
            /@site\/src\/font\/.*\.woff2/,
            /[A-Z]+_GEOMETRY\.fontSizes/,
            /asetnsamples\b/,
            /ChildProcessWithoutNullStreams/,
            /https?:\/\//,
          ],
        },
      ],
    },
    settings: {
      'import/core-modules': ['@docusaurus/theme-common', '@docusaurus/utils', 'bun', 'bun:test'],
      // This applies to all.
      'import/resolver': { typescript: true },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      parser,
      sourceType: 'module',
    },
  },
];

export default config;
