/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, hasPdf, test } from './helper';

test.describe('pdf isolated tests', () => {
  const pdfDir = join(__dirname, '..', '..', 'build', 'pdf');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const files = readdirSync(pdfDir).filter((file) => file.endsWith('.pdf'));
  const pages: Record<string, number> = {
    'arya-tara-atiyoga.pdf': 6,
    'consecration-statue-stupa.pdf': 4,
    'consecration-supplies.pdf': 2,
    'mandala-wheels-strip.pdf': 2,
    'mandala-wheels.pdf': 5,
    'prayer-wheels.pdf': 2,
  };

  test('validates total number of PDFs', async () => {
    expect(files).toHaveLength(175);
  });

  files.forEach((file) => {
    // biome-ignore lint/correctness/noEmptyPattern: -
    test(`validates PDF: ${file}`, async ({}, testInfo) => {
      await hasPdf({
        file,
        // eslint-disable-next-line security/detect-object-injection
        pages: pages[file] ?? 1,
        testInfo,
        url: join(pdfDir, file),
      });
    });
  });
});
