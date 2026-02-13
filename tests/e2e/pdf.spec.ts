/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { expect, hasPdf, test } from './helper';

test.describe('pdf isolated tests', () => {
  const pdfDir = join(__dirname, '..', '..', 'build', 'pdf');
  const files = readdirSync(pdfDir).filter((file) => file.endsWith('.pdf'));
  const pages: Record<string, number> = {
    'arya-tara-atiyoga.pdf': 6,
    'consecration-statue-stupa.pdf': 4,
    'consecration-supplies.pdf': 2,
    'mandala-wheels.pdf': 5,
    'mandala-wheels-strip.pdf': 2,
    'prayer-wheels.pdf': 2,
  };

  test('validates total number of PDFs', async () => {
    expect(files).toHaveLength(169);
  });

  files.forEach((file) => {
    // eslint-disable-next-line no-empty-pattern
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
