/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  access,
  mkdir,
  readdir,
  readFile,
  stat,
  writeFile,
} from 'node:fs/promises';
import {
  barUpdate,
  barsUpdate,
  create,
  increment,
  MultiBar,
  setTotal,
  stop,
} from 'cli-progress';
import { createWriteStream } from 'node:fs';
import { DEFAULT_CONFIG_FILE_NAME, getFileCommitDate, loadFreshModule } from '@docusaurus/utils';
import { join } from 'node:path';
import { type PluginOptions } from '@docusaurus/plugin-sitemap';
import { process } from 'beasties';
import { type Stats } from 'node:fs';
import { tmpdir } from 'node:os';
import { Writable } from 'node:stream';

// eslint-disable-next-line no-unused-vars
type ActionFn = (arg: unknown, opts: Record<string, unknown> | undefined) => unknown;

type CliActions = {
  action?: ActionFn;
  command?: string;
};

type CreateSitemapItemsFn = NonNullable<PluginOptions['createSitemapItems']>;
type SitemapItems = Awaited<ReturnType<CreateSitemapItemsFn>>;
// After SitemapItems assignment.
type SitemapItem = SitemapItems[number];

const accessMock = jest.mocked(access);
const createWriteStreamMock = jest.mocked(createWriteStream);
// eslint-disable-next-line no-unused-vars
const readdirMock = jest.mocked(readdir as unknown as (path: any) => Promise<string[]>);
const siteConfig = { title: 'site-title', url: 'https://example.com' };
const statMock = jest.mocked(stat);

jest.mock('node:fs', () => {
  const original = jest.requireActual('node:fs');
  return {
    ...original,
    createWriteStream: jest.fn(() => {
      const w = new Writable({ write(chunk, enc, cb) { cb(); } });
      w.pipe = () => w as any;
      return w;
    }),
  };
});

