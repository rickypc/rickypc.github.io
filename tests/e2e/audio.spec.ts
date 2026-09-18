/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, hasAudio, test } from './helper';

test.describe('audio isolated tests', () => {
  const audioDir = join(__dirname, '..', '..', 'build', 'audio');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const files = readdirSync(audioDir).filter((file) => file.endsWith('.m4a'));

  test('validates total number of M4As', async () => {
    expect(files).toHaveLength(83);
  });

  files.forEach((file) => {
    // biome-ignore lint/correctness/noEmptyPattern: -
    test(`validates M4A: ${file}`, async ({}, testInfo) => {
      await hasAudio({ file, testInfo, url: join(audioDir, file) });
    });
  });
});
