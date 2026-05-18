/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Beasties from 'beasties';
import { readFile, writeFile } from 'node:fs/promises';
import { workerData } from 'node:worker_threads';

type Options = {
  path: string;
};

const [, { outDir }] = workerData;
let beasties: typeof Beasties | null = null;

/**
 * Generates critical CSS for a single HTML file.
 * @param {Options} options - Execution options for the Critical CSS
 *   worker.
 * @param {string} options.path - The HTML file to process.
 */
export default async function run({ path }: Options) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const html = await readFile(path, 'utf8');
  if (!html.includes('data-beasties-container')) {
    // istanbul ignore else
    if (!beasties) {
      beasties = new Beasties({ logLevel: 'warn', path: outDir, preload: 'swap' });
    }
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await writeFile(path, await beasties.process(html), 'utf8');
  }
}
