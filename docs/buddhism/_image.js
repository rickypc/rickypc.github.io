/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const { extname } = require('node:path');
const { readFileSync } = require('node:fs');
const sharp = require('sharp');

// 300px = 72pt = 1".
const pixels = 300 / 72;

export default async function image(img) {
  if (!img?.path) {
    return null;
  }
  let buffer = Buffer.from(readFileSync(require.resolve(img.path)));
  const ext = extname(img.path);
  const height = img.height || (img.width * 1.345) + 18;
  const width = img.width || (img.height * 0.75) - 18;
  if (ext === '.webp') {
    buffer = await sharp(buffer)
      .resize({ width: Math.ceil(width * pixels) })
      .png()
      .toBuffer();
  }
  const mime = ext === '.jpg' ? 'image/jpeg' : 'image/png';
  return [
    {
      alignment: 'center',
      fit: [width, height - 10],
      image: `data:${mime};base64,${buffer.toString('base64')}`,
      margin: [0, 0, 0, 1.5],
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