jest.mock('node:fs/promises', () => {
  const original = jest.requireActual('node:fs/promises');
  return {
    ...original,
    access: jest.fn(() => Promise.resolve()),
    mkdir: jest.fn(() => Promise.resolve()),
    readdir: jest.fn(() => Promise.resolve()),
    readFile: jest.fn((path) => Promise.resolve(`<html ${path.includes('2') ? 'data-beasties-container ' : ''}/>`)),
    stat: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('#root/package.json', () => ({
  dependencies: {
    pdfmake: '0.0.0',
  },
  imports: {
    '@alias/*': 'src/aliased/*',
    '@alias/utils/*': 'src/aliased/utils/*',
    '#lib/*': 'lib/*',
  },
}));

/**
 * Create a chainable CLI mock implementing the fluent API used by the plugin.
 *
 * The returned object provides action, command, description, and option methods.
 * Each method returns the CLI object (this) so calls can be chained exactly like
 * real CLI builders (e.g. command(...).description(...).option(...).action(...)).
 * @param {object} actions - An object that will be populated with registration info.
 *   The function assigns the following keys on this object:
 *   - actions.action: {Function} the function passed to .action(...)
 *   - actions.command: {string} the command string passed to .command(...)
 * @returns {{
 *   action: function(() => void): this,
 *   command: function(string): this,
 *   description: function(string): this,
 *   option: function(string, string|object): this,
 * }} A chainable mock CLI object. Methods store the provided values on the
 * `actions` parameter (command and action) and return `this` for chaining.
 * @example
 * const actions = {};
 * const cli = makeCli(actions);
 * // plugin.extendCli(cli) will call cli.command(...).description(...).option(...).action(...)
 * // After registration:
 * // actions.command === 'kit:pdf [siteDir]'
 * // typeof actions.action === 'function'
 */
function makeCli(actions: CliActions) {
  return {
    action: jest.fn(function action(fn) {
      // eslint-disable-next-line no-param-reassign
      actions.action = fn;
      return this;
    }),
    command: jest.fn(function command(name) {
      // eslint-disable-next-line no-param-reassign
      actions.command = name;
      return this;
    }),
    description: jest.fn(function description() {
      return this;
    }),
    option: jest.fn(function option() {
      return this;
    }),
  };
}

const makeTemplate = (title: string) => jest.fn(async (path) => ({
  definition: { content: [{ text: `${title}:${path}` }], info: { title } },
  options: { compress: false },
}));

const name = 'docusaurus-plugin-kit';

['base', 'book', 'condensed', 'roll', 'thangka', 'wheel']
  .forEach((template) => jest.mock(`#buddhism/_${template}`, () => makeTemplate(template)));
jest.mock('#buddhism/_pdf', () => [['base', '#lib/path/one.md'], ['book', '#lib/path/two.md']]);
jest.mock('#root/src/data/common', () => ({
  fileName: (path: string, template: string) => `${template}-${path.replace(/[^a-z0-9]/gi, '')}`,
}));

// Sync.
const pdf = require('#buddhism/_pdf');
// eslint-disable-next-line import/no-dynamic-require
const Plugin = require(`@site/src/plugins/${name}`);

describe(`plugins.${name}`, () => {
  describe('createSitemapItems', () => {
    test('appends pdf entries using git lastmod when available', async () => {
      const defaultItems = [{ url: '/a' }];
      const defaultCreateSitemapItems = jest.fn(async () => defaultItems);
      (getFileCommitDate as jest.Mock).mockResolvedValue({ date: new Date('2025-10-01T07:00:00.000Z') });

      const result = await Plugin.createSitemapItems({ defaultCreateSitemapItems, siteConfig: { url: 'https://mysite.test' } });

      expect(defaultCreateSitemapItems).toHaveBeenCalledTimes(1);
      const appended = result.slice(defaultItems.length);
      expect(appended).toHaveLength(pdf.length);
      appended.forEach((item: SitemapItem) => {
        const normalized = item.url.replace(/^(https?:)\/+/, '$1//');
        expect(normalized.startsWith('https://mysite.test/pdf/')).toBeTruthy();
        expect(normalized.endsWith('.pdf')).toBeTruthy();
        expect(item.lastmod).toBe('2025-10-01');
        expect(item).toMatchObject({ changefreq: 'weekly', priority: 0.5 });
      });
    });

    test('falls back to today when git has no latest', async () => {
      (getFileCommitDate as jest.Mock).mockResolvedValue({});
      const defaultCreateSitemapItems = jest.fn(async () => []);
      const out = await Plugin.createSitemapItems({ defaultCreateSitemapItems, siteConfig: { url: 'https://x.y' } });
      const today = new Date().toISOString().split('T')[0];
      expect(out.length).toBeGreaterThan(0);
      out.forEach((item: SitemapItem) => expect(item.lastmod).toEqual(today));
    });
  });

  describe('fileResolve', () => {
    const siteDir = '/root';
    test.each([
      ['plain/path/file.txt', `${siteDir}/plain/path/file.txt`],
      ['@alias/utils/helper.ts', `${siteDir}/src/aliased/utils/helper.ts`],
      ['#lib/math/add.ts', `${siteDir}/lib/math/add.ts`],
      ['@alias/utils/helper.ts', `${siteDir}/src/aliased/utils/helper.ts`],
    ])('path=%s -> resolved=%s', (path, expected) => {
      expect(Plugin.fileResolve(path, siteDir)).toBe(expected);
    });
  });

  describe('generatePdf', () => {
    const { length } = pdf;
    const out = `${name}-test-out`;
    const siteDir = tmpdir();
    // After siteDir assignment.
    const outDir = join(siteDir, out);

    test('writes pdf files and updates progress bar once per pdf', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const beforeWrites = createWriteStreamMock.mock.calls.length;

      await Plugin.generatePdf({ outDir, siteConfig, siteDir }, MultiBar());

      expect(barUpdate).not.toHaveBeenCalled();
      expect(barsUpdate).toHaveBeenCalledTimes(4);
      expect(mkdir).toHaveBeenCalledWith(join(outDir, 'pdf'), { recursive: true });
      expect(create).toHaveBeenCalledWith(length, 0, { color: '\x1B[34m', task: 'Create PDF' });
      expect(createWriteStreamMock.mock.calls.length - beforeWrites).toBe(length);
      expect(increment.mock.calls.length - beforeIncrements).toBe(length);
      expect(setTotal).not.toHaveBeenCalled();
      expect(stop).toHaveBeenCalledTimes(1);
    });

    test('skip recent pdf files, but updates progress bar once per pdf', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const beforeWrites = createWriteStreamMock.mock.calls.length;
      const now = Date.now();
      accessMock.mockResolvedValueOnce(undefined);
      statMock.mockImplementation((path) => Promise.resolve({
        mtimeMs: String(path).includes('/pdf/') ? now : 50,
      } as Stats));

      await Plugin.generatePdf({ outDir, siteConfig, siteDir }, MultiBar());

      expect(barUpdate).not.toHaveBeenCalled();
      expect(barsUpdate).toHaveBeenCalledTimes(4);
      expect(mkdir).toHaveBeenCalledWith(join(outDir, 'pdf'), { recursive: true });
      expect(create).toHaveBeenCalledWith(length, 0, { color: '\x1B[34m', task: 'Create PDF' });
      expect(createWriteStreamMock.mock.calls.length - beforeWrites).toBe(0);
      expect(increment.mock.calls.length - beforeIncrements).toBe(length);
      expect(setTotal).not.toHaveBeenCalled();
      expect(stop).toHaveBeenCalledTimes(1);

      statMock.mockImplementation(() => Promise.resolve(undefined as any));
    });
  });

  describe('inlineAboveFold', () => {
    test('processes HTML files and updates progress bar', async () => {
      readdirMock.mockResolvedValue(['file1.html', 'file2.html']);

      await Plugin.inlineAboveFold('./out', MultiBar());

      expect(barUpdate).toHaveBeenCalledTimes(1);
      expect(barUpdate).toHaveBeenCalledWith(0, expect.objectContaining({ task: 'Inline CSS' }));
      expect(barsUpdate).toHaveBeenCalledTimes(5);
      // Assert bar was created with single initial scan.
      expect(create).toHaveBeenCalledWith(
        1,
        0,
        expect.objectContaining({ task: 'Find HTML ' }),
        expect.objectContaining({ format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m' }),
      );
      // Assert increment called thrice (initial scan + once per file).
      expect(increment).toHaveBeenCalledTimes(3);
      expect(process).toHaveBeenCalledTimes(1);
      expect(readFile).toHaveBeenCalledTimes(2);
      // Assert writeFile called only for file1 (file2 already had beasties marker).
      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith('out/file1.html', expect.stringContaining('data-beasties-container'), 'utf8');
      expect(setTotal).toHaveBeenCalledTimes(1);
      // Assert bar.stop called.
      expect(stop).toHaveBeenCalledTimes(1);
    });
  });

  describe('lastModified', () => {
    test.each([
      ['file-success', { mtimeMs: 123456789 }, 123456789],
      ['file-failure', new Error('ENOENT'), 0],
    ])('path=%s -> expected=%s', async (path, statReturn, expected) => {
      statMock[`mock${statReturn instanceof Error ? 'Rejected' : 'Resolved'}ValueOnce`](statReturn as Stats);

      await expect(Plugin.lastModified(path)).resolves.toBe(expected);
    });
  });

  describe('outputPaths', () => {
    test.each([
      {
        expected: ['/fakeDir/file1.md', '/fakeDir/nested/file3.md'],
        files: ['file1.md', 'file2.txt', 'nested/file3.md'],
        name: 'matches markdown files with *.md pattern',
        pattern: '*.md',
      },
      {
        expected: ['/fakeDir/file2.txt'],
        files: ['file1.md', 'file2.txt'],
        name: 'matches txt files with *.txt pattern',
        pattern: '*.txt',
      },
      {
        expected: [],
        files: ['file1.md', 'file2.txt'],
        name: 'returns empty array if no match',
        pattern: '*.json',
      },
    ])('$name', async ({ files, pattern, expected }) => {
      readdirMock.mockResolvedValue(files);

      const result = await Plugin.outputPaths('/fakeDir', pattern);

      expect(result).toEqual(expected.map((file) => join('/fakeDir', file.replace('/fakeDir/', ''))));
    });
  });

  describe('postBuild', () => {
    const base = { outDir: './out', siteConfig: { trailingSlash: false }, siteDir: './site' };

    test('runs generatePdf and inlineAboveFold concurrently when trailingSlash is true', async () => {
      const ctx = { ...base, siteConfig: { trailingSlash: true } };
      readdirMock.mockResolvedValue(['file1.html', 'file2.html']);

      await Plugin.postBuild(ctx);

      // generatePdf.
      expect(mkdir).toHaveBeenCalledWith(join(ctx.outDir, 'pdf'), { recursive: true });
      expect(createWriteStreamMock.mock.calls).toHaveLength(pdf.length);

      // inlineAboveFold.
      expect(process).toHaveBeenCalledTimes(1);
      expect(readFile).toHaveBeenCalledTimes(3);
      // Assert writeFile called only for file1 (file2 already had beasties marker).
      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith('out/file1.html', expect.stringContaining('data-beasties-container'), 'utf8');
    });

    test('skips inlineAboveFold when trailingSlash is false', async () => {
      await Plugin.postBuild(base);

      // generatePdf.
      expect(mkdir).toHaveBeenCalledWith(join(base.outDir, 'pdf'), { recursive: true });
      expect(createWriteStreamMock.mock.calls).toHaveLength(pdf.length);

      // inlineAboveFold.
      expect(process).not.toHaveBeenCalled();
      expect(readFile).toHaveBeenCalledTimes(1);
      expect(writeFile).not.toHaveBeenCalled();
    });
  });

  describe('stale', () => {
    const siteDir = '/root';

    test.each([
      // Target does not exist -> stale.
      ['non-existent target', new Error('ENOENT'), [], true],
      // Data newer than target -> stale.
      ['data newer than target', undefined, [200, 100, 50], true],
      // Template newer than target -> stale.
      ['template newer than target', undefined, [50, 100, 200], true],
      // Target older than cutoff -> stale.
      ['target older than cutoff', undefined, [50, Date.now() - 8 * Plugin.MS_PER_DAY, 50], true],
      // Target fresh -> not stale.
      ['target fresh', undefined, [50, Date.now(), 50], false],
    ])('%s -> expected=%s', async (scenario, accessReturn, stats, expected) => {
      accessMock[`mock${accessReturn instanceof Error ? 'Rejected' : 'Resolved'}ValueOnce`](accessReturn);
      // Mock stat results in order: data, target, template.
      statMock.mockImplementation(() => {
        const mtimeMs = stats.shift();
        if (!mtimeMs) {
          throw new Error('ENOENT');
        }
        return Promise.resolve({ mtimeMs } as Stats);
      });

      await expect(Plugin.stale({
        data: '@data/file.txt',
        siteDir,
        template: 'templateName',
        target: 'target.pdf',
      })).resolves.toBe(expected);

      statMock.mockImplementation(() => Promise.resolve(undefined as any));
    });
  });

  describe('plugin API (default export)', () => {
    test('configureWebpack returns expected shape and includes Fontaine transform', () => {
      const plugin = Plugin.default({ outDir: 'out' });
      const cw = plugin.configureWebpack({}, false);
      expect(cw.devServer.static[0].publicPath).toBe('/pdf');
      expect(cw.plugins).toEqual(expect.arrayContaining([expect.objectContaining({
        __fontaine_opts: expect.any(Object),
      })]));
      expect(plugin.name).toBe(name);
    });

    test('extendCli action: explicit args resolve config path and invoke postBuild side-effects', async () => {
      const plugin = Plugin.default({ siteDir: '/ctx/site' });
      const actions: CliActions = {};
      const cli = {
        action: jest.fn().mockImplementation(function action(fn) {
          actions.action = fn;
          return cli;
        }),
        command: jest.fn().mockImplementation(function command(cmd) {
          actions.command = cmd;
          return cli;
        }),
        description: jest.fn().mockReturnThis(),
        option: jest.fn().mockReturnThis(),
      };
      (loadFreshModule as jest.Mock).mockResolvedValue(siteConfig);

      plugin.extendCli(cli);
      const beforeWrites = createWriteStreamMock.mock.calls.length;

      await actions.action?.('./some/dir', { config: 'myconf.ts', outDir: 'custom-build' });

      expect(loadFreshModule).toHaveBeenCalled();
      expect(createWriteStreamMock.mock.calls.length - beforeWrites).toEqual(pdf.length);
    });

    test('extendCli action: default args and falsy cliSiteDir fallback behave independently', async () => {
      // Default (undefined) invocation.
      const pluginA = Plugin.default({ siteDir: '/ctx/siteA' });
      const actionsA: CliActions = {};
      const cliA = makeCli(actionsA);
      (loadFreshModule as jest.Mock).mockResolvedValue(siteConfig);
      pluginA.extendCli(cliA);

      const beforeA = createWriteStreamMock.mock.calls.length;
      await actionsA.action?.(undefined, undefined);
      expect(createWriteStreamMock.mock.calls.length - beforeA).toEqual(pdf.length);

      // Falsy cliSiteDir -> fallback to context.siteDir and default filenames.
      const context = { siteDir: '/fallback/context/site' };
      const pluginB = Plugin.default(context);
      const actionsB: CliActions = {};
      const cliB = makeCli(actionsB);
      pluginB.extendCli(cliB);

      const beforeB = createWriteStreamMock.mock.calls.length;
      await actionsB.action?.('', {});
      expect(loadFreshModule).toHaveBeenCalledWith(join(context.siteDir, DEFAULT_CONFIG_FILE_NAME));
      expect(createWriteStreamMock.mock.calls.length - beforeB).toEqual(pdf.length);
    });
  });
});
