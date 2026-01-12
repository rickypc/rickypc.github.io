/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body, type Substance, substance } from '#buddhism/pdf/_strip';
import { oneLine } from '#root/src/data/common';

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
  // Geometric box height:
  //   H_geom = (612                 // page height (8.5" * 72pt)
  //     - (7.5 + 0)                 // page margins (top + bottom)
  //     - (6 * (1 + 1))             // box borders (6 boxes, top + bottom)
  //     - (5 * (7.5 + 0.25 + 7.5))  // gaps between boxes: margin + guide line + margin
  //   ) / 6                         // 6 boxes
  // Actual box height used (pdfmake page overhead):
  //   H = H_geom - offset           // offset ≈ 2.2916pt
  let height = 83.75;
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
  let text: Substance = '';

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
      text = substance(tibetan);
      break;
    case 'sa-IN':
      fontSizes = sanskrit?.typography?.roll || fontSizes;
      infix = '।';
      // height - padding delta.
      height = 83.175;
      lineHeight = 0.81;
      paddingBottom = 0.825;
      paddingTop = 1;
      repeat = sanskrit?.repeat?.roll || 1;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      text = substance(sanskrit);
      break;
    default:
      fontSizes = transliteration?.typography?.roll || fontSizes;
      repeat = transliteration?.repeat?.roll || 1;
      text = substance(transliteration);
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
        heights: [height],
      },
    },
    index === lastRoll ? { canvas: [] } : {
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
        keywords: oneLine(`This document is about the
          ${transliteration?.title?.toLowerCase()} and its sacred role in
          traditional consecration rituals where prayer rolls or zung are
          placed inside Buddha statues or stupas or prayer wheels to serve as
          relics in support of purification and the removal of obscuration
          while nurturing wisdom and compassion so that practitioners may
          advance toward Buddhahood`),
        subject: oneLine(`Placing prayer rolls inside a Buddha statue or prayer
          wheel helps purify defilement and obscuration, fosters wisdom and
          compassion, and supports the attainment of Buddhahood in this very
          lifetime`),
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
