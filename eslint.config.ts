/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import css from '@eslint/css';
import { dirname } from 'node:path';
import docusaurus from '@docusaurus/eslint-plugin';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import jest from 'eslint-plugin-jest';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import json from '@eslint/json';
import { type Linter } from 'eslint';
import noSecrets from 'eslint-plugin-no-secrets';
import react from 'eslint-plugin-react';
import security from 'eslint-plugin-security';
import testing from 'eslint-plugin-testing-library';
import ts from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });
const config: Linter.Config[] = [
  // Order Matters™!
  { ignores: ['build/', '.docusaurus/', 'supports/'] },
  ...compat.config({ extends: ['airbnb', 'airbnb/hooks'] }),
  {
    plugins: { '@docusaurus': docusaurus as any },
    rules: docusaurus.configs.recommended.rules as any,
  },
  css.configs.recommended,
  js.configs.recommended,
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  jsdoc.configs['flat/recommended'],
  json.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  security.configs.recommended,
  {
    files: ['__mocks__/**/*.{js,jsx,ts,tsx}', 'tests/unit/**/*.{js,jsx,ts,tsx}'],
    ...testing.configs['flat/react'],
  },
  {
    languageOptions: { ecmaVersion: 2024, globals: { ...globals.browser } },
    plugins: { 'no-secrets': noSecrets },
    rules: {
      'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: true }],
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
    },
    settings: {
      'import/core-modules': ['@docusaurus/theme-common', '@docusaurus/utils'],
      // This applies to all.
      'import/resolver': { typescript: true },
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...ts.configs.recommended[0],
    ...ts.configs.recommendedTypeChecked[0],
  },
];

export default config;
