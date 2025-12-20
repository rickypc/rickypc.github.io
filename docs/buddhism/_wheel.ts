/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren } from 'react';
// eslint-disable-next-line import/extensions
import { body, substance } from './_strip.js';

type Language = {
  repeat: Repeat;
  title?: string;
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
  // ((page height - (margins + borders)) / 6) - paddings.
  const height = 77.5;
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
  const rowHeight = height / 3;
  let suffix = '||';
  let text = '';

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
      text = substance(tibetan?.children);
      break;
    case 'sa-IN':
      fontSizes = sanskrit?.typography?.wheel || fontSizes;
      infix = '।';
      lineHeight = 0.81;
      paddingBottom = 0.825;
      paddingTop = 1;
      repeat = sanskrit?.repeat;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      text = substance(sanskrit.children);
      break;
    default:
      fontSizes = transliteration?.typography?.wheel || fontSizes;
      repeat = transliteration?.repeat;
      text = substance(transliteration.children);
  }

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
        [{ margin: [0, 0, 0, 0], style: 'intro', text: 'ཨཱཿ' }],
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
      table.heights = [82.5];
    }
    return [
      { layout: 'roll', margin: [0, 0, 0, index === lastRoll ? 0 : 7.5], table },
      index === lastRoll ? null : {
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
        keywords: `This document is about the
          ${transliteration?.title?.toLowerCase()} and its sacred role in
          traditional consecration rituals where prayer rolls or zung are
          placed inside prayer wheels to serve as relics in support of
          purification and the removal of obscuration while nurturing wisdom
          and compassion so that practitioners may advance toward Buddhahood`.replace(/\n\s*/g, ' '),
        subject: `Placing prayer rolls inside a prayer wheel helps purify
          defilement and obscuration, fosters wisdom and compassion, and
          supports the attainment of Buddhahood in this very lifetime`.replace(/\n\s*/g, ' '),
        title: `${transliteration?.title?.[0]}${transliteration?.title?.slice(1)?.toLowerCase()} prayer roll`,
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
