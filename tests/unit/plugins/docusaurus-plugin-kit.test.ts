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
import { execSync, spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { join } from 'node:path';
import { type PluginOptions } from '@docusaurus/plugin-sitemap';
import { process as beastiesProcess } from 'beasties';
import { ReadableStream } from 'node:stream/web';
import { type Stats } from 'node:fs';
import { tmpdir } from 'node:os';
import { Writable } from 'node:stream';

type ActionFn = (_arg: unknown, _opts: Record<string, unknown> | undefined) => unknown;

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
const execSyncMock = jest.mocked(execSync);
const readdirMock = jest.mocked(readdir as unknown as (_path: any) => Promise<string[]>);
const siteConfig = { title: 'site-title', url: 'https://example.com' };
const spawnMock = jest.mocked(spawn);
const statMock = jest.mocked(stat);

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
  spawn: jest.fn(),
}));

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
    '#root/*': '*',
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

jest.mock('#buddhism/media/audio/_index', () => [
  ['id_ID-news_tts-medium', '#lib/path/one.md'],
  ['en_US-hfc_male-medium', '#lib/path/_ricky_huang.md'],
  ['id_ID-news_tts-medium', '#lib/path/three.md'],
]);
jest.mock('#buddhism/media/pdf/_index', () => [
  ['base', '#lib/path/one.md'],
  ['book', '#lib/path/_ricky_huang.md'],
]);
['base', 'book', 'condensed', 'roll', 'thangka', 'wheel']
  .forEach((template) => jest.mock(`#buddhism/media/pdf/templates/_${template}`, () => makeTemplate(template)));
jest.mock('#lib/path/one.md', () => ({
  transliteration: {
    children: 'One',
    title: 'One',
  },
}), { virtual: true });
jest.mock('#lib/path/_ricky_huang.md', () => ({
  transliteration: {
    children: 'Two',
    title: 'Two',
  },
}), { virtual: true });
jest.mock('#lib/path/three.md', () => ({
  transliteration: {
    children: 'Three',
    title: 'Three',
  },
}), { virtual: true });

// Sync.
const audio = require('#buddhism/media/audio/_index');
const pdf = require('#buddhism/media/pdf/_index');
// eslint-disable-next-line import/no-dynamic-require
const Plugin = require(`@site/src/plugins/${name}`);

