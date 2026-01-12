/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { extname } from 'node:path';
import image from '#buddhism/pdf/_image';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

jest.mock('node:fs');
jest.mock('node:path');
jest.mock('sharp');

describe('docs.buddhism.pdf._image', () => {
  const mockBuffer = Buffer.from('test-image');
  const mockResolver = jest.fn().mockReturnValue('/abs/mock-path');

  beforeEach(() => {
    jest.mocked(extname).mockReturnValue('.png');
    jest.mocked(readFileSync).mockReturnValue(mockBuffer);
    jest.mocked<any>(sharp).mockReturnValue({
      flatten: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      resize: jest.fn().mockReturnThis(),
      toBuffer: jest.fn().mockResolvedValue(Buffer.from('converted')),
    });
  });

  test('returns null when no path is provided', async () => {
    const result = await image({ width: 100 });
    expect(result).toBeNull();
  });

  test('returns a pdfMake image object for PNG', async () => {
    const result = await image({ path: './img.png', width: 100 }, mockResolver);

    expect(readFileSync).toHaveBeenCalled();
    expect(result).toEqual([
      {
        alignment: 'center',
        fit: [100, (100 * 1.345 + 18) - 10],
        image: expect.stringContaining('data:image/png;base64,'),
        margin: [0, 0, 0, 1.5],
      },
    ]);
  });

  test('adds alt text when provided', async () => {
    const result = await image({
      alt: 'Caption',
      path: './img.png',
      width: 100,
    }, mockResolver);

    expect(result?.[1]).toEqual({
      alignment: 'center',
      fontSize: 8,
      lineHeight: 0.85,
      margin: [-5, 0, -5, 0],
      text: 'Caption',
    });
  });

  test('uses custom margin when provided', async () => {
    const result = await image({
      height: 100,
      path: './img.png',
      margin: [1, 2, 3, 4],
    }, mockResolver);

    expect(result?.[0]?.margin).toEqual([1, 2, 3, 4]);
  });

  test('converts WEBP images using sharp', async () => {
    jest.mocked(extname).mockReturnValue('.webp');

    const result = await image({ path: './img.webp', width: 100 }, mockResolver);

    expect(sharp).toHaveBeenCalledWith(mockBuffer);
    expect(result?.[0]?.image).toContain('data:image/png;base64,');
  });

  test('uses JPEG mime for .jpg', async () => {
    jest.mocked(extname).mockReturnValue('.jpg');

    const result = await image({ path: './img.jpg', width: 100 }, mockResolver);

    expect(result?.[0]?.image).toContain('data:image/jpeg;base64,');
  });
});
