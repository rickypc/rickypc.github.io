/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const { FlatCompat } = require('@eslint/eslintrc');
const hermes = require('hermes-eslint');
const jest = require('eslint-plugin-jest');
const js = require('@eslint/js');
const jsdoc = require('eslint-plugin-jsdoc');
const json = require('eslint-plugin-json');
const noSecrets = require('eslint-plugin-no-secrets');
const security = require('eslint-plugin-security');
const testing = require('eslint-plugin-testing-library');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  // Order Matters™!
  js.configs.recommended,
  { languageOptions: { parser: hermes } },
  jest.configs['flat/recommended'],
  jsdoc.configs['flat/recommended'],
  json.configs.recommended,
  {
    files: ['**/*.js?', '**/*.ts'],
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
      'plugin:@docusaurus/recommended',
      'plugin:react/jsx-runtime',
    ],
    ignorePatterns: [
      'build/',
      '.docusaurus/',
    ],
    overrides: [
      { files: ['**/*.js?'] },
    ],
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
    },
    rules: {
      // Better React debugging.
      'prefer-arrow-callback': 'off',
      'import/no-extraneous-dependencies': ['error', { optionalDependencies: true }],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
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
