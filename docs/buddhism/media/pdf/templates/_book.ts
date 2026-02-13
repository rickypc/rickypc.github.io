/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import image, { type Image } from '#buddhism/media/pdf/_image';
import { oneLine } from '#root/src/data/common';
import { properCase } from '#buddhism/media/_common';

type Page = {
  chapters?: string[];
  contents?: any[];
  images: {
    left: Image;
    middle: Image;
    right: Image;
  };
  number: number;
  title?: string;
};

const chapterWidth = 12;
const coverHeight = 70;
const coverMargin = (coverHeight / 2) - 5;

// Geometric box height:
//   H_geom = (612                 // page height (8.5" * 72pt)
//     - (7.5 + 0)                 // page margins (top + bottom)
//     - (3 * (0.5 + 0.5))         // box borders (3 boxes, top + bottom)
//     - (2 * (7.5 + 0.25 + 7.5))  // gaps between boxes: margin + guide line + margin
//   ) / 3                         // 3 boxes
// Actual box height used (pdfmake page overhead):
//   H = H_geom - offset           // offset ≈ 2.3333pt
const height = 188;
const imageWidth = (height * 0.75) - 18;
const pageLayout = {
  hLineWidth: () => 0.5,
  paddingBottom: () => 0,
  paddingLeft: () => 5,
  paddingRight: () => 5,
  paddingTop: () => 0,
  vLineWidth: () => 0.5,
};
const unalomeWidth = 44.375;
// After unalomeWidth assignment.
const unalomeMargin = (unalomeWidth * 2) + 5;

/**
 * Generates a pdfMake object for `prayer book`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function book(path: string) {
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const { default: { pages = [], title } } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const { length } = pages;
  // After length assignment.
  const lastPage = length - 1;

  const content = await Promise.all(pages.map(async (page: Page, index: number) => ([
    {
      layout: (page?.contents?.length || page?.title) ? 'page' : 'empty',
      margin: [0, 0, 0, index === lastPage ? 0 : 7.5],
      // pageBreak: index % 3 === 2 && index !== lastPage ? 'after' : null,
      table: {
        body: [
          page?.title ? [
            {
              layout: 'noBorders',
              margin: [unalomeMargin, coverMargin, unalomeMargin, 0],
              table: {
                body: [
                  [
                    await image({ height, path: '#buddhism/img/unalome-male.webp', width: unalomeWidth }),
                    {
                      margin: [15, ((height - (coverMargin * 2) - coverHeight) / 2) - 5, 15, 0],
                      table: { body: [[page.title]], heights: [coverHeight], widths: ['100%'] },
                    },
                    await image({ height, path: '#buddhism/img/unalome-female.webp', width: unalomeWidth }),
                  ],
                ],
                heights: [height - coverHeight],
                widths: [unalomeWidth, '*', unalomeWidth],
              },
            },
          ] : [
            page?.contents?.length ? {
              margin: [0, 0, 0, -5],
              svg: `
                <svg height="${height}" width="${chapterWidth}">
                  <text
                    dominant-baseline="central"
                    font-size="8pt"
                    text-anchor="middle"
                    transform="rotate(90, ${chapterWidth / 2}, ${height / 2})"
                    x="${chapterWidth / 2}"
                    y="${height / 2}"
                  >
                    ${page?.chapters?.[0] || ''}
                  </text>
                </svg>
              `,
            } : ' ',
            await image({ ...page?.images?.left, height }),
            page?.contents?.length ? page.contents[0] : null,
            await image({ ...page?.images?.middle, height }),
            page?.contents?.length === 2 ? page.contents[1] : null,
            await image({ ...page?.images?.right, height }),
            page?.contents?.length ? [
              {
                margin: [0, 0, 0, -5],
                svg: `
                  <svg height="${height - 16}" width="${chapterWidth}">
                    <text
                      dominant-baseline="central"
                      font-size="8pt"
                      text-anchor="middle"
                      transform="rotate(-90, ${chapterWidth / 2}, ${(height - 16) / 2})"
                      x="${chapterWidth / 2}"
                      y="${(height - 16) / 2}"
                    >
                      ${page?.chapters?.[1] || ''}
                    </text>
                  </svg>
                `,
              },
              {
                svg: `
                  <svg height="16" width="${chapterWidth}">
                    <text
                      dominant-baseline="central"
                      font-size="8pt"
                      text-anchor="start"
                      transform="rotate(-90, ${chapterWidth / 2}, 16)"
                      x="${chapterWidth / 2}"
                      y="16"
                    >
                      ${page?.number || ''}
                    </text>
                  </svg>
                `,
              },
            ] : null,
          ].filter(Boolean),
        ],
        dontBreakRows: true,
        heights: [height],
        widths: [
          page?.contents?.length ? chapterWidth : '100%',
          page?.images?.left ? imageWidth - 10 : null,
          page?.contents?.length ? '*' : null,
          page?.images?.middle ? imageWidth - 10 : null,
          page?.contents?.length === 2 ? '*' : null,
          page?.images?.right ? imageWidth - 10 : null,
          page?.contents?.length ? chapterWidth : null,
        ].filter(Boolean),
      },
    },
    (index % 3 === 2 || index === lastPage) ? { canvas: [] } : {
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
  ])));

  return {
    definition: {
      content,
      defaultStyle: { font: 'NotoSans', fontSize: 10 },
      info: {
        keywords: oneLine(`This document is about the ${title?.toLowerCase()}
          prayer book also known as pustaka or pecha and its sacred role in
          traditional prayer rituals where it supports purification and the
          removal of obscuration while nurturing wisdom and compassion so that
          practitioners may advance toward Buddhahood`),
        subject: oneLine(`Reciting prayer purifies defilement and obscuration,
          fosters wisdom and compassion, and supports the attainment of
          Buddhahood in this very lifetime`),
        title: `${properCase(title)} prayer book`,
      },
      pageMargins: [7.5, 7.5, 7.5, 7.5],
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
      styles: {
        instruction: { fontSize: 7.75, italics: true, lineHeight: 0.85 },
        phrase: { fontSize: 11.5, lineHeight: 0.8 },
        'phrase-set': { margin: [0, -3.5, 0, 4.5] },
        repetition: { fontSize: 9.25 },
        sanskrit: { font: 'NotoSerifDevanagari', fontSize: 7.5, lineHeight: 0.85 },
        section: { bold: true, fontSize: 8 },
        'section-set': { lineHeight: 0.85, margin: [0, 2.75, 0, 1.5] },
        tibetan: { font: 'Kokonor', fontSize: 7.5, lineHeight: 0.85 },
      },
    },
    options: {
      tableLayouts: {
        empty: {
          ...pageLayout,
          hLineColor: () => '#ffffff',
          vLineColor: () => '#ffffff',
        },
        page: pageLayout,
      },
    },
  };
}