describe(`plugins.${name}`, () => {
  describe('createSitemapItems', () => {
    test('appends pdf entries using git lastmod when available', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const defaultItems = [{ url: '/a' }];
      const defaultCreateSitemapItems = jest.fn(async () => defaultItems);
      (getFileCommitDate as jest.Mock).mockResolvedValue({
        date: new Date('2025-10-01T07:00:00.000Z'),
      });

      const result = await Plugin.createSitemapItems({
        defaultCreateSitemapItems,
        siteConfig: { url: 'https://mysite.test' },
      });

      expect(spy).not.toHaveBeenCalled();

      const audioStart = defaultItems.length;
      // After audioStart assignment.
      const audioEnd = audioStart + audio.length;
      const audios = result.slice(audioStart, audioEnd);
      const pdfs = result.slice(audioEnd);

      expect(audios).toHaveLength(audio.length);
      expect(pdfs).toHaveLength(pdf.length);

      audios.forEach((item: SitemapItem) => {
        const normalized = item.url.replace(/^(https?:)\/+/, '$1//');
        expect(normalized.startsWith('https://mysite.test/audio/')).toBeTruthy();
        expect(normalized.endsWith('.m4a')).toBeTruthy();
        expect(item.lastmod).toBe('2025-10-01');
        expect(item).toMatchObject({ changefreq: 'weekly', priority: 0.5 });
      });

      pdfs.forEach((item: SitemapItem) => {
        const normalized = item.url.replace(/^(https?:)\/+/, '$1//');
        expect(normalized.startsWith('https://mysite.test/pdf/')).toBeTruthy();
        expect(normalized.endsWith('.pdf')).toBeTruthy();
        expect(item.lastmod).toBe('2025-10-01');
        expect(item).toMatchObject({ changefreq: 'weekly', priority: 0.5 });
      });

      spy.mockRestore();
    });

    test('falls back to today and prints summary when git throws', async () => {
      const defaultCreateSitemapItems = jest.fn(async () => []);
      (getFileCommitDate as jest.Mock).mockRejectedValue(new Error('no commit'));
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await Plugin.createSitemapItems({
        defaultCreateSitemapItems,
        siteConfig: { url: 'https://x.y' },
      });

      const today = new Date().toISOString().split('T')[0];
      expect(result.length).toBeGreaterThan(0);
      result.forEach((item: SitemapItem) => expect(item.lastmod).toBe(today));

      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(1, '\x1B[31mPlease commit these files so lastmod dates can be generated correctly:');
      expect(spy).toHaveBeenNthCalledWith(2, '- audio: #lib/path/one.md\n- audio: #lib/path/_ricky_huang.md\n- audio: #lib/path/three.md\n- pdf: #lib/path/one.md\n- pdf: #lib/path/_ricky_huang.md');
      expect(spy).toHaveBeenNthCalledWith(3, '');

      spy.mockRestore();
    });

    test('does not print summary when git commit exists', async () => {
      (getFileCommitDate as jest.Mock).mockResolvedValue({
        date: new Date('2025-10-01T07:00:00.000Z'),
      });

      const defaultCreateSitemapItems = jest.fn(async () => []);
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await Plugin.createSitemapItems({
        defaultCreateSitemapItems,
        siteConfig: { url: 'https://mysite.test' },
      });

      expect(spy).not.toHaveBeenCalled();

      result.forEach((item: SitemapItem) => {
        expect(item.lastmod).toBe('2025-10-01');
      });

      spy.mockRestore();
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

  describe('generateAudio', () => {
    const { length } = audio;
    const out = `${name}-test-out`;
    const siteDir = tmpdir();
    // After siteDir assignment.
    const outDir = join(siteDir, out);

    test('logs error and returns early when Piper is missing', async () => {
      const consoleMock = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      execSyncMock.mockReturnValueOnce('');

      await Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());

      expect(barUpdate).not.toHaveBeenCalled();
      expect(consoleMock).toHaveBeenCalledWith(
        expect.stringContaining('Piper not found'),
      );
      expect(create).not.toHaveBeenCalled();
      expect(spawnMock).not.toHaveBeenCalled();
    });

    test('writes audio files and updates progress bar once per m4a', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const ffmpeg = new EventEmitter() as any;
      ffmpeg.end = jest.fn();
      ffmpeg.kill = jest.fn();
      ffmpeg.stdin = ffmpeg;
      global.fetch = jest.fn().mockResolvedValue({ body: {}, ok: true, status: 200 });
      const piper1 = new EventEmitter() as any;
      piper1.kill = jest.fn();
      piper1.stderr = piper1;
      const piper2 = new EventEmitter() as any;
      piper2.kill = jest.fn();
      piper2.stderr = piper2;

      execSyncMock.mockReturnValueOnce('1.2.3');
      spawnMock
        .mockReturnValueOnce(piper1)
        .mockReturnValueOnce(piper2)
        // 3 files.
        .mockReturnValueOnce(ffmpeg)
        .mockReturnValueOnce(ffmpeg)
        .mockReturnValueOnce(ffmpeg);

      const promise = Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());
      setTimeout(() => piper1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piper2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      setTimeout(() => ffmpeg.emit('close', 0), 5);
      await promise;

      expect(barUpdate).toHaveBeenCalledWith(0, { task: 'Make Audio' });
      expect(barsUpdate).toHaveBeenCalledTimes(length + 3);
      expect(create).toHaveBeenCalledWith(
        1,
        0,
        { color: '\x1B[35m', task: 'Map Tracks' },
        { format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m' },
      );
      expect(mkdir).toHaveBeenCalledWith(join(outDir, 'audio'), { recursive: true });
      expect(global.fetch).toHaveBeenCalledTimes(length);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        'http://127.0.0.1:5002',
        { body: JSON.stringify({ text: 'two' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'thr-ee' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(increment.mock.calls.length - beforeIncrements).toBe(length + 1);
      expect(piper1.kill).toHaveBeenCalledTimes(1);
      expect(piper2.kill).toHaveBeenCalledTimes(1);
      expect(setTotal).toHaveBeenCalledWith(length);
      expect(spawnMock).toHaveBeenCalledTimes(length + 2);
      expect(spawnMock).toHaveBeenNthCalledWith(1, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(2, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(3, 'ffmpeg', expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(4, 'ffmpeg', expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(5, 'ffmpeg', expect.any(Array));
      expect(stop).toHaveBeenCalledTimes(1);
    });

    test('skip recent audio files, but updates progress bar once per m4a', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const now = Date.now();
      const piper1 = new EventEmitter() as any;
      piper1.kill = jest.fn();
      piper1.stderr = piper1;
      const piper2 = new EventEmitter() as any;
      piper2.kill = jest.fn();
      piper2.stderr = piper2;

      accessMock.mockResolvedValueOnce(undefined);
      execSyncMock.mockReturnValueOnce('1.2.3');
      spawnMock
        .mockReturnValueOnce(piper1)
        .mockReturnValueOnce(piper2);
      statMock.mockImplementation((path) => Promise.resolve({
        mtimeMs: String(path).includes('/audio/') ? now : 50,
      } as Stats));

      const promise = Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());
      setTimeout(() => piper1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piper2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      await promise;

      expect(barUpdate).toHaveBeenCalledWith(0, { task: 'Make Audio' });
      expect(barsUpdate).toHaveBeenCalledTimes(length + 3);
      expect(create).toHaveBeenCalledWith(
        1,
        0,
        { color: '\x1B[35m', task: 'Map Tracks' },
        { format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m' },
      );
      expect(mkdir).toHaveBeenCalledWith(join(outDir, 'audio'), { recursive: true });
      expect(global.fetch).not.toHaveBeenCalled();
      expect(increment.mock.calls.length - beforeIncrements).toBe(length + 1);
      expect(piper1.kill).toHaveBeenCalledTimes(1);
      expect(piper2.kill).toHaveBeenCalledTimes(1);
      expect(setTotal).toHaveBeenCalledTimes(1);
      expect(spawnMock).toHaveBeenCalledTimes(2);
      expect(spawnMock).toHaveBeenNthCalledWith(1, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(2, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(stop).toHaveBeenCalledTimes(1);

      statMock.mockImplementation(() => Promise.resolve(undefined as any));
    });

    test('logs error when piper responded with failure', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const consoleMock = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      global.fetch = jest.fn().mockResolvedValue({ body: null, ok: false, status: 400 });
      const piper1 = new EventEmitter() as any;
      piper1.kill = jest.fn();
      piper1.stderr = piper1;
      const piper2 = new EventEmitter() as any;
      piper2.kill = jest.fn();
      piper2.stderr = piper2;

      execSyncMock.mockReturnValueOnce('1.2.3');
      spawnMock
        .mockReturnValueOnce(piper1)
        .mockReturnValueOnce(piper2);

      const promise = Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());
      setTimeout(() => piper1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piper2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      await promise;

      expect(barUpdate).toHaveBeenCalledWith(0, { task: 'Make Audio' });
      expect(barsUpdate).toHaveBeenCalledTimes(3);
      expect(consoleMock).toHaveBeenCalledTimes(length);
      expect(consoleMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/Failed writing .*\.m4a: Piper responded with 400/),
      );
      expect(consoleMock).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/Failed writing .*\.m4a: Piper responded with 400/),
      );
      expect(consoleMock).toHaveBeenNthCalledWith(
        3,
        expect.stringMatching(/Failed writing .*\.m4a: Piper responded with 400/),
      );
      expect(create).toHaveBeenCalledWith(
        1,
        0,
        { color: '\x1B[35m', task: 'Map Tracks' },
        { format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m' },
      );
      expect(mkdir).toHaveBeenCalledWith(join(outDir, 'audio'), { recursive: true });
      expect(global.fetch).toHaveBeenCalledTimes(length);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        'http://127.0.0.1:5002',
        { body: JSON.stringify({ text: 'two' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'thr-ee' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(increment.mock.calls.length - beforeIncrements).toBe(1);
      expect(piper1.kill).toHaveBeenCalledTimes(1);
      expect(piper2.kill).toHaveBeenCalledTimes(1);
      expect(setTotal).toHaveBeenCalledWith(length);
      expect(spawnMock).toHaveBeenCalledTimes(2);
      expect(spawnMock).toHaveBeenNthCalledWith(1, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(2, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(stop).toHaveBeenCalledTimes(1);
    });

    test('logs error when ffmpeg exits non-zero', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const consoleMock = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      const fetch1 = {
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array([]));
            controller.close();
          },
        }),
        ok: true,
        status: 200,
      };
      const fetch2 = {
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array([]));
            controller.close();
          },
        }),
        ok: true,
        status: 200,
      };
      const fetch3 = {
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array([]));
            controller.close();
          },
        }),
        ok: true,
        status: 200,
      };
      const ffmpeg = new EventEmitter() as any;
      ffmpeg.end = jest.fn();
      ffmpeg.kill = jest.fn();
      ffmpeg.stdin = ffmpeg;
      global.fetch = jest.fn()
        .mockResolvedValueOnce(fetch1)
        .mockResolvedValueOnce(fetch2)
        .mockResolvedValueOnce(fetch3);
      const piper1 = new EventEmitter() as any;
      piper1.kill = jest.fn();
      piper1.stderr = piper1;
      const piper2 = new EventEmitter() as any;
      piper2.kill = jest.fn();
      piper2.stderr = piper2;

      execSyncMock.mockReturnValueOnce('1.2.3');
      spawnMock
        .mockReturnValueOnce(piper1)
        .mockReturnValueOnce(piper2)
        // 3 files.
        .mockReturnValueOnce(ffmpeg)
        .mockReturnValueOnce(ffmpeg)
        .mockReturnValueOnce(ffmpeg);

      const promise = Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());
      setTimeout(() => piper1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piper2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      setTimeout(() => {
        // Throw error first.
        ffmpeg.emit('error', new Error('error'));
        ffmpeg.emit('close', 1);
      }, 5);
      await promise;

      expect(barUpdate).toHaveBeenCalledWith(0, { task: 'Make Audio' });
      expect(barsUpdate).toHaveBeenCalledTimes(length + 3);
      expect(consoleMock).toHaveBeenCalledTimes(length);
      expect(consoleMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/Failed writing .*\.m4a:/),
        expect.objectContaining({ message: 'ffmpeg error' }),
      );
      expect(consoleMock).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/Failed writing .*\.m4a:/),
        expect.objectContaining({ message: 'ffmpeg error' }),
      );
      expect(consoleMock).toHaveBeenNthCalledWith(
        3,
        expect.stringMatching(/Failed writing .*\.m4a:/),
        expect.objectContaining({ message: 'ffmpeg error' }),
      );
      expect(create).toHaveBeenCalledWith(
        1,
        0,
        { color: '\x1B[35m', task: 'Map Tracks' },
        { format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m' },
      );
      expect(mkdir).toHaveBeenCalledWith(join(outDir, 'audio'), { recursive: true });
      expect(global.fetch).toHaveBeenCalledTimes(length);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        'http://127.0.0.1:5002',
        { body: JSON.stringify({ text: 'two' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'thr-ee' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(increment.mock.calls.length - beforeIncrements).toBe(length + 1);
      expect(piper1.kill).toHaveBeenCalledTimes(1);
      expect(piper2.kill).toHaveBeenCalledTimes(1);
      expect(setTotal).toHaveBeenCalledWith(length);
      expect(spawnMock).toHaveBeenCalledTimes(length + 2);
      expect(spawnMock).toHaveBeenNthCalledWith(1, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(2, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(3, 'ffmpeg', expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(4, 'ffmpeg', expect.any(Array));
      expect(stop).toHaveBeenCalledTimes(1);
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
      expect(create).toHaveBeenCalledWith(length, 0, { color: '\x1B[34m', task: 'Make PDF  ' });
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
      expect(create).toHaveBeenCalledWith(length, 0, { color: '\x1B[34m', task: 'Make PDF  ' });
      expect(createWriteStreamMock.mock.calls.length - beforeWrites).toBe(0);
      expect(increment.mock.calls.length - beforeIncrements).toBe(length);
      expect(setTotal).not.toHaveBeenCalled();
      expect(stop).toHaveBeenCalledTimes(1);

      statMock.mockImplementation(() => Promise.resolve(undefined as any));
    });

    test('logs an error when PDF writing fails', async () => {
      const consoleMock = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      createWriteStreamMock.mockImplementationOnce(() => {
        throw new Error('error');
      }).mockImplementationOnce(() => {
        throw new Error('error');
      });

      await Plugin.generatePdf({ outDir, siteConfig, siteDir }, MultiBar());

      expect(consoleMock).toHaveBeenCalledTimes(2);
      expect(consoleMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/Failed writing .*\.pdf:/),
        expect.objectContaining({ message: 'error' }),
      );
      expect(consoleMock).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/Failed writing .*\.pdf:/),
        expect.objectContaining({ message: 'error' }),
      );
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
      expect(beastiesProcess).toHaveBeenCalledTimes(1);
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
      ['file-success', 123456789, { mtimeMs: 123456789 }],
      ['file-failure', 0, new Error('ENOENT')],
    ])('path=%s -> expected=%s', async (path, expected, statReturn) => {
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

  describe('piperServer', () => {
    test('spawns piper server and resolves when ready message appears', async () => {
      const model = 'en_US-model2';
      const piper = new EventEmitter() as any;
      piper.kill = jest.fn();
      piper.stderr = piper;
      spawnMock.mockReturnValueOnce(piper);
      const port = 5002;
      const siteDir = '/root';

      const promise = Plugin.piperServer(siteDir, model, port);
      piper.emit('data', Buffer.from('Running on all addresses (0.0.0.0)'));
      piper.emit('data', Buffer.from(`Running on http://127.0.0.1:${port}`));
      const result = await promise;

      expect(spawnMock).toHaveBeenCalledWith(
        `${process.env.HOME}/.venv/default/bin/python`,
        [
          '-m', 'piper.http_server',
          '--data-dir=/root/models/en',
          '--model', model,
          '--port',
          String(port),
        ],
      );

      expect(result).toBe(piper);
    });
  });

  describe('postBuild', () => {
    const base = { outDir: './out', siteConfig: { trailingSlash: false }, siteDir: './site' };

    test('runs generators and inlineAboveFold concurrently when trailingSlash is true', async () => {
      const ctx = { ...base, siteConfig: { trailingSlash: true } };
      execSyncMock.mockReturnValueOnce('1.2.3');
      const ffmpeg = new EventEmitter() as any;
      ffmpeg.end = jest.fn();
      ffmpeg.kill = jest.fn();
      ffmpeg.stdin = ffmpeg;
      global.fetch = jest.fn().mockResolvedValue({ body: {}, ok: true, status: 200 });
      const piper1 = new EventEmitter() as any;
      piper1.kill = jest.fn();
      piper1.stderr = piper1;
      const piper2 = new EventEmitter() as any;
      piper2.kill = jest.fn();
      piper2.stderr = piper2;
      readdirMock.mockResolvedValue(['file1.html', 'file2.html']);
      spawnMock
        .mockReturnValueOnce(piper1)
        .mockReturnValueOnce(piper2)
        // 2 files.
        .mockReturnValueOnce(ffmpeg)
        .mockReturnValueOnce(ffmpeg);

      const promise = Plugin.postBuild(ctx);
      setTimeout(() => piper1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piper2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      setTimeout(() => ffmpeg.emit('close', 0), 5);
      await promise;

      // generateAudio.
      expect(mkdir).toHaveBeenNthCalledWith(1, join(ctx.outDir, 'audio'), { recursive: true });
      expect(spawnMock.mock.calls).toHaveLength(audio.length + 2);

      // generatePdf.
      expect(mkdir).toHaveBeenNthCalledWith(2, join(ctx.outDir, 'pdf'), { recursive: true });
      expect(createWriteStreamMock.mock.calls).toHaveLength(pdf.length);

      // inlineAboveFold.
      expect(beastiesProcess).toHaveBeenCalledTimes(1);
      expect(readFile).toHaveBeenCalledTimes(2);
      expect(readFile).toHaveBeenNthCalledWith(1, join(ctx.outDir, 'file1.html'), 'utf8');
      expect(readFile).toHaveBeenNthCalledWith(2, join(ctx.outDir, 'file2.html'), 'utf8');
      // Assert writeFile called only for file1 (file2 already had beasties marker).
      expect(writeFile).toHaveBeenCalledTimes(1);
      expect(writeFile).toHaveBeenCalledWith(join(ctx.outDir, 'file1.html'), expect.stringContaining('data-beasties-container'), 'utf8');
    });

    test('skips inlineAboveFold when trailingSlash is false', async () => {
      execSyncMock.mockReturnValueOnce('1.2.3');
      const ffmpeg = new EventEmitter() as any;
      ffmpeg.end = jest.fn();
      ffmpeg.kill = jest.fn();
      ffmpeg.stdin = ffmpeg;
      global.fetch = jest.fn().mockResolvedValue({ body: {}, ok: true, status: 200 });
      const piper1 = new EventEmitter() as any;
      piper1.kill = jest.fn();
      piper1.stderr = piper1;
      const piper2 = new EventEmitter() as any;
      piper2.kill = jest.fn();
      piper2.stderr = piper2;
      spawnMock
        .mockReturnValueOnce(piper1)
        .mockReturnValueOnce(piper2)
        // 2 files.
        .mockReturnValueOnce(ffmpeg)
        .mockReturnValueOnce(ffmpeg);

      const promise = Plugin.postBuild(base);
      setTimeout(() => piper1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piper2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      setTimeout(() => ffmpeg.emit('close', 0), 5);
      await promise;

      // generateAudio.
      expect(mkdir).toHaveBeenNthCalledWith(1, join(base.outDir, 'audio'), { recursive: true });
      expect(spawnMock.mock.calls).toHaveLength(audio.length + 2);

      // generatePdf.
      expect(mkdir).toHaveBeenNthCalledWith(2, join(base.outDir, 'pdf'), { recursive: true });
      expect(createWriteStreamMock.mock.calls).toHaveLength(pdf.length);

      // inlineAboveFold.
      expect(beastiesProcess).not.toHaveBeenCalled();
      expect(readFile).not.toHaveBeenCalled();
      expect(writeFile).not.toHaveBeenCalled();
    });
  });

  describe('stale', () => {
    const siteDir = '/root';
    test.each([
      // Target does not exist -> stale.
      ['non-existent target', true, new Error('ENOENT'), []],
      // Data newer than target -> stale.
      ['data newer than target', true, undefined, [200, 100, 50, 50]],
      // Model newer than target -> stale.
      ['model newer than target', true, undefined, [50, 100, 200, 50]],
      // Template newer than target -> stale.
      ['template newer than target', true, undefined, [50, 100, 50, 200]],
      // Target older than cutoff -> stale.
      ['target older than cutoff', true, undefined, [50, Date.now() - 8 * Plugin.MS_PER_DAY, 50, 50]],
      // Target fresh -> not stale.
      ['target fresh', false, undefined, [50, Date.now(), 50, 50]],
    ])('%s -> expected=%s', async (scenario, expected, accessReturn, stats) => {
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
        model: 'modelName',
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
      expect(cw.devServer.static[0].publicPath).toBe('/audio');
      expect(cw.devServer.static[1].publicPath).toBe('/pdf');
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
      execSyncMock.mockReturnValueOnce('1.2.3');
      const ffmpeg = new EventEmitter() as any;
      ffmpeg.end = jest.fn();
      ffmpeg.kill = jest.fn();
      ffmpeg.stdin = ffmpeg;
      global.fetch = jest.fn().mockResolvedValue({ body: {}, ok: true, status: 200 });
      const piper1 = new EventEmitter() as any;
      piper1.kill = jest.fn();
      piper1.stderr = piper1;
      const piper2 = new EventEmitter() as any;
      piper2.kill = jest.fn();
      piper2.stderr = piper2;
      spawnMock
        .mockReturnValueOnce(piper1)
        .mockReturnValueOnce(piper2)
        // 2 files.
        .mockReturnValueOnce(ffmpeg)
        .mockReturnValueOnce(ffmpeg);

      const promise = actions.action?.('./some/dir', { config: 'myconf.ts', outDir: 'custom-build' });
      setTimeout(() => piper1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piper2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      setTimeout(() => ffmpeg.emit('close', 0), 5);
      await promise;

      expect(loadFreshModule).toHaveBeenCalled();
      expect(createWriteStreamMock.mock.calls.length - beforeWrites).toEqual(pdf.length);
      expect(spawnMock).toHaveBeenCalledTimes(audio.length + 2);
    });

    test('extendCli action: default args and falsy cliSiteDir fallback behave independently', async () => {
      // Default (undefined) invocation.
      const pluginA = Plugin.default({ siteDir: '/ctx/siteA' });
      const actionsA: CliActions = {};
      const cliA = makeCli(actionsA);
      (loadFreshModule as jest.Mock).mockResolvedValue(siteConfig);
      pluginA.extendCli(cliA);

      const beforeA = createWriteStreamMock.mock.calls.length;
      execSyncMock.mockReturnValueOnce('1.2.3');
      const ffmpegA = new EventEmitter() as any;
      ffmpegA.end = jest.fn();
      ffmpegA.kill = jest.fn();
      ffmpegA.stdin = ffmpegA;
      global.fetch = jest.fn().mockResolvedValue({ body: {}, ok: true, status: 200 });
      const piperA1 = new EventEmitter() as any;
      piperA1.kill = jest.fn();
      piperA1.stderr = piperA1;
      const piperA2 = new EventEmitter() as any;
      piperA2.kill = jest.fn();
      piperA2.stderr = piperA2;
      spawnMock
        .mockReturnValueOnce(piperA1)
        .mockReturnValueOnce(piperA2)
        // 2 files.
        .mockReturnValueOnce(ffmpegA)
        .mockReturnValueOnce(ffmpegA);

      const promiseA = actionsA.action?.(undefined, undefined);
      setTimeout(() => piperA1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piperA2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      setTimeout(() => ffmpegA.emit('close', 0), 5);
      await promiseA;

      expect(createWriteStreamMock.mock.calls.length - beforeA).toEqual(pdf.length);
      expect(spawnMock).toHaveBeenCalledTimes(audio.length + 2);
      spawnMock.mockClear();

      // Falsy cliSiteDir -> fallback to context.siteDir and default filenames.
      const context = { siteDir: '/fallback/context/site' };
      const pluginB = Plugin.default(context);
      const actionsB: CliActions = {};
      const cliB = makeCli(actionsB);
      pluginB.extendCli(cliB);

      const beforeB = createWriteStreamMock.mock.calls.length;
      const ffmpegB = new EventEmitter() as any;
      ffmpegB.end = jest.fn();
      ffmpegB.kill = jest.fn();
      ffmpegB.stdin = ffmpegB;
      global.fetch = jest.fn().mockResolvedValue({ body: {}, ok: true, status: 200 });
      const piperB1 = new EventEmitter() as any;
      piperB1.kill = jest.fn();
      piperB1.stderr = piperB1;
      const piperB2 = new EventEmitter() as any;
      piperB2.kill = jest.fn();
      piperB2.stderr = piperB2;
      spawnMock
        .mockReturnValueOnce(piperB1)
        .mockReturnValueOnce(piperB2)
        // 2 files.
        .mockReturnValueOnce(ffmpegB)
        .mockReturnValueOnce(ffmpegB);

      const promiseB = actionsB.action?.('', {});
      setTimeout(() => piperB1.emit('data', Buffer.from('Running on http://127.0.0.1:5001')), 1);
      setTimeout(() => piperB2.emit('data', Buffer.from('Running on http://127.0.0.1:5002')), 2);
      setTimeout(() => ffmpegB.emit('close', 0), 5);
      await promiseB;

      expect(loadFreshModule).toHaveBeenCalledWith(join(context.siteDir, DEFAULT_CONFIG_FILE_NAME));
      expect(createWriteStreamMock.mock.calls.length - beforeB).toEqual(pdf.length);
      expect(spawnMock).toHaveBeenCalledTimes(audio.length + 2);
    });
  });
});
