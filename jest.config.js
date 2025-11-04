/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

process.env.TZ = 'UTC';

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.[jt]s*'],
  coverageDirectory: './coverage/',
  errorOnDeprecated: true,
  logHeapUsage: true,
  moduleNameMapper: {
    '@docusaurus/(BrowserOnly|ComponentCreator|constants|ExecutionEnvironment|Head|Interpolate|isInternalUrl|Link|Noop|renderRoutes|router|Translate|use.*)': '@docusaurus/core/lib/client/exports/$1',
    '@docusaurus/plugin-content-docs/client': '@docusaurus/plugin-content-docs/src/client/index.ts',
    '@site/(.*)': '<rootDir>/$1',
    '@theme/(.*)': '<rootDir>/src/theme/$1',
    '@theme-original/(.*)': '@docusaurus/theme-classic/src/theme/$1',
  },
  testEnvironment: 'node',
  testRegex: 'tests/unit/.*.test.[jt]sx?$',
  transform: {
    '^.+\\.[jt]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { decorators: true, syntax: 'typescript', tsx: true },
          target: 'es2024',
          transform: { react: { runtime: 'automatic' } },
        },
      },
    ],
    '\\.(avif|css|jpe?g|png|svg|webp)$': '<rootDir>/tests/unit/transformer.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@docusaurus/.*)'],
};
