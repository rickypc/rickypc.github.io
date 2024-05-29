/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

module.exports = {
  env: {
    browser: true,
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
  plugins: [
    'import',
  ],
  rules: {
    // Better React debugging.
    'prefer-arrow-callback': 'off',
    'import/no-unresolved': ['error', { ignore: ['^[@#].+$'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
  },
  settings: {
    react: { version: 'detect' },
  },
};
