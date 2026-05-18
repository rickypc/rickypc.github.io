/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { createHash, createHmac } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { join } from 'node:path';
import PdfMake from 'pdfmake';
import { workerData } from 'node:worker_threads';
// Templates.
import base from '#buddhism/media/pdf/templates/_base';
import book from '#buddhism/media/pdf/templates/_book';
import condensed from '#buddhism/media/pdf/templates/_condensed';
import roll from '#buddhism/media/pdf/templates/_roll';
import thangka from '#buddhism/media/pdf/templates/_thangka';
import wheel from '#buddhism/media/pdf/templates/_wheel';

type Options = {
  path: string;
  target: string;
  template: string;
};

type Templates = {
  base: typeof base;
  book: typeof book;
  condensed: typeof condensed;
  roll: typeof roll;
  thangka: typeof thangka;
  wheel: typeof wheel;
};

const [, {
  algorithm, generator, provenance, siteConfig,
}] = workerData;
let printer: PdfMake | null = null;
const templates = {
  base, book, condensed, roll, thangka, wheel,
};

/**
 * Generate a PDF document from a template definition.
 * @param {Options} options - PDF generation options.
 * @param {string} options.path - Source path used to build the PDF definition.
 * @param {string} options.target - Destination path the PDF will be written.
 * @param {string} options.template - Template name.
 */
export default async function run({ path, target, template }: Options) {
  if (!printer) {
    const devanagari = join(import.meta.dirname, '..', 'font', 'noto', 'NotoSerifDevanagari-Regular.ttf');
    const devanagariBold = join(import.meta.dirname, '..', 'font', 'noto', 'NotoSerifDevanagari-Bold.ttf');
    const kokonor = join(import.meta.dirname, '..', 'font', 'kokonor', 'Kokonor-Regular.ttf');
    printer = new PdfMake({
      Kokonor: {
        bold: kokonor, bolditalics: kokonor, italics: kokonor, normal: kokonor,
      },
      NotoSans: {
        bold: join(import.meta.dirname, '..', 'font', 'noto', 'NotoSans-Bold.ttf'),
        bolditalics: join(import.meta.dirname, '..', 'font', 'noto', 'NotoSans-BoldItalic.ttf'),
        italics: join(import.meta.dirname, '..', 'font', 'noto', 'NotoSans-Italic.ttf'),
        normal: join(import.meta.dirname, '..', 'font', 'noto', 'NotoSans-Regular.ttf'),
      },
      NotoSerifDevanagari: {
        bold: devanagariBold,
        bolditalics: devanagariBold,
        italics: devanagari,
        normal: devanagari,
      },
    });
  }
  const date = new Date();
  const { definition, options } = await templates[template as keyof Templates](path);
  const stamp = createHash(algorithm).update(JSON.stringify({
    date, definition, generator, options,
  })).digest('hex');
  // After stamp assignment.
  const document = printer.createPdfKitDocument({
    ...definition,
    displayTitle: true,
    info: {
      ...definition.info,
      author: siteConfig.title,
      creationDate: date,
      creator: siteConfig.url,
      custom: {
        provenance: createHmac(algorithm, provenance)
          .update(stamp).digest('base64'),
      },
      modDate: date,
      producer: siteConfig.url,
      stamp: `${algorithm}:${stamp}`,
    },
    watermark: {
      bold: true,
      color: 'red',
      font: 'NotoSans',
      fontSize: 90,
      opacity: 0,
      text: siteConfig.url,
    },
  }, options);
  await new Promise((settle, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stream = createWriteStream(target);
    document.on('error', reject);
    stream.on('error', reject);
    stream.on('finish', settle);
    document.pipe(stream);
    document.end();
  }).catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(`\x1b[31mFailed writing ${target}:\x1b[0m`, ex);
    // Re-throw so the worker/pool knows the task actually failed.
    throw ex;
  });
}
