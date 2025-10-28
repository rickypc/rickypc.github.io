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
const ts = require('typescript-eslint');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  globalIgnores(['build/', '.docusaurus/']),
  // Order Matters™!
  {
    ...js.configs.recommended,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      ecmaVersion: 2022,
      sourceType: 'commonjs',
    },
    plugins: { 'no-secrets': noSecrets },
    rules: {
      ...js.configs.recommended.rules,
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ...ts.configs.recommended[0],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ...ts.configs.recommended[0].languageOptions,
      parser: ts.parser,
      parserOptions: {
        ...ts.configs.recommended[0].languageOptions?.parserOptions || {},
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { 'no-secrets': noSecrets },
    rules: {
      ...ts.configs.recommended[0].rules,
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    plugins: { '@docusaurus': docusaurus },
    rules: docusaurus.configs.recommended.rules,
  },
  jest.configs['flat/recommended'],
  jsdoc.configs['flat/recommended'],
  json.configs.recommended,
  security.configs.recommended,
  {
    files: ['__mocks__/**/*.{js,jsx,ts,tsx}', 'tests/unit/**/*.{js,jsx,ts,tsx}'],
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
      ecmaVersion: 2022,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { optionalDependencies: true }],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
      // Better React debugging.
      'prefer-arrow-callback': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
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
