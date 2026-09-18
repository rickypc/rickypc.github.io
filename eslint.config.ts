/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import docusaurus from '@docusaurus/eslint-plugin';
import css from '@eslint/css';
import json from '@eslint/json';
import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import * as jsdoc from 'eslint-plugin-jsdoc';
import noSecrets from 'eslint-plugin-no-secrets';
import security from 'eslint-plugin-security';
import testing from 'eslint-plugin-testing-library';
import globals from 'globals';
import * as ts from 'typescript-eslint';

const config: Linter.Config[] = [
  // Order Matters™!
  { ignores: ['build', 'coverage', '.docusaurus', 'supports'] },
  {
    files: ['**/*.{css}'],
    ...css.configs.recommended,
  },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  jsdoc.configs['flat/recommended'],
  {
    files: ['**/*.{json}'],
    language: 'json/json',
    ...json.configs.recommended,
  },
  {
    files: ['**/*.{jsonc}'],
    language: 'json/jsonc',
    ...json.configs.recommended,
  },
  security.configs.recommended,
  {
    files: ['__mocks__/**/*.{ts,tsx}', 'tests/unit/**/*.{ts,tsx}'],
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
      'css/font-family-fallbacks': 'off',
      ...(docusaurus.configs.recommended.rules as any),
      'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, optionalDependencies: true },
      ],
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
      'max-depth': ['error', 4],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    },
    settings: {
      'import/core-modules': ['@docusaurus/theme-common', '@docusaurus/utils'],
      // This applies to all.
      'import/resolver': { typescript: true },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...ts.configs.recommendedTypeChecked[0],
  },
];

export default config;
