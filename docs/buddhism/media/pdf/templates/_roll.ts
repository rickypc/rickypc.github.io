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
        lineWidth: 0.25, type: 'line', x1: 772.5, x2: 777, y1: 0, y2: 0,
      },
    ],
    margin: [0, 0, 0, 7.5],
  });

/**
 * Generates a pdfMake object for `mantra roll`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function roll(path: string) {
  const {
    default: {
      lang = 'bo-CN', sanskrit, tibetan, total = 6, transliteration,
    },
  }: Languages = await import(path);
  const {
    fontSizes, height, infix, lineHeight, paddingBottom,
    paddingTop, prefix, prefixFont, repeat, rollFont, suffix, text,
  } = languageGeometry('roll', lang, sanskrit, tibetan, transliteration);
  const lastRoll = total - 1;
  // After lastRoll assignment.
  const content = Array.from({ length: total }, (_total, index) => ([
    {
      layout: {
        paddingBottom: () => paddingBottom,
        paddingLeft: () => 2.5,
        paddingRight: () => 2.5,
        paddingTop: () => paddingTop,
      },
      margin: [0, 0, 0, index === lastRoll ? 0 : 7.5],
      table: {
        body: subsequentBody(fontSizes, infix, prefix, repeat, 'roll', suffix, text, transliteration),
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
        title: `${properCase(transliteration?.title)} prayer roll`,
      },
      pageMargins: [7.5, 7.5, 7.5, 7.5],
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
      styles: { prefix: { font: prefixFont }, roll: { font: rollFont } },
    },
  };
}
