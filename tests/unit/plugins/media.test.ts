/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { access, mkdir, stat } from 'node:fs/promises';
import {
  barUpdate, barsUpdate, create, increment, MultiBar, setTotal, stop,
} from 'cli-progress';
import { DEFAULT_CONFIG_FILE_NAME, loadFreshModule } from '@docusaurus/utils';
import { execSync, spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { glob } from 'fast-glob';
import { join } from 'node:path';
import { pools } from 'tinypool';
import { ReadableStream } from 'node:stream/web';
import { type Stats } from 'node:fs';
import { tmpdir } from 'node:os';
import { Writable } from 'node:stream';

type ActionFn = (_arg: unknown, _opts: Record<string, unknown> | undefined) => unknown;

type CliActions = {
  action?: ActionFn;
  command?: string;
};

type Piper = EventEmitter & {
  kill: jest.Mock;
  stderr: EventEmitter;
};

const accessMock = jest.mocked(access);
const execSyncMock = jest.mocked(execSync);
const ffmpeg = (error = 0) => {
  const emitter = new EventEmitter() as any;
  emitter.end = jest.fn();
  emitter.kill = jest.fn();
  emitter.stdin = emitter;
  setImmediate(() => {
    if (error) {
      emitter.emit('error', new Error('error'));
    }
    emitter.emit('close', error);
  });
  return emitter;
};
const globMock = jest.mocked(glob);
const piper = (port: number, wildcard = 0) => {
  const emitter = new EventEmitter() as any;
  emitter.kill = jest.fn();
  emitter.stderr = emitter;
  setImmediate(() => {
    if (wildcard) {
      emitter.emit('data', Buffer.from('Running on all addresses (0.0.0.0)'));
    }
    emitter.emit('data', Buffer.from(`Running on http://127.0.0.1:${port}`));
  });
  return emitter;
};
const siteConfig = { title: 'site-title', url: 'https://example.com' };
const spawnMock = jest.mocked(spawn);
const statMock = jest.mocked(stat);
const stream = () => new ReadableStream({
  start(controller) {
    controller.enqueue(new Uint8Array([]));
    controller.close();
  },
});

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
    stat: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('#root/package.json', () => ({
  devDependencies: {
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

const name = 'media';

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
      execSyncMock.mockReturnValueOnce('1.2.3');
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      const pipers: Piper[] = [];
      let port = 5001;
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          const server = piper(port);
          pipers.push(server);
          port += 1;
          return server;
        }
        return ffmpeg();
      });

      await Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());

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
      expect((global.fetch as jest.Mock).mock.calls).toEqual(
        expect.arrayContaining([
          ['http://127.0.0.1:5001', { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
          ['http://127.0.0.1:5002', { body: JSON.stringify({ text: 'two' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
          ['http://127.0.0.1:5001', { body: JSON.stringify({ text: 'thr-ee' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
        ]),
      );
      expect(increment.mock.calls.length - beforeIncrements).toBe(length + 1);
      expect(pipers[0].kill).toHaveBeenCalledTimes(1);
      expect(pipers[1].kill).toHaveBeenCalledTimes(1);
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
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      const now = Date.now();
      const pipers: Piper[] = [];
      let port = 5001;

      accessMock.mockResolvedValueOnce(undefined);
      execSyncMock.mockReturnValueOnce('1.2.3');
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          const server = piper(port);
          pipers.push(server);
          port += 1;
          return server;
        }
        return ffmpeg();
      });
      statMock.mockImplementation((path) => Promise.resolve({
        mtimeMs: String(path).includes('/audio/') ? now : 50,
      } as Stats));

      await Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());

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
      expect(pipers).toHaveLength(0);
      expect(setTotal).toHaveBeenCalledTimes(1);
      expect(spawnMock).not.toHaveBeenCalled();
      expect(stop).toHaveBeenCalledTimes(1);

      statMock.mockImplementation(() => Promise.resolve(undefined as any));
    });

    test('logs error when piper responded with failure', async () => {
      const beforeIncrements = increment.mock.calls.length;
      const consoleMock = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      execSyncMock.mockReturnValueOnce('1.2.3');
      global.fetch = jest.fn().mockResolvedValue({ body: null, ok: false, status: 400 });
      const pipers: Piper[] = [];
      let port = 5001;
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          const server = piper(port);
          pipers.push(server);
          port += 1;
          return server;
        }
        return ffmpeg();
      });

      await Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());

      expect(barUpdate).toHaveBeenCalledWith(0, { task: 'Make Audio' });
      expect(barsUpdate).toHaveBeenCalledTimes(length + 3);
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
      expect((global.fetch as jest.Mock).mock.calls).toEqual(
        expect.arrayContaining([
          ['http://127.0.0.1:5001', { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
          ['http://127.0.0.1:5002', { body: JSON.stringify({ text: 'two' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
          ['http://127.0.0.1:5001', { body: JSON.stringify({ text: 'thr-ee' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
        ]),
      );
      expect(increment.mock.calls.length - beforeIncrements).toBe(length + 1);
      expect(pipers[0].kill).toHaveBeenCalledTimes(1);
      expect(pipers[1].kill).toHaveBeenCalledTimes(1);
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
      execSyncMock.mockReturnValueOnce('1.2.3');
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      const pipers: Piper[] = [];
      let port = 5001;
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          const server = piper(port);
          pipers.push(server);
          port += 1;
          return server;
        }
        return ffmpeg(1);
      });

      await Plugin.generateAudio({ outDir, siteConfig, siteDir }, MultiBar());

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
      expect((global.fetch as jest.Mock).mock.calls).toEqual(
        expect.arrayContaining([
          ['http://127.0.0.1:5001', { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
          ['http://127.0.0.1:5002', { body: JSON.stringify({ text: 'two' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
          ['http://127.0.0.1:5001', { body: JSON.stringify({ text: 'thr-ee' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' }],
        ]),
      );
      expect(increment.mock.calls.length - beforeIncrements).toBe(length + 1);
      expect(pipers[0].kill).toHaveBeenCalledTimes(1);
      expect(pipers[1].kill).toHaveBeenCalledTimes(1);
      expect(setTotal).toHaveBeenCalledWith(length);
      expect(spawnMock).toHaveBeenCalledTimes(length + 2);
      expect(spawnMock).toHaveBeenNthCalledWith(1, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(2, `${process.env.HOME}/.venv/default/bin/python`, expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(3, 'ffmpeg', expect.any(Array));
      expect(spawnMock).toHaveBeenNthCalledWith(4, 'ffmpeg', expect.any(Array));
      expect(stop).toHaveBeenCalledTimes(1);
    });
  });

  describe('generateAudioMetadata', () => {
    test('generates counters, ports, and tracks metadata correctly', () => {
      const result = Plugin.generateAudioMetadata();

      // counters.
      expect(result.counters.get('id_ID-news_tts-medium')).toBe(2);
      expect(result.counters.get('en_US-hfc_male-medium')).toBe(1);

      // ports.
      expect(result.ports.get('id_ID-news_tts-medium')).toBe(5001);
      expect(result.ports.get('en_US-hfc_male-medium')).toBe(5002);

      // tracks.
      expect(result.tracks.get('#lib/path/one.md')).toEqual({
        album: 'Mantra Pronunciations',
        description: 'and confident and accurate recitation.',
        genre: 'Mantra',
        track: 1,
      });
      expect(result.tracks.get('#lib/path/_ricky_huang.md')).toEqual({
        album: 'Name Pronunciations',
        description: 'and precise name articulation.',
        genre: 'Speech',
        track: 1,
      });
      expect(result.tracks.get('#lib/path/three.md')).toEqual({
        album: 'Mantra Pronunciations',
        description: 'and confident and accurate recitation.',
        genre: 'Mantra',
        track: 2,
      });
    });
  });

  describe('generateAudioTrack', () => {
    const generator = 'piper:1.2.3';
    const model = 'id_ID-news_tts-medium';
    const path = '#lib/path/one.md';
    const ports = new Map([[model, 5001]]);
    const siteDir = tmpdir();
    const target = join(siteDir, `${name}-test-out`, 'audio', 'one.m4a');
    const tracks = new Map([
      [
        path,
        {
          album: 'album',
          description: 'description',
          genre: 'genre',
          track: 1,
        },
      ],
    ]);

    test('writes audio file', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      spawnMock.mockReturnValue(ffmpeg());

      await Plugin.generateAudioTrack({
        generator, model, path, ports, siteConfig, siteDir, target, tracks,
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(spawnMock).toHaveBeenCalledTimes(1);
      expect(spawnMock).toHaveBeenNthCalledWith(1, 'ffmpeg', expect.any(Array));
    });

    test('logs error when piper responded with failure', async () => {
      const consoleMock = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      global.fetch = jest.fn().mockResolvedValue({ body: null, ok: false, status: 400 });

      await Plugin.generateAudioTrack({
        generator, model, path, ports, siteConfig, siteDir, target, tracks,
      });

      expect(consoleMock).toHaveBeenCalledTimes(1);
      expect(consoleMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/Failed writing .*\.m4a: Piper responded with 400/),
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
    });

    test('logs error when ffmpeg exits non-zero', async () => {
      const consoleMock = jest.spyOn(console, 'error')
        .mockImplementation(() => {});
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      spawnMock.mockReturnValue(ffmpeg(1));

      await Plugin.generateAudioTrack({
        generator, model, path, ports, siteConfig, siteDir, target, tracks,
      });

      expect(consoleMock).toHaveBeenCalledTimes(1);
      expect(consoleMock).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/Failed writing .*\.m4a:/),
        expect.objectContaining({ message: 'ffmpeg error' }),
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'http://127.0.0.1:5001',
        { body: JSON.stringify({ text: 'one' }), headers: { 'Content-Type': 'application/json' }, method: 'POST' },
      );
      expect(spawnMock).toHaveBeenCalledTimes(1);
      expect(spawnMock).toHaveBeenNthCalledWith(1, 'ffmpeg', expect.any(Array));
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

      await Plugin.generatePdf({ outDir, siteConfig, siteDir }, MultiBar());

      expect(barUpdate).not.toHaveBeenCalled();
      expect(barsUpdate).toHaveBeenCalledTimes(4);
      expect(mkdir).toHaveBeenCalledWith(join(outDir, 'pdf'), { recursive: true });
      expect(create).toHaveBeenCalledWith(length, 0, { color: '\x1B[34m', task: 'Make PDF  ' });
      const pool = pools['generate-pdf.ts'];
      expect(pool.run).toHaveBeenCalledTimes(length);
      expect(pool.run).toHaveBeenNthCalledWith(1, {
        path: '#lib/path/one.md',
        target: expect.stringContaining(`${outDir}/pdf/one.pdf`),
        template: 'base',
      });
      expect(pool.run).toHaveBeenNthCalledWith(2, {
        path: '#lib/path/_ricky_huang.md',
        target: expect.stringContaining(`${outDir}/pdf/ricky-huang.pdf`),
        template: 'book',
      });
      expect(increment.mock.calls.length - beforeIncrements).toBe(length);
      expect(setTotal).not.toHaveBeenCalled();
      expect(stop).toHaveBeenCalledTimes(1);
    });

    test('skip recent pdf files, but updates progress bar once per pdf', async () => {
      const beforeIncrements = increment.mock.calls.length;
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
      const pool = pools['generate-pdf.ts'];
      expect(pool.run).not.toHaveBeenCalled();
      expect(increment.mock.calls.length - beforeIncrements).toBe(length);
      expect(setTotal).not.toHaveBeenCalled();
      expect(stop).toHaveBeenCalledTimes(1);

      statMock.mockImplementation(() => Promise.resolve(undefined as any));
    });
  });

  describe('inlineAboveFold', () => {
    test('processes HTML files and updates progress bar', async () => {
      const outDir = './out';
      globMock.mockResolvedValue([`${outDir}/file1.html`, `${outDir}/file2.html`]);

      await Plugin.inlineAboveFold(outDir, MultiBar());

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
      const pool = pools['critical-css.ts'];
      expect(pool.destroy).toHaveBeenCalledTimes(1);
      // Assert increment called thrice (initial scan + once per file).
      expect(increment).toHaveBeenCalledTimes(3);
      expect(pool.run).toHaveBeenCalledTimes(2);
      expect(pool.run).toHaveBeenNthCalledWith(1, { path: `${outDir}/file1.html` });
      expect(pool.run).toHaveBeenNthCalledWith(2, { path: `${outDir}/file2.html` });
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
    const outDir = '/fakeDir';
    test.each([
      {
        expected: [`${outDir}/file1.md`, `${outDir}/nested/file3.md`],
        files: [`${outDir}/file1.md`, `${outDir}/nested/file3.md`],
        name: 'matches markdown files with *.md pattern',
        pattern: '*.md',
      },
      {
        expected: [`${outDir}/file2.txt`],
        files: [`${outDir}/file2.txt`],
        name: 'matches txt files with *.txt pattern',
        pattern: '*.txt',
      },
      {
        expected: [],
        files: [],
        name: 'returns empty array if no match',
        pattern: '*.json',
      },
    ])('$name', async ({ files, pattern, expected }) => {
      globMock.mockResolvedValue(files);

      const result = await Plugin.outputPaths(outDir, pattern);

      expect(result).toEqual(expected.map((file) => join(outDir, file.replace('/fakeDir/', ''))));
    });
  });

  describe('piperServer', () => {
    test('spawns piper server and resolves when ready message appears', async () => {
      const model = 'en_US-model2';
      const pipers: Piper[] = [];
      const port = 5002;
      spawnMock.mockImplementation(() => {
        const server = piper(port, 1);
        pipers.push(server);
        return server;
      });
      const siteDir = '/root';

      const result = await Plugin.piperServer(siteDir, model, port);

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

      expect(result).toBe(pipers[0]);
    });
  });

  describe('postBuild', () => {
    const base = { outDir: './out', siteConfig: { trailingSlash: false }, siteDir: './site' };

    test('runs generators and inlineAboveFold concurrently when trailingSlash is true', async () => {
      const ctx = { ...base, siteConfig: { trailingSlash: true } };
      execSyncMock.mockReturnValueOnce('1.2.3');
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      globMock.mockResolvedValue([`${ctx.outDir}/file1.html`, `${ctx.outDir}/file2.html`]);
      let port = 5000;
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          port += 1;
          return piper(port);
        }
        return ffmpeg();
      });

      await Plugin.postBuild(ctx);

      // generateAudio.
      expect(mkdir).toHaveBeenNthCalledWith(1, join(ctx.outDir, 'audio'), { recursive: true });
      expect(spawnMock.mock.calls).toHaveLength(audio.length + 2);

      // generatePdf.
      const pdfPool = pools['generate-pdf.ts'];
      expect(mkdir).toHaveBeenNthCalledWith(2, join(ctx.outDir, 'pdf'), { recursive: true });
      expect(pdfPool.run).toHaveBeenCalledTimes(pdf.length);
      expect(pdfPool.run).toHaveBeenNthCalledWith(1, {
        path: '#lib/path/one.md',
        target: 'out/pdf/one.pdf',
        template: 'base',
      });
      expect(pdfPool.run).toHaveBeenNthCalledWith(2, {
        path: '#lib/path/_ricky_huang.md',
        target: 'out/pdf/ricky-huang.pdf',
        template: 'book',
      });

      // inlineAboveFold.
      const cssPool = pools['critical-css.ts'];
      expect(cssPool.destroy).toHaveBeenCalledTimes(1);
      expect(cssPool.run).toHaveBeenCalledTimes(2);
      expect(cssPool.run).toHaveBeenNthCalledWith(1, { path: `${ctx.outDir}/file1.html` });
      expect(cssPool.run).toHaveBeenNthCalledWith(2, { path: `${ctx.outDir}/file2.html` });
    });

    test('skips inlineAboveFold when trailingSlash is false', async () => {
      execSyncMock.mockReturnValueOnce('1.2.3');
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      let port = 5000;
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          port += 1;
          return piper(port);
        }
        return ffmpeg();
      });

      await Plugin.postBuild(base);

      // generateAudio.
      expect(mkdir).toHaveBeenNthCalledWith(1, join(base.outDir, 'audio'), { recursive: true });
      expect(spawnMock.mock.calls).toHaveLength(audio.length + 2);

      // generatePdf.
      const pdfPool = pools['generate-pdf.ts'];
      expect(mkdir).toHaveBeenNthCalledWith(2, join(base.outDir, 'pdf'), { recursive: true });
      expect(pdfPool.run).toHaveBeenCalledTimes(pdf.length);
      expect(pdfPool.run).toHaveBeenNthCalledWith(1, {
        path: '#lib/path/one.md',
        target: 'out/pdf/one.pdf',
        template: 'base',
      });
      expect(pdfPool.run).toHaveBeenNthCalledWith(2, {
        path: '#lib/path/_ricky_huang.md',
        target: 'out/pdf/ricky-huang.pdf',
        template: 'book',
      });

      // inlineAboveFold.
      const cssPool = pools['critical-css.ts'];
      expect(cssPool.destroy).not.toHaveBeenCalled();
      expect(cssPool.run).not.toHaveBeenCalled();
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
      execSyncMock.mockReturnValueOnce('1.2.3');
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      let port = 5000;
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          port += 1;
          return piper(port);
        }
        return ffmpeg();
      });

      await actions.action?.('./some/dir', { config: 'myconf.ts', outDir: 'custom-build' });

      expect(loadFreshModule).toHaveBeenCalled();
      const pool = pools['generate-pdf.ts'];
      expect(pool.run).toHaveBeenCalledTimes(pdf.length);
      expect(pool.run).toHaveBeenNthCalledWith(1, {
        path: '#lib/path/one.md',
        target: expect.stringContaining('some/dir/custom-build/pdf/one.pdf'),
        template: 'base',
      });
      expect(pool.run).toHaveBeenNthCalledWith(2, {
        path: '#lib/path/_ricky_huang.md',
        target: expect.stringContaining('some/dir/custom-build/pdf/ricky-huang.pdf'),
        template: 'book',
      });
      expect(spawnMock).toHaveBeenCalledTimes(audio.length + 2);
    });

    test('extendCli action: default args and falsy cliSiteDir fallback behave independently', async () => {
      // Default (undefined) invocation.
      const pluginA = Plugin.default({ siteDir: '/ctx/siteA' });
      const actionsA: CliActions = {};
      const cliA = makeCli(actionsA);
      (loadFreshModule as jest.Mock).mockResolvedValue(siteConfig);
      pluginA.extendCli(cliA);

      execSyncMock.mockReturnValueOnce('1.2.3');
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        body: stream(), ok: true, status: 200,
      }));
      let port = 5000;
      spawnMock.mockImplementation((cmd) => {
        if (cmd.endsWith('python')) {
          port += 1;
          return piper(port);
        }
        return ffmpeg();
      });

      await actionsA.action?.(undefined, undefined);

      const poolA = pools['generate-pdf.ts'];
      expect(poolA.run).toHaveBeenCalledTimes(pdf.length);
      expect(poolA.run).toHaveBeenNthCalledWith(1, {
        path: '#lib/path/one.md',
        target: expect.stringContaining('build/pdf/one.pdf'),
        template: 'base',
      });
      expect(poolA.run).toHaveBeenNthCalledWith(2, {
        path: '#lib/path/_ricky_huang.md',
        target: expect.stringContaining('build/pdf/ricky-huang.pdf'),
        template: 'book',
      });
      expect(spawnMock).toHaveBeenCalledTimes(audio.length + 2);
      spawnMock.mockClear();

      // Falsy cliSiteDir -> fallback to context.siteDir and default filenames.
      const context = { siteDir: '/fallback/context/site' };
      const pluginB = Plugin.default(context);
      const actionsB: CliActions = {};
      const cliB = makeCli(actionsB);
      pluginB.extendCli(cliB);
      // Reset the port.
      port = 5000;

      await actionsB.action?.('', {});

      expect(loadFreshModule).toHaveBeenCalledWith(join(context.siteDir, DEFAULT_CONFIG_FILE_NAME));
      const poolB = pools['generate-pdf.ts'];
      expect(poolB.run).toHaveBeenCalledTimes(pdf.length);
      expect(poolB.run).toHaveBeenNthCalledWith(1, {
        path: '#lib/path/one.md',
        target: expect.stringContaining('build/pdf/one.pdf'),
        template: 'base',
      });
      expect(poolB.run).toHaveBeenNthCalledWith(2, {
        path: '#lib/path/_ricky_huang.md',
        target: expect.stringContaining('build/pdf/ricky-huang.pdf'),
        template: 'book',
      });
      expect(spawnMock).toHaveBeenCalledTimes(audio.length + 2);
    });
  });
});
