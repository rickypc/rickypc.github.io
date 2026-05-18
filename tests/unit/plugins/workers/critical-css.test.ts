/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { process as beastiesProcess } from 'beasties';
import Worker from '@site/src/plugins/media/workers/critical-css';

jest.mock('node:fs/promises', () => {
  const original = jest.requireActual('node:fs/promises');
  return {
    ...original,
    readFile: jest.fn((path) => Promise.resolve(`<html ${path.includes('2')
      ? 'data-beasties-container ' : ''}/>`)),
    writeFile: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('node:worker_threads', () => {
  const original = jest.requireActual('node:worker_threads');
  return {
    ...original,
    workerData: [{}, { outDir: './out' }],
  };
});

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
