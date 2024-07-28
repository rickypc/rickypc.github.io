/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line import/extensions
const image = require('./_image.js');

const chapterWidth = 12;
const coverHeight = 70;
const coverMargin = (coverHeight / 2) - 5;
// ((8.5" * 72pt) - (margins + borders)) / 3.
const height = 187.75;
const imageWidth = (height * 0.75) - 18;
const unalomeWidth = 44.375;
// After unalomeWidth assignment.
const unalomeMargin = (unalomeWidth * 2) + 5;

export default async function book(path) {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { default: { pages = [], title } } = require(path);
  const { length } = pages;
  // After length assignment.
  const lastPage = length - 1;

  const content = await Promise.all(pages.map(async (page, index) => ([
    {
      layout: (page?.contents?.length || page?.title) ? 'page' : 'empty',
      margin: [0, 0, 0, index === lastPage ? 0 : 7.5],
      pageBreak: index % 3 === 2 && index !== lastPage ? 'after' : null,
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
    (index % 3 === 2 || index === lastPage) ? null : {
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
        keywords: [
          title?.toLowerCase(),
          'mantra book',
          'prayer book',
          'sacred',
          'purify',
          'wisdom',
          'compassion',
          'buddhahood',
          'pustaka',
          'pecha',
        ].join(';'),
        subject: 'Reciting prayer will purify defilement and obscuration, increase wisdom, and attain Buddhahood in this lifetime',
        title: `${title} prayer book`,
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
          hLineColor: () => '#ffffff',
          hLineWidth: () => 0.5,
          paddingBottom: () => 0,
          paddingLeft: () => 5,
          paddingRight: () => 5,
          paddingTop: () => 0,
          vLineColor: () => '#ffffff',
          vLineWidth: () => 0.5,
        },
        page: {
          hLineWidth: () => 0.5,
          paddingBottom: () => 0,
          paddingLeft: () => 5,
          paddingRight: () => 5,
          paddingTop: () => 0,
          vLineWidth: () => 0.5,
        },
      },
    },
  };
}
