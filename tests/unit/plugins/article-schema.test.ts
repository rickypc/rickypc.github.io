/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import * as nodePath from 'node:path';
import type { LoadContext, PluginContentLoadedActions } from '@docusaurus/types';
import * as utils from '@docusaurus/utils';
import * as fastGlob from 'fast-glob';
import * as common from '#root/src/data/common';

mock.module('node:path', () => nodePath);
// Type-only import in the SUT: never loaded at runtime.
mock.module('@docusaurus/types', () => ({}));
mock.module('@docusaurus/utils', () => utils);
mock.module('fast-glob', () => fastGlob);
mock.module('#root/src/data/common', () => common);

// Bun's mock.module is not hoisted: import the SUT after the mocks above.
const { default: articleSchema, urlFor } = await import('@site/src/plugins/article-schema');

const getFileCommitDateMock = utils.getFileCommitDate as Mocked<typeof utils.getFileCommitDate>;
const globMock = fastGlob.glob as Mocked<typeof fastGlob.glob>;

const plugin = await articleSchema({ siteDir: '/site' } as unknown as LoadContext);

const OriginalDate = globalThis.Date;
const fallbackDate = new OriginalDate('2026-01-01T00:00:00.000Z');
const DateMock = mock(() => fallbackDate);

const byAge = () =>
  getFileCommitDateMock.mockImplementation((...args: unknown[]) => {
    const { age } = (args[1] ?? {}) as { age?: 'oldest' | 'newest' };
    return Promise.resolve({
      date:
        age === 'oldest'
          ? new Date('2025-06-01T00:00:00.000Z')
          : new Date('2026-10-01T00:00:00.000Z'),
      timestamp: 0,
    });
  });

describe('plugins.article-schema.loadContent()', () => {
  afterEach(() => {
    globalThis.Date = OriginalDate;
  });

  test('collects git dates for routed sources by url', async () => {
    globMock.mockImplementation(async (pattern: string) => {
      if (pattern.startsWith('docs/**/*.mdx')) {
        return ['docs/buddhism/x/y.mdx', 'docs/index.mdx', 'docs/buddhism/_partial.mdx'];
      }
      if (pattern.startsWith('docs/**/*.md')) {
        return ['docs/legacy/notes.mdx.bak'];
      }
      return ['src/pages/_shared.tsx', 'src/pages/index.tsx', 'src/pages/resume.tsx'];
    });
    byAge();

    const { dates } = await plugin.loadContent();

    expect(dates).toEqual({
      '/': {
        dateModified: '2026-10-01T00:00:00.000Z',
        datePublished: '2025-06-01T00:00:00.000Z',
      },
      '/docs/': {
        dateModified: '2026-10-01T00:00:00.000Z',
        datePublished: '2025-06-01T00:00:00.000Z',
      },
      '/docs/buddhism/x/y/': {
        dateModified: '2026-10-01T00:00:00.000Z',
        datePublished: '2025-06-01T00:00:00.000Z',
      },
      '/resume/': {
        dateModified: '2026-10-01T00:00:00.000Z',
        datePublished: '2025-06-01T00:00:00.000Z',
      },
    });
    expect(getFileCommitDateMock).toHaveBeenCalledWith('/site/src/pages/resume.tsx', {
      age: 'oldest',
      includeAuthor: false,
    });
  });

  test('falls back to the build date for untracked files', async () => {
    globalThis.Date = DateMock as unknown as typeof OriginalDate;
    globMock.mockResolvedValue(['src/pages/resume.tsx']);
    getFileCommitDateMock.mockRejectedValue(new Error('untracked'));

    const { dates } = await plugin.loadContent();

    expect(dates['/resume/']).toEqual({
      dateModified: '2026-01-01T00:00:00.000Z',
      datePublished: '2026-01-01T00:00:00.000Z',
    });
  });
});

describe('plugins.article-schema.urlFor()', () => {
  test.each([
    ['docs/buddhism/x/y.mdx', '/docs/buddhism/x/y/'],
    ['docs/index.mdx', '/docs/'],
    ['src/pages/about/index.tsx', '/about/'],
    ['src/pages/index.tsx', '/'],
    ['src/pages/resume.tsx', '/resume/'],
    ['README.md', undefined],
  ])('urlFor(%s) -> %s', (source, expected) => {
    expect(urlFor(source)).toBe(expected);
  });
});

describe('plugins.article-schema.plugin', () => {
  test('exposes the article-schema plugin name', () => {
    expect(plugin.name).toBe('article-schema');
  });

  test('registers the loaded dates as global data', () => {
    const setGlobalData = mock();
    const content = { dates: { '/resume/': { dateModified: 'm', datePublished: 'p' } } };

    plugin.contentLoaded({
      actions: { setGlobalData } as unknown as PluginContentLoadedActions,
      content,
    });

    expect(setGlobalData).toHaveBeenCalledWith(content);
  });
});
