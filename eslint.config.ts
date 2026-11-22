/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import docusaurus from '@docusaurus/eslint-plugin';
import * as parser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import * as jsdoc from 'eslint-plugin-jsdoc';
import security from 'eslint-plugin-security';
import testing from 'eslint-plugin-testing-library';

// A JSDoc block is required on the module surface: exported functions, exported arrow functions,
// and the components wrapped in `memo(...)`. The block sits above the `export` keyword, so every
// context targets the declaration node whose comment ESLint associates with the inner function.
const requireJsdocContexts = [
  'ExportDefaultDeclaration > ArrowFunctionExpression',
  'ExportDefaultDeclaration:has(CallExpression[callee.name="memo"])',
  'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
  'ExportNamedDeclaration:has(VariableDeclarator > CallExpression[callee.name="memo"])',
];

const config: Linter.Config[] = [
  // Order Matters™!
  { ignores: ['build', 'coverage', '.docusaurus', 'playwright', 'supports'] },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsdoc.configs['flat/recommended'],
  security.configs.recommended,
  { files: ['tests/unit/**/*.{ts,tsx}'], ...testing.configs['flat/react'] },
  {
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        HTMLAudioElement: 'readonly',
      },
    },
    plugins: { '@docusaurus': docusaurus as any },
    rules: {
      ...(docusaurus.configs.recommended.rules as any),
      'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, optionalDependencies: true },
      ],
      'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
      'max-depth': ['error', 4],
    },
    settings: {
      'import/core-modules': ['@docusaurus/theme-common', '@docusaurus/utils', 'bun', 'bun:test'],
      // This applies to all.
      'import/resolver': { typescript: true },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2024, parser, sourceType: 'module' },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'jsdoc/require-description': ['error', { contexts: requireJsdocContexts }],
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: requireJsdocContexts,
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: false,
            ClassExpression: false,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: false,
          },
        },
      ],
    },
  },
];

export default config;
