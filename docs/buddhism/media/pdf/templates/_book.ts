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
const leftChapter = (page: Page) => (page?.contents?.length ? {
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
} : ' ');
const pageLayout = {
  hLineWidth: () => 0.5,
  paddingBottom: () => 0,
  paddingLeft: () => 5,
  paddingRight: () => 5,
  paddingTop: () => 0,
  vLineWidth: () => 0.5,
};
const rightChapter = (page: Page) => (page?.contents?.length ? [
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
] : null);
const unalomeWidth = 44.375;
// After unalomeWidth assignment.
const unalomeMargin = (unalomeWidth * 2) + 5;
// After unalomeMargin assignment.
const pageWithoutTitle = async (page: Page) => {
  const contents = page?.contents || [];
  const { left = {}, middle = {}, right = {} } = page?.images || {};
  const leftContent = contents.length ? contents[0] : null;
  const rightContent = contents.length === 2 ? contents[1] : null;
  const [leftImage, middleImage, rightImage] = await Promise.all([
    image({ ...left, height }),
    image({ ...middle, height }),
    image({ ...right, height }),
  ]);
  return [
    leftChapter(page), leftImage, leftContent, middleImage, rightContent,
    rightImage, rightChapter(page),
  ].filter(Boolean);
};
const pageWithTitle = async (page: Page) => ([
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
]);
const trimMarker = (index: number, lastPage: number) => ((index % 3 === 2 || index === lastPage)
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
const widths = (page: Page) => {
  const images = page?.images || {};
  const { length } = page?.contents || [];
  const netImageWidth = imageWidth - 10;
  // After netImageWidth assignment.
  const leftImageWidth = images.left ? netImageWidth : null;
  const middleImageWidth = images.middle ? netImageWidth : null;
  const rightImageWidth = images.right ? netImageWidth : null;
  if (length) {
    return [
      chapterWidth, leftImageWidth, '*', middleImageWidth,
      length === 2 ? '*' : null, rightImageWidth, chapterWidth,
    ].filter(Boolean);
  }
  return [
    '100%', leftImageWidth, null, middleImageWidth, null,
    rightImageWidth, null,
  ].filter(Boolean);
};

/**
 * Generates a pdfMake object for `prayer book`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function book(path: string) {
  const { default: { pages = [], title } } = await import(path);
  const { length } = pages;
  // After length assignment.
  const lastPage = length - 1;

  const content = await Promise.all(pages.map(async (page: Page, index: number) => ([
    {
      layout: (page?.contents?.length || page?.title) ? 'page' : 'empty',
      margin: [0, 0, 0, index === lastPage ? 0 : 7.5],
      // pageBreak: index % 3 === 2 && index !== lastPage ? 'after' : null,
      table: {
        body: [page?.title ? await pageWithTitle(page) : await pageWithoutTitle(page)],
        dontBreakRows: true,
        heights: [height],
        widths: widths(page),
      },
    },
    trimMarker(index, lastPage),
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
