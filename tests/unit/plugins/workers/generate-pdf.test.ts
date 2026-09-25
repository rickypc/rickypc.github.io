/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock, spyOn } from 'bun:test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import pdfmake, { write } from 'pdfmake';

mock.module('node:worker_threads', () => {
  const original = require('node:worker_threads');
  return {
    ...original,
    workerData: [
      {},
      {
        algorithm: 'sha256',
        generator: 'generator',
        provenance: Buffer.from('provenance'),
        siteConfig: { title: 'site-title', url: 'https://example.com' },
      },
    ],
  };
});

const makeTemplate = (title: string) => ({
  default: mock(async (path) => ({
    definition: { content: [{ text: `${title}:${path}` }], info: { title } },
    options: { compress: false },
  })),
});

['base', 'book', 'condensed', 'roll', 'thangka', 'wheel'].forEach((template) => {
  mock.module(`#buddhism/media/pdf/templates/_${template}`, () => makeTemplate(template));
});

mock.module('#lib/path/one.md', () => ({
  default: { transliteration: { children: 'One', title: 'One' } },
}));

// Sync.
const Worker = require('@site/src/plugins/media/workers/generate-pdf').default;

describe('plugins.media.workers.generate-pdf', () => {
  const outDir = join(tmpdir(), 'generate-pdf-test-out');

  test('generates PDF file', async () => {
    await Worker({
      path: '#lib/path/one.md',
      target: `${outDir}/pdf/one-base.pdf`,
      template: 'base',
    });

    expect(pdfmake.addFonts.mock.calls).toHaveLength(1);
    expect(pdfmake.createPdf.mock.calls).toHaveLength(1);
    expect(pdfmake.setLocalAccessPolicy.mock.calls).toHaveLength(1);
    expect(pdfmake.setUrlAccessPolicy.mock.calls).toHaveLength(1);
    expect(write.mock.calls).toHaveLength(1);
  });

  test('logs an error when PDF writing fails', async () => {
    const consoleMock = spyOn(console, 'error').mockImplementation(() => {});
    write.mockRejectedValueOnce(new Error('error'));

    await expect(
      Worker({
        path: '#lib/path/one.md',
        target: `${outDir}/pdf/one-base.pdf`,
        template: 'base',
      }),
    ).rejects.toThrow();

    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(/Failed writing .*\.pdf:/),
      expect.objectContaining({ message: 'error' }),
    );
  });
});
