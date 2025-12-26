/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { extname } from 'node:path';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

export type Image = {
  alt?: string;
  height?: number;
  margin?: [number, number, number, number],
  path?: string;
  width: number;
};

// 300px = 72pt = 1".
const pixels = 300 / 72;

/**
 * Generates image object compatible with pdfMake document.
 * @param {object} img - Image metadata.
 * @param {number} img.height - Desired image height.
 * @param {string} img.path - Path to the image file.
 * @param {number} img.width - Desired image width.
 * @returns {object} pdfMake compatible image object.
 */
export default async function image(img: Image) {
  if (!img?.path) {
    return null;
  }
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  let buffer: Buffer = Buffer.from(readFileSync(require.resolve(img.path)));
  const ext = extname(img.path);
  const height = img.height || (img.width * 1.345) + 18;
  const width = img.width || (img.height! * 0.75) - 18;
  if (ext === '.webp') {
    buffer = await sharp(buffer)
      .resize({ width: Math.ceil(width * pixels) })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 90 })
      .toBuffer();
  }
  const mime = ext === '.jpg' ? 'image/jpeg' : 'image/png';
  return [
    {
      alignment: 'center',
      fit: [width, height - 10],
      image: `data:${mime};base64,${buffer.toString('base64')}`,
      margin: Array.isArray(img.margin) ? img.margin : [0, 0, 0, 1.5],
    },
    img.alt ? {
      alignment: 'center',
      fontSize: 8,
      lineHeight: 0.85,
      margin: [-5, 0, -5, 0],
      text: img.alt,
    } : null,
  ].filter(Boolean);
}
