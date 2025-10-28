/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const docusaurus = require('@docusaurus/eslint-plugin');
const { FlatCompat } = require('@eslint/eslintrc');
const { globalIgnores } = require('eslint/config');
const globals = require('globals');
const jest = require('eslint-plugin-jest');
const js = require('@eslint/js');
const jsdoc = require('eslint-plugin-jsdoc');
const json = require('eslint-plugin-json');
const noSecrets = require('eslint-plugin-no-secrets');
const react = require('eslint-plugin-react');
const security = require('eslint-plugin-security');
const testing = require('eslint-plugin-testing-library');
const ts = require('typescript-eslint');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  globalIgnores(['build/', '.docusaurus/']),
  // Order Matters™!
  ...compat.config({ extends: ['airbnb', 'airbnb/hooks'] }),
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    plugins: { '@docusaurus': docusaurus },
    rules: docusaurus.configs.recommended.rules,
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { 'no-secrets': noSecrets },
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
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...ts.configs.recommended[0],
    ...ts.configs.recommendedTypeChecked[0],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
    },
  },
  jest.configs['flat/recommended'],
  jsdoc.configs['flat/recommended'],
  json.configs.recommended,
  security.configs.recommended,
  {
    files: ['__mocks__/**/*.{js,jsx,ts,tsx}', 'tests/unit/**/*.{js,jsx,ts,tsx}'],
    ...testing.configs['flat/react'],
  },
];
