/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { createWriteStream, mkdirSync } from 'node:fs';
import { DEFAULT_CONFIG_FILE_NAME, loadFreshModule, siteConfig } from '@docusaurus/utils';
import { increment, start, stop } from 'cli-progress';
import { join } from 'node:path';
import { log } from 'simple-git';
import { tmpdir } from 'node:os';
import { Writable } from 'node:stream';

// You can't create __mocks__/node:fs.js, because : is invalid filename.
jest.mock('node:fs', () => {
  const original = jest.requireActual('node:fs');
  return {
    ...original,
    createWriteStream: jest.fn(() => {
      const w = new Writable({ write(chunk, enc, cb) { cb(); } });
      w.pipe = () => w;
      return w;
    }),
    mkdirSync: jest.fn(),
  };
});

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
 * // actions.command === 'local:pdf [siteDir]'
 * // typeof actions.action === 'function'
 */
function makeCli(actions) {
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

const makeTemplate = (title) => jest.fn(async (path) => ({
  definition: { content: [{ text: `${title}:${path}` }], info: { title } },
  options: { compress: false },
}));

jest.mock('#buddhism/_base.js', () => makeTemplate('base'));
jest.mock('#buddhism/_book.js', () => makeTemplate('book'));
jest.mock('#buddhism/_condensed.js', () => makeTemplate('condensed'));
jest.mock('#buddhism/_pdf.js', () => [['base', '#/path/one.md'], ['book', '#/path/two.md']]);
jest.mock('#buddhism/_roll.js', () => makeTemplate('roll'));
jest.mock('#buddhism/_thangka.js', () => makeTemplate('thangka'));
jest.mock('#buddhism/_wheel.js', () => makeTemplate('wheel'));
jest.mock('#root/src/data/common.js', () => ({ fileName: (p, t) => `${t}-${p.replace(/[^a-z0-9]/gi, '')}` }));

// eslint-disable-next-line import/extensions
const pdf = require('#buddhism/_pdf.js');
// eslint-disable-next-line import/order
const localPlugin = require('@site/src/plugins/docusaurus-plugin-local');

describe('docusaurus-plugin-local', () => {
  describe('createSitemapItems', () => {
    it('appends pdf entries using git lastmod when available', async () => {
      const defaultItems = [{ url: '/a' }];
      const defaultCreateSitemapItems = jest.fn(async () => defaultItems);
      log.mockResolvedValue({ latest: { date: '2025-10-01' } });

      const result = await localPlugin.createSitemapItems({ defaultCreateSitemapItems, siteConfig: { url: 'https://mysite.test' } });

      expect(defaultCreateSitemapItems).toHaveBeenCalledTimes(1);
      const appended = result.slice(defaultItems.length);
      expect(appended).toHaveLength(pdf.length);
      appended.forEach((p) => {
        const normalized = p.url.replace(/^(https?:)\/+/, '$1//');
        expect(normalized.startsWith('https://mysite.test/pdf/')).toBeTruthy();
        expect(normalized.endsWith('.pdf')).toBeTruthy();
        expect(p.lastmod).toEqual('2025-10-01');
        expect(p).toMatchObject({ changefreq: 'weekly', priority: 0.5 });
      });
    });

    it('falls back to today when git has no latest', async () => {
      log.mockResolvedValue({});
      const defaultCreateSitemapItems = jest.fn(async () => []);
      const out = await localPlugin.createSitemapItems({ defaultCreateSitemapItems, siteConfig: { url: 'https://x.y' } });
      const today = new Date().toISOString().split('T')[0];
      expect(out.length).toBeGreaterThan(0);
      out.forEach((p) => expect(p.lastmod).toEqual(today));
    });
  });

  describe('postBuild', () => {
    it('writes pdf files and updates progress bar once per pdf', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const beforeWrites = createWriteStream.mock.calls.length;
      const outDir = join(tmpdir(), 'docusaurus-test-out');

      await localPlugin.postBuild({ outDir, siteConfig });

      const pdfCount = pdf.length;
      expect(mkdirSync).toHaveBeenCalledWith(join(outDir, 'pdf'), { recursive: true });

      expect(start).toHaveBeenCalledWith(pdfCount, 0);
      expect(createWriteStream.mock.calls.length - beforeWrites).toEqual(pdfCount);
      expect(increment.mock.calls.length - beforeIncrements).toEqual(pdfCount);
      expect(stop).toHaveBeenCalledTimes(1);
    });
  });

  describe('pluginLocal API', () => {
    it('configureWebpack returns expected shape and includes Fontaine transform', () => {
      const plugin = localPlugin.default({});
      const cw = plugin.configureWebpack({}, false);
      expect(cw.devServer.static[0].publicPath).toEqual('/pdf');
      expect(cw.plugins).toEqual(expect.arrayContaining([expect.objectContaining({
        __fontaine_opts: expect.any(Object),
      })]));
      expect(plugin.name).toEqual('docusaurus-plugin-local');
    });

    it('extendCli action: explicit args resolve config path and invoke postBuild side-effects', async () => {
      const plugin = localPlugin.default({ siteDir: '/ctx/site' });
      const actions = {};
      const cli = {
        action: jest.fn().mockImplementation(function action(fn) {
          actions.action = fn;
          return this;
        }),
        command: jest.fn().mockImplementation(function command(name) {
          actions.command = name;
          return this;
        }),
        description: jest.fn().mockReturnThis(),
        option: jest.fn().mockReturnThis(),
      };
      loadFreshModule.mockResolvedValue(siteConfig);

      plugin.extendCli(cli);
      const beforeWrites = createWriteStream.mock.calls.length;

      await actions.action('./some/dir', { config: 'myconf.js', outDir: 'custom-build' });

      expect(loadFreshModule).toHaveBeenCalled();
      expect(createWriteStream.mock.calls.length - beforeWrites).toEqual(pdf.length);
    });

    it('extendCli action: default args and falsy cliSiteDir fallback behave independently', async () => {
      // Default (undefined) invocation.
      const pluginA = localPlugin.default({ siteDir: '/ctx/siteA' });
      const actionsA = {};
      const cliA = makeCli(actionsA);
      loadFreshModule.mockResolvedValue(siteConfig);
      pluginA.extendCli(cliA);

      const beforeA = createWriteStream.mock.calls.length;
      await actionsA.action(undefined, undefined);
      expect(createWriteStream.mock.calls.length - beforeA).toEqual(pdf.length);

      // Falsy cliSiteDir -> fallback to context.siteDir and default filenames.
      const context = { siteDir: '/fallback/context/site' };
      const pluginB = localPlugin.default(context);
      const actionsB = {};
      const cliB = makeCli(actionsB);
      pluginB.extendCli(cliB);

      const beforeB = createWriteStream.mock.calls.length;
      await actionsB.action('', {});
      expect(loadFreshModule).toHaveBeenCalledWith(join(context.siteDir, DEFAULT_CONFIG_FILE_NAME));
      expect(createWriteStream.mock.calls.length - beforeB).toEqual(pdf.length);
    });
  });
});
