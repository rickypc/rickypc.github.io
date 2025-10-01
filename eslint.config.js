/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const docusaurus = require('@docusaurus/eslint-plugin');
const { FlatCompat } = require('@eslint/eslintrc');
const { globalIgnores } = require('eslint/config');
const jest = require('eslint-plugin-jest');
const js = require('@eslint/js');
const jsdoc = require('eslint-plugin-jsdoc');
const json = require('eslint-plugin-json');
const noSecrets = require('eslint-plugin-no-secrets');
const security = require('eslint-plugin-security');
const testing = require('eslint-plugin-testing-library');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  globalIgnores(['build/', '.docusaurus/']),
  // Order Matters™!
  js.configs.recommended,
  {
    plugins: { '@docusaurus': docusaurus },
    rules: docusaurus.configs.recommended.rules,
  },
  jest.configs['flat/recommended'],
  jsdoc.configs['flat/recommended'],
  json.configs.recommended,
  {
    files: ['**/*.jsx?', '**/*.tsx?'],
    plugins: { 'no-secrets': noSecrets },
  },
  security.configs.recommended,
  {
    files: ['tests/unit/**/*.jsx?'],
    ...testing.configs['flat/react'],
  },
  ...compat.config({
    env: {
      browser: true,
      'jest/globals': true,
      node: true,
    },
    extends: [
      'airbnb',
      'airbnb/hooks',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
    ],
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { optionalDependencies: true }],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
      // Better React debugging.
      'prefer-arrow-callback': 'off',
      // Throwing error for no good reason.
      'react/jsx-props-no-multi-spaces': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
    },
    settings: {
      'import/core-modules': ['@docusaurus/theme-common', '@docusaurus/utils'],
      react: { version: 'detect' },
    },
  }),
];
