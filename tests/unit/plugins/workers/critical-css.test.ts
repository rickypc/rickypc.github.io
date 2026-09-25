/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { readFile, writeFile } from 'node:fs/promises';
import * as Beasties from 'beasties';

const beastiesProcess = (Beasties as Mocked<Beasties.default>).process;

mock.module('node:fs/promises', () => {
  const original = require('node:fs/promises');
  return {
    ...original,
    readFile: mock((path) =>
      Promise.resolve(`<html ${path.includes('2') ? 'data-beasties-container ' : ''}/>`),
    ),
    writeFile: mock(() => Promise.resolve()),
  };
});

mock.module('node:worker_threads', () => {
  const original = require('node:worker_threads');
  return {
    ...original,
    workerData: [{}, { outDir: './out' }],
  };
});

// Bun's mock.module is registered at runtime: import the SUT after the mocks above
// so its module-scope `workerData` read sees the mocked 'node:worker_threads'.
const { default: Worker } = await import('@site/src/plugins/media/workers/critical-css');

describe('plugins.media.workers.critical-css', () => {
  test('processes HTML file', async () => {
    await Worker({ path: 'out/file.html' });

    expect(beastiesProcess).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledTimes(1);
    expect(writeFile).toHaveBeenCalledWith(
      'out/file.html',
      expect.stringContaining('data-beasties-container'),
      'utf8',
    );
  });

  test('skips processed HTML file', async () => {
    await Worker({ path: 'out/file2.html' });

    expect(beastiesProcess).not.toHaveBeenCalled();
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(writeFile).not.toHaveBeenCalled();
  });
});
