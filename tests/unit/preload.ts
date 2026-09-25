/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  mock,
  test,
} from 'bun:test';
import { tmpdir } from 'node:os';
import { basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { createElement } from 'react';

type Matchers = Record<string, (...args: unknown[]) => unknown>;

process.env.TZ = 'UTC';

const { file, main } = Bun;
const assets = {
  cached: new Set<string>(),
  css: new Proxy({}, { get: (_target, key) => (key === '__esModule' ? false : key) }),
  dir: pathToFileURL(`${tmpdir()}/bun-test-assets/`),
  image(name: string) {
    const url = new URL(`${name}.cjs`, assets.dir);
    const path = url.pathname;
    if (!assets.cached.has(path)) {
      Bun.write(url, `module.exports = ${JSON.stringify(name)};\n`);
      assets.cached.add(path);
    }
    return path;
  },
  matchers: {} as Matchers,
  methods: {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    jest,
    test,
    xdescribe: describe.skip,
    xtest: test.skip,
  } as const,
  mocks: await file(new URL('./mocks.json', import.meta.url)).json(),
  svg({ ref, ...props }: Record<string, unknown> & { ref?: unknown }) {
    return createElement('svg', { ...props, ref });
  },
  utilsCached: new WeakMap<object, object>(),
};

type MethodKey = keyof typeof assets.methods;

const boundUtils = (utils: Record<string, unknown>) => {
  let bound = assets.utilsCached.get(utils);
  if (!bound) {
    bound = Object.create(null) as object;
    for (const key in utils) {
      const value = utils[key as keyof typeof utils];
      (bound as Record<string, unknown>)[key as keyof typeof bound] =
        typeof value === 'function' ? value.bind(utils) : value;
    }
    assets.utilsCached.set(utils, bound);
  }
  return bound;
};

Bun.plugin({
  name: 'bun-asset-transformer',
  setup(build) {
    build.onLoad({ filter: /\.(avif|ico|mp3|mp4|ogg|pdf|ttf|wav|webp|woff2?)$/i }, ({ path }) => ({
      exports: { default: basename(path) },
      loader: 'object',
    }));
    build.onLoad({ filter: /\.css$/i }, () => ({
      exports: { default: assets.css },
      loader: 'object',
    }));
    build.onResolve({ filter: /\.(gif|jpe?g|png)$/i }, ({ path }) => ({
      path: assets.image(basename(path)),
    }));
    build.onLoad({ filter: /\.svg$/i }, () => ({
      exports: { default: assets.svg },
      loader: 'object',
    }));
  },
});

if (!globalThis.window && ['.test.tsx', '.dom.test.ts'].some((ext) => main.endsWith(ext))) {
  GlobalRegistrator.register();
}

// After happy-dom registration.
for (const key of Object.keys(assets.methods) as Array<MethodKey>) {
  const value = assets.methods[key as MethodKey];
  if (value !== undefined) {
    Object.defineProperty(globalThis, key, { configurable: true, value, writable: true });
  }
}

// After bun test methods registration.
for (const [module, path] of Object.entries(
  assets.mocks[main.substring(main.indexOf('tests/')) as keyof typeof assets.mocks] ?? {},
)) {
  const replacement = await import(path as string);
  mock.module(module, () => replacement);
}

// After mocks setup.
const domMatchers = await import('@testing-library/jest-dom/matchers');
for (const name in domMatchers) {
  const matcher = domMatchers[name as keyof typeof domMatchers];
  if (name === 'default' || typeof matcher !== 'function') {
    continue;
  }
  assets.matchers[name as keyof typeof assets.matchers] = function boundMatcher(
    this: { utils?: Record<string, unknown> },
    ...args: unknown[]
  ) {
    if (this?.utils) {
      Object.defineProperty(this, 'utils', { configurable: true, value: boundUtils(this.utils) });
    }
    return (matcher as (...rest: unknown[]) => unknown).apply(this, args);
  };
}

expect.extend(assets.matchers as Parameters<typeof expect.extend>[0]);

afterEach(async () => mock.clearAllMocks());
