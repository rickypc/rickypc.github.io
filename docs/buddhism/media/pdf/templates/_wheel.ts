/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body, type Substance, substance } from '#buddhism/media/pdf/_strip';
import { oneLine } from '#root/src/data/common';
import { properCase } from '#buddhism/media/_common';
import { type PropsWithChildren } from 'react';

type Language = {
  repeat: Repeat;
  title: string;
  typography?: {
    roll?: Typography;
    wheel?: Typography;
  };
};

type Languages = {
  default: {
    lang: string;
    sanskrit: PropsWithChildren<Language>;
    tibetan: PropsWithChildren<Language>;
    total: number;
    transliteration: PropsWithChildren<Language>;
  };
};

type Repeat = {
  roll ?: number;
  wheel ?: number;
};

type Table = {
  body?: any[];
  dontBreakRows?: boolean;
  heights?: any[];
  widths?: any[];
};

type Typography = {
  default: number;
  title: number;
};

/**
 * Generates a pdfMake object for `prayer wheel mantra roll`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default function wheel(path: string) {
  const {
    default: {
      lang = 'bo-CN',
      sanskrit,
      tibetan,
      total = 6,
      transliteration,
    },
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  }: Languages = require(path);
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
  let repeat: Repeat = {};
  let rollFont = 'NotoSans';
  let suffix = '||';
  let text: Substance = '';

  switch (lang) {
    case 'bo-CN':
      fontSizes = tibetan?.typography?.wheel || fontSizes;
      infix = '།';
      lineHeight = 0.84;
      paddingBottom = 1;
      paddingTop = 0.25;
      prefix = '༄༅། ';
      prefixFont = 'Kokonor';
      repeat = tibetan?.repeat;
      rollFont = 'Kokonor';
      suffix = '༎';
      text = substance(tibetan);
      break;
    case 'sa-IN':
      fontSizes = sanskrit?.typography?.wheel || fontSizes;
      // height - padding delta.
      height = 83.175;
      infix = '।';
      lineHeight = 0.81;
      paddingBottom = 0.825;
      paddingTop = 1;
      repeat = sanskrit?.repeat;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      text = substance(sanskrit);
      break;
    default:
      fontSizes = transliteration?.typography?.wheel || fontSizes;
      repeat = transliteration?.repeat;
      text = substance(transliteration);
  }
  // After height & paddings re-assignment.
  // paddings + border + offset (0.0125).
  const rowHeight = ((height - ((paddingBottom + paddingTop + 1 + 0.0125) * 2)) / 3);

  const content = Array.from({ length: total }, (_total, index) => {
    const table: Table = {};
    if (index === 0) {
      table.body = [
        [
          { margin: [0, 5, 0, -5], style: 'intro', text: 'ༀ' },
          {
            rowSpan: 3,
            text: [
              {
                fontSize: fontSizes.title,
                text: `${transliteration?.title?.toUpperCase()} ${repeat?.wheel || 1}x `,
              },
              body(infix, (repeat?.wheel || 1) - 1, prefix, repeat?.wheel || 1, suffix, text),
            ],
          },
        ],
        [{ style: 'intro', text: 'ཨཱཿ' }],
        [{ margin: [0, 1, 0, -1], style: 'intro', text: 'ཧཱུྃ' }],
      ];
      table.heights = [rowHeight, rowHeight, rowHeight];
      table.widths = [18, '*'];
    } else {
      table.body = [
        [
          {
            text: [
              {
                fontSize: fontSizes.title,
                text: `${transliteration?.title?.toUpperCase()} ${repeat?.roll || 1}x `,
              },
              body(infix, (repeat?.roll || 1) - 1, prefix, repeat?.roll || 1, suffix, text),
            ],
          },
        ],
      ];
      table.dontBreakRows = true;
      table.heights = [height];
    }
    return [
      { layout: 'roll', margin: [0, 0, 0, index === lastRoll ? 0 : 7.5], table },
      index === lastRoll ? { canvas: [] } : {
        canvas: [
          {
            lineWidth: 0.25,
            type: 'line',
            x1: -5,
            x2: -0.5,
            y1: 0,
            y2: 0,
          },
          {
            lineWidth: 0.25,
            type: 'line',
            x1: 777.5,
            x2: 782,
            y1: 0,
            y2: 0,
          },
        ],
        margin: [0, 0, 0, 7.5],
      },
    ];
  });

  return {
    definition: {
      content,
      defaultStyle: { font: 'NotoSans', fontSize: fontSizes.default, lineHeight },
      info: {
        keywords: oneLine(`This document is about the
          ${transliteration?.title?.toLowerCase()} and its sacred role in
          traditional consecration rituals where prayer rolls or zung are
          placed inside prayer wheels to serve as relics in support of
          purification and the removal of obscuration while nurturing wisdom
          and compassion so that practitioners may advance toward Buddhahood`),
        subject: oneLine(`Placing prayer rolls inside a prayer wheel helps
          purify defilement and obscuration, fosters wisdom and compassion, and
          supports the attainment of Buddhahood in this very lifetime`),
        title: `${properCase(transliteration?.title)} prayer roll`,
      },
      pageMargins: [7.5, 7.5, 7.5, 7.5],
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
      styles: {
        intro: { alignment: 'center', font: 'Kokonor', fontSize: 16 },
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
