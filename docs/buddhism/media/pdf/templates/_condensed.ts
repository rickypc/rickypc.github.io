/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { languageGeometry, type Languages, subsequentBody } from '#buddhism/media/pdf/_strip';
import { oneLine } from '#root/src/data/common';
import { properCase } from '#buddhism/media/_common';

const trimMarker = (index: number, lastRoll: number) => (index === lastRoll
  ? { canvas: [] } : {
    canvas: [
      {
        lineWidth: 0.25, type: 'line', x1: 0, x2: 4.5, y1: 0, y2: 0,
      },
      {
        lineWidth: 0.25, type: 'line', x1: 592.5, x2: 597, y1: 0, y2: 0,
      },
    ],
    margin: [0, 0, 0, 2.5],
  });

/**
 * Generates a pdfMake object for `condensed mantra roll`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function condensed(path: string) {
  const {
    default: {
      lang = 'bo-CN', sanskrit, tibetan, total = 18, transliteration,
    },
  }: Languages = await import(path);
  const {
    fontSizes, height, infix, lineHeight, paddingBottom,
    paddingTop, prefix, prefixFont, repeat, rollFont, suffix, text,
  } = languageGeometry('condensed', lang, sanskrit, tibetan, transliteration);
  const lastRoll = total - 1;
  // After lastPhrase assignment.
  const content = Array.from({ length: total }, (_total, index) => ([
    {
      layout: 'condensed',
      margin: [0, 0, 0, index === lastRoll ? 0 : 2.5],
      table: {
        body: subsequentBody(fontSizes, infix, prefix, repeat, 'condensed', suffix, text, transliteration),
        dontBreakRows: true,
        heights: [height],
      },
    },
    trimMarker(index, lastRoll),
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
      styles: { prefix: { font: prefixFont }, roll: { font: rollFont } },
    },
    options: {
      tableLayouts: {
        condensed: {
          hLineWidth: () => 0.25,
          paddingBottom: () => paddingBottom,
          paddingLeft: () => 1.5,
          paddingRight: () => 1,
          paddingTop: () => paddingTop,
          vLineWidth: () => 0.25,
        },
      },
    },
  };
}
