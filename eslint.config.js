/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const docusaurus = require('@docusaurus/eslint-plugin');
const { FlatCompat } = require('@eslint/eslintrc');
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
  // Order Matters™!
  { ignores: ['build/', '.docusaurus/'] },
  ...compat.config({ extends: ['airbnb', 'airbnb/hooks'] }),
  {
    plugins: { '@docusaurus': docusaurus },
    rules: docusaurus.configs.recommended.rules,
  },
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
      'import/no-extraneous-dependencies': ['error', { optionalDependencies: true }],
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
      // This applies to js, jsx, ts, tsx.
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
