/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  body, languageGeometry, type LanguageProps, type Languages, type Repeat,
  subsequentBody, type Substance, type Typography,
} from '#buddhism/media/pdf/_strip';
import { oneLine } from '#root/src/data/common';
import { properCase } from '#buddhism/media/_common';

type Table = {
  body?: any[];
  dontBreakRows?: boolean;
  heights?: any[];
  widths?: any[];
};

const firstBody = (
  fontSizes: Typography,
  infix: string,
  prefix: string,
  repeat: Repeat,
  suffix: string,
  text: Substance,
  transliteration: LanguageProps,
) => ([
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
]);

const trimMarker = (index: number, lastRoll: number) => (index === lastRoll
  ? { canvas: [] } : {
    canvas: [
      {
        lineWidth: 0.25, type: 'line', x1: -5, x2: -0.5, y1: 0, y2: 0,
      },
      {
        lineWidth: 0.25, type: 'line', x1: 777.5, x2: 782, y1: 0, y2: 0,
      },
    ],
    margin: [0, 0, 0, 7.5],
  });

/**
 * Generates a pdfMake object for `prayer wheel mantra roll`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function wheel(path: string) {
  const {
    default: {
      lang = 'bo-CN', sanskrit, tibetan, total = 6, transliteration,
    },
  }: Languages = await import(path);
  const {
    fontSizes, height, infix, lineHeight, paddingBottom,
    paddingTop, prefix, prefixFont, repeat, rollFont, suffix, text,
  } = languageGeometry('wheel', lang, sanskrit, tibetan, transliteration);
  const lastRoll = total - 1;
  // After height & paddings re-assignment.
  // paddings + border + offset (0.0125).
  const rowHeight = ((height - ((paddingBottom + paddingTop + 1 + 0.0125) * 2)) / 3);

  const content = Array.from({ length: total }, (_total, index) => {
    const table: Table = {};
    if (index === 0) {
      table.body = firstBody(fontSizes, infix, prefix, repeat, suffix, text, transliteration);
      table.heights = [rowHeight, rowHeight, rowHeight];
      table.widths = [18, '*'];
    } else {
      table.body = subsequentBody(fontSizes, infix, prefix, repeat, 'roll', suffix, text, transliteration);
      table.dontBreakRows = true;
      table.heights = [height];
    }
    return [
      { layout: 'roll', margin: [0, 0, 0, index === lastRoll ? 0 : 7.5], table },
      trimMarker(index, lastRoll),
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
