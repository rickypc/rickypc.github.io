/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line import/extensions
import { body, substance } from './_strip.js';

/**
 * Generates a pdfMake object for `mantra roll`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default function roll(path: string) {
  const {
    default: {
      lang = 'bo-CN',
      sanskrit,
      tibetan,
      total = 6,
      transliteration,
    },
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  let fontSizes = { default: 6, title: 4 };
  let infix = '|';
  const lastRoll = total - 1;
  let lineHeight = 0.71;
  let paddingBottom = 2.5;
  let paddingTop = 0;
  // Siddhaṃ sign.
  let prefix = '꣼ ';
  let prefixFont = 'NotoSerifDevanagari';
  let repeat = 1;
  let rollFont = 'NotoSans';
  let suffix = '||';
  let text = '';

  switch (lang) {
    case 'bo-CN':
      fontSizes = tibetan?.typography?.roll || fontSizes;
      infix = '།';
      lineHeight = 0.84;
      paddingBottom = 1;
      paddingTop = 0.25;
      prefix = '༄༅། ';
      prefixFont = 'Kokonor';
      repeat = tibetan?.repeat?.roll || 1;
      rollFont = 'Kokonor';
      suffix = '༎';
      text = substance(tibetan?.children);
      break;
    case 'sa-IN':
      fontSizes = sanskrit?.typography?.roll || fontSizes;
      infix = '।';
      lineHeight = 0.81;
      paddingBottom = 0.825;
      paddingTop = 1;
      repeat = sanskrit?.repeat?.roll || 1;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      text = substance(sanskrit.children);
      break;
    default:
      fontSizes = transliteration?.typography?.roll || fontSizes;
      repeat = transliteration?.repeat?.roll || 1;
      text = substance(transliteration.children);
  }

  const lastPhrase = repeat - 1;
  // After lastPhrase assignment.
  const content = Array.from({ length: total }, (_total, index) => ([
    {
      layout: 'roll',
      margin: [0, 0, 0, index === lastRoll ? 0 : 7.5],
      table: {
        body: [
          [
            {
              text: [
                {
                  fontSize: fontSizes.title,
                  text: `${transliteration?.title?.toUpperCase()} ${repeat}x `,
                },
                body(infix, lastPhrase, prefix, repeat, suffix, text),
              ],
            },
          ],
        ],
        dontBreakRows: true,
        // (page height - (margins + borders)) / 6.
        heights: [82.5],
      },
    },
    index === lastRoll ? null : {
      canvas: [
        {
          lineWidth: 0.25,
          type: 'line',
          x1: 0,
          x2: 4.5,
          y1: 0,
          y2: 0,
        },
        {
          lineWidth: 0.25,
          type: 'line',
          x1: 772.5,
          x2: 777,
          y1: 0,
          y2: 0,
        },
      ],
      margin: [0, 0, 0, 7.5],
    },
  ]));

  return {
    definition: {
      content,
      defaultStyle: { font: 'NotoSans', fontSize: fontSizes.default, lineHeight },
      info: {
        keywords: `This document is about the
          ${transliteration?.title?.toLowerCase()} and its sacred role in
          traditional consecration rituals where prayer rolls or zung are
          placed inside Buddha statues or stupas or prayer wheels to serve as
          relics in support of purification and the removal of obscuration
          while nurturing wisdom and compassion so that practitioners may
          advance toward Buddhahood`.replace(/\n\s*/g, ' '),
        subject: `Placing prayer rolls inside a Buddha statue or prayer wheel
          helps purify defilement and obscuration, fosters wisdom and
          compassion, and supports the attainment of Buddhahood in this very
          lifetime`.replace(/\n\s*/g, ' '),
        title: `${transliteration?.title?.[0]}${transliteration?.title?.slice(1)?.toLowerCase()} prayer roll`,
      },
      pageMargins: [7.5, 7.5, 7.5, 7.5],
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
      styles: {
        prefix: { font: prefixFont },
        roll: { font: rollFont },
      },
    },
    options: {
      tableLayouts: {
        roll: {
          paddingBottom: () => paddingBottom,
          paddingLeft: () => 2.5,
          paddingRight: () => 2.5,
          paddingTop: () => paddingTop,
        },
      },
    },
  };
}
