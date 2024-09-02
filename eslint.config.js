/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const { FlatCompat } = require('@eslint/eslintrc');
const hermes = require('hermes-eslint');
const js = require('@eslint/js');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  // Order Matters™!
  js.configs.recommended,
  {
    languageOptions: {
      parser: hermes,
    },
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
      {
        files: ['**/*.js?'],
      },
    ],
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
    },
    plugins: ['import'],
    rules: {
      // Better React debugging.
      'prefer-arrow-callback': 'off',
      'import/no-extraneous-dependencies': ['error', { optionalDependencies: true }],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
    },
    settings: {
      'import/core-modules': ['@docusaurus/theme-common', '@docusaurus/utils'],
      react: { version: 'detect' },
    },
  }),
];
