/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { expect, hasAudio, test } from './helper';

test.describe('audio isolated tests', () => {
  const audioDir = join(__dirname, '..', '..', 'build', 'audio');
  const files = readdirSync(audioDir).filter((file) => file.endsWith('.m4a'));

  test('validates total number of M4As', async () => {
    expect(files).toHaveLength(81);
  });

  files.forEach((file) => {
    // eslint-disable-next-line no-empty-pattern
    test(`validates M4A: ${file}`, async ({}, testInfo) => {
      await hasAudio({ file, testInfo, url: join(audioDir, file) });
    });
  });
});
