/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body, type Substance, substance } from '#buddhism/media/pdf/_strip';
import { oneLine } from '#root/src/data/common';
import { properCase } from '#buddhism/media/_common';

/**
 * Generates a pdfMake object for `condensed mantra roll`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default function condensed(path: string) {
  const {
    default: {
      lang = 'bo-CN',
      sanskrit,
      tibetan,
      total = 18,
      transliteration,
    },
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  let fontSizes = { default: 2, title: 1.75 };
  let infix = '|';
  const lastRoll = total - 1;
  let lineHeight = 0.71;
  // Siddhaṃ sign.
  let prefix = '꣼ ';
  let prefixFont = 'NotoSerifDevanagari';
  let repeat = 1;
  let rollFont = 'NotoSans';
  let suffix = '||';
  let text: Substance = '';

  switch (lang) {
    case 'bo-CN':
      fontSizes = tibetan?.typography?.condensed || fontSizes;
      infix = '།';
      lineHeight = 0.895;
      prefix = '༄༅། ';
      prefixFont = 'Kokonor';
      repeat = tibetan?.repeat?.condensed || 1;
      rollFont = 'Kokonor';
      suffix = '༎';
      text = substance(tibetan);
      break;
    case 'sa-IN':
      fontSizes = sanskrit?.typography?.condensed || fontSizes;
      infix = '।';
      lineHeight = 0.86;
      repeat = sanskrit?.repeat?.condensed || 1;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      text = substance(sanskrit);
      break;
    default:
      fontSizes = transliteration?.typography?.condensed || fontSizes;
      repeat = transliteration?.repeat?.condensed || 1;
      text = substance(transliteration);
  }

  const lastPhrase = repeat - 1;
  // After lastPhrase assignment.
  const content = Array.from({ length: total }, (_total, index) => ([
    {
      layout: 'condensed',
      margin: [0, 0, 0, index === lastRoll ? 0 : 2.5],
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
        // Geometric box height:
        //   H_geom = (792                  // page height (11" * 72pt)
        //     - (7.5 + 0)                  // page margins (top + bottom)
        //     - (18 * (0.25 + 0.25))       // box borders (18 boxes, top + bottom)
        //     - (17 * (2.5 + 0.25 + 2.5))  // gaps between boxes: margin + guide line + margin
        //   ) / 18                         // 18 boxes
        // Actual box height used (pdfmake page overhead):
        //   H = H_geom - offset            // offset ≈ 1.3325pt
        heights: [36.7925],
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
          x1: 592.5,
          x2: 597,
          y1: 0,
          y2: 0,
        },
      ],
      margin: [0, 0, 0, 2.5],
    },
  ]));

  return {
    definition: {
      content,
      defaultStyle: { font: 'NotoSans', fontSize: fontSizes.default, lineHeight },
      info: {
        keywords: oneLine(`This document is about the
          ${transliteration?.title?.toLowerCase()} and its sacred role
          in traditional consecration rituals where condensed prayer rolls or
          zung are placed inside Buddha statues or stupas or prayer wheels to
          serve as relics in support of purification and the removal of
          obscuration while nurturing wisdom and compassion so that
          practitioners may advance toward Buddhahood`),
        subject: oneLine(`Placing condensed prayer rolls inside a Buddha statue
          or prayer wheel helps purify defilement and obscuration, fosters
          wisdom and compassion, and supports the attainment of Buddhahood in
          this very lifetime`),
        title: `${properCase(transliteration?.title)} condensed prayer roll`,
      },
      pageMargins: [7.5, 7.5, 7.5, 7.5],
      pageOrientation: 'portrait',
      pageSize: 'LETTER',
      styles: {
        prefix: { font: prefixFont },
        roll: { font: rollFont },
      },
    },
    options: {
      tableLayouts: {
        condensed: {
          hLineWidth: () => 0.25,
          paddingBottom: () => 0,
          paddingLeft: () => 1.5,
          paddingRight: () => 1,
          paddingTop: () => 1.15,
          vLineWidth: () => 0.25,
        },
      },
    },
  };
}
