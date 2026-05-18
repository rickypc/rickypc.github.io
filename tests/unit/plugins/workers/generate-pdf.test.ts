/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { Writable } from 'node:stream';

const createWriteStreamMock = jest.mocked(createWriteStream);

jest.mock('node:fs', () => {
  const original = jest.requireActual('node:fs');
  return {
    ...original,
    createWriteStream: jest.fn(() => new Writable({
      write(_chunk, _enc, cb) { cb(); },
    })),
  };
});

jest.mock('node:worker_threads', () => {
  const original = jest.requireActual('node:worker_threads');
  return {
    ...original,
    workerData: [{}, {
      algorithm: 'sha256',
      generator: 'generator',
      provenance: Buffer.from('provenance'),
      siteConfig: { title: 'site-title', url: 'https://example.com' },
    }],
  };
});

const makeTemplate = (title: string) => jest.fn(async (path) => ({
  definition: { content: [{ text: `${title}:${path}` }], info: { title } },
  options: { compress: false },
}));

['base', 'book', 'condensed', 'roll', 'thangka', 'wheel']
  .forEach((template) => jest.mock(
    `#buddhism/media/pdf/templates/_${template}`,
    () => makeTemplate(template),
  ));

jest.mock('#lib/path/one.md', () => ({
  transliteration: { children: 'One', title: 'One' },
}), { virtual: true });

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

    expect(createWriteStreamMock.mock.calls).toHaveLength(1);
  });

  test('logs an error when PDF writing fails', async () => {
    const consoleMock = jest.spyOn(console, 'error')
      .mockImplementation(() => {});
    createWriteStreamMock.mockImplementationOnce(() => {
      throw new Error('error');
    }).mockImplementationOnce(() => {
      throw new Error('error');
    });

    await expect(() => Worker({
      path: '#lib/path/one.md',
      target: `${outDir}/pdf/one-base.pdf`,
      template: 'base',
    })).rejects.toThrow();

    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(/Failed writing .*\.pdf:/),
      expect.objectContaining({ message: 'error' }),
    );
  });
});
