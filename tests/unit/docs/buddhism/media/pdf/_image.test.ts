/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import sharp from 'sharp';
import image from '#buddhism/media/pdf/_image';

mock.module('node:fs', () => ({ ...require('node:fs'), readFileSync: mock() }));
mock.module('node:path', () => ({ ...require('node:path'), extname: mock() }));
mock.module('sharp', () => ({ default: mock() }));

describe('docs.buddhism.media.pdf._image', () => {
  const mockBuffer = Buffer.from('test-image');
  const mockResolver = mock().mockReturnValue('/abs/mock-path');

  beforeEach(() => {
    (extname as Mocked<typeof extname>).mockReturnValue('.png');
    (readFileSync as Mocked<typeof readFileSync>).mockReturnValue(mockBuffer);
    (sharp as Mocked<typeof sharp>).mockReturnValue({
      flatten: mock().mockReturnThis(),
      jpeg: mock().mockReturnThis(),
      resize: mock().mockReturnThis(),
      toBuffer: mock().mockResolvedValue(Buffer.from('converted')),
    });
  });

  test('returns null when no path is provided', async () => {
    const result = await image({ width: 100 });
    expect(result).toBeNull();
  });

  test('returns a pdfMake image object for PNG', async () => {
    const result = await image({ path: './img.png' }, mockResolver);

    expect(readFileSync).toHaveBeenCalled();
    expect(result).toEqual([
      {
        alignment: 'center',
        fit: [-18, 8],
        image: expect.stringContaining('data:image/png;base64,'),
        margin: [0, 0, 0, 1.5],
      },
    ]);
  });

  test('adds alt text when provided', async () => {
    const result = await image(
      {
        alt: 'Caption',
        path: './img.png',
        width: 100,
      },
      mockResolver,
    );

    expect(result?.[1]).toEqual({
      alignment: 'center',
      fontSize: 8,
      lineHeight: 0.85,
      margin: [-5, 0, -5, 0],
      text: 'Caption',
    });
  });

  test('uses custom margin when provided', async () => {
    const result = await image(
      {
        height: 100,
        margin: [1, 2, 3, 4],
        path: './img.png',
      },
      mockResolver,
    );

    expect(result?.[0]?.margin).toEqual([1, 2, 3, 4]);
  });

  test('converts WEBP images using sharp', async () => {
    (extname as Mocked<typeof extname>).mockReturnValue('.webp');

    const result = await image({ path: './img.webp', width: 100 }, mockResolver);

    expect(sharp).toHaveBeenCalledWith(mockBuffer);
    expect(result?.[0]?.image).toContain('data:image/png;base64,');
  });

  test('uses JPEG mime for .jpg', async () => {
    (extname as Mocked<typeof extname>).mockReturnValue('.jpg');

    const result = await image({ path: './img.jpg', width: 100 }, mockResolver);

    expect(result?.[0]?.image).toContain('data:image/jpeg;base64,');
  });
});
