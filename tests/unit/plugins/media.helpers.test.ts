/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import type { Stats } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { barsUpdate, barUpdate, create, increment, MultiBar, setTotal, stop } from 'cli-progress';
import { glob } from 'fast-glob';
import { pools } from 'tinypool';

type Piper = EventEmitter & {
  kill: Mocked<any>;
  stderr: EventEmitter;
};

const globMock = glob as Mocked<typeof glob>;
const piper = (port: number, action: 'close' | 'error' | 'success' | 'wildcard' = 'success') => {
  const emitter = new EventEmitter() as any;
  emitter.kill = mock();
  emitter.stderr = emitter;
  setImmediate(() => {
    if (action === 'close') {
      emitter.emit('data', Buffer.from('Address already in use'));
      emitter.emit('close', 1);
    }
    if (action === 'error') {
      emitter.emit('error', new Error('Spawn failed'));
    }
    // Emit wildcard first, before success.
    if (action === 'wildcard') {
      emitter.emit('data', Buffer.from('Running on all addresses (0.0.0.0)'));
    }
    if (action === 'success' || action === 'wildcard') {
      emitter.emit('data', Buffer.from(`Running on http://127.0.0.1:${port}`));
    }
  });
  return emitter;
};

mock.module('node:child_process', () => ({ execSync: mock(), spawn: mock() }));

mock.module('node:fs/promises', () => {
  const original = require('node:fs/promises');
  return {
    ...original,
    access: mock(() => Promise.resolve()),
    mkdir: mock(() => Promise.resolve()),
    stat: mock(() => Promise.resolve()),
  };
});

// Bun's mock.module is not hoisted: read the live bindings only after registration.
const accessMock = access as Mocked<typeof access>;
const spawnMock = spawn as Mocked<typeof spawn>;
const statMock = stat as Mocked<typeof stat>;

mock.module('#root/package.json', () => ({
  devDependencies: { pdfmake: '0.0.0' },
  imports: {
    '@alias/*': 'src/aliased/*',
    '@alias/utils/*': 'src/aliased/utils/*',
    '#lib/*': 'lib/*',
    '#root/*': '*',
  },
}));

const name = 'media';
const Plugin = require('@site/src/plugins/media');

describe(`plugins.${name}.fileResolve`, () => {
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

describe(`plugins.${name}.lastModified`, () => {
  test.each([
    ['file-success', 123456789, { mtimeMs: 123456789 }],
    ['file-failure', 0, new Error('ENOENT')],
  ])('path=%s -> expected=%s', async (path, expected, statReturn) => {
    statMock[`mock${statReturn instanceof Error ? 'Rejected' : 'Resolved'}ValueOnce`](
      statReturn as Stats,
    );

    await expect(Plugin.lastModified(path)).resolves.toBe(expected);
  });
});

describe(`plugins.${name}.outputPaths`, () => {
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
    globMock.mockResolvedValue([...files]);

    const result = await Plugin.outputPaths(outDir, pattern);

    expect(result).toEqual(expected.map((file) => join(outDir, file.replace('/fakeDir/', ''))));
  });
});

describe(`plugins.${name}.piperServer`, () => {
  test('spawns piper server and resolves when ready message appears', async () => {
    const model = 'en_US-model2';
    const pipers: Piper[] = [];
    const port = 5002;
    spawnMock.mockImplementation(() => {
      const server = piper(port, 'wildcard');
      pipers.push(server);
      return server;
    });
    const siteDir = '/root';

    const result = await Plugin.piperServer(siteDir, model, port);

    expect(spawnMock).toHaveBeenCalledWith(`${process.env.HOME}/.venv/default/bin/python`, [
      '-m',
      'piper.http_server',
      '--data-dir=/root/models/en',
      '--model',
      model,
      '--port',
      String(port),
    ]);

    expect(result).toBe(pipers[0]);
  });

  test('spawns piper server and reject on close', async () => {
    const model = 'en_US-model2';
    const port = 5002;
    spawnMock.mockImplementation(() => piper(port, 'close'));
    const siteDir = '/root';

    await expect(Plugin.piperServer(siteDir, model, port)).rejects.toThrow(
      'Piper exited with 1: Address already in use',
    );
  });

  test('spawns piper server and reject on error', async () => {
    const model = 'en_US-model2';
    const port = 5002;
    spawnMock.mockImplementation(() => piper(port, 'error'));
    const siteDir = '/root';

    await expect(Plugin.piperServer(siteDir, model, port)).rejects.toThrow(
      'Piper encountered an error: Spawn failed',
    );
  });
});

describe(`plugins.${name}.stale`, () => {
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
  ])('%s -> expected=%s', async (_, expected, accessReturn, stats) => {
    accessMock[`mock${accessReturn instanceof Error ? 'Rejected' : 'Resolved'}ValueOnce`](
      accessReturn as never,
    );
    // Mock stat results in order: data, target, template.
    statMock.mockImplementation(() => {
      const mtimeMs = stats.shift();
      if (!mtimeMs) {
        throw new Error('ENOENT');
      }
      return Promise.resolve({ mtimeMs } as Stats);
    });

    await expect(
      Plugin.stale({
        data: '@data/file.txt',
        model: 'modelName',
        siteDir,
        target: 'target.pdf',
        template: 'templateName',
      }),
    ).resolves.toBe(expected);

    statMock.mockImplementation(() => Promise.resolve(undefined as any));
  });
});

describe(`plugins.${name}.inlineAboveFold`, () => {
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
      expect.objectContaining({
        // biome-ignore lint/security/noSecrets: -
        format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m',
      }),
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
