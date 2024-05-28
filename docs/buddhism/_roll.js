/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default function roll(path) {
  const {
    lang = 'bo-CN',
    sanskrit,
    tibetan,
    total = 6,
    transliteration,
    // eslint-disable-next-line global-require,import/no-dynamic-require
  } = require(path);
  let infix = '|';
  let lastPhrase = 0;
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
  let text = '';

  switch (lang) {
    case 'bo-CN':
      infix = '།';
      lastPhrase = tibetan.repeat - 1;
      lineHeight = 0.84;
      paddingBottom = 1;
      paddingTop = 0.25;
      prefix = '༄༅། ';
      prefixFont = 'Kokonor';
      repeat = tibetan.repeat;
      rollFont = 'Kokonor';
      suffix = '༎';
      text = typeof (tibetan.children) === 'string'
        ? tibetan.children : tibetan.children?.props?.children;
      break;
    case 'sa-IN':
      lastPhrase = sanskrit.repeat - 1;
      infix = '।';
      lineHeight = 0.805;
      paddingBottom = 1;
      paddingTop = 1;
      repeat = sanskrit.repeat;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      text = typeof (sanskrit.children) === 'string'
        ? sanskrit.children : sanskrit.children?.props?.children;
      break;
    default:
      lastPhrase = transliteration.repeat - 1;
      repeat = transliteration.repeat;
      text = typeof (transliteration.children) === 'string'
        ? transliteration.children : transliteration.children?.props?.children;
  }

  const content = Array.from({ length: total }, (_total, index) => ([
    {
      layout: 'roll',
      margin: [0, 0, 0, index === lastRoll ? 0 : 7.5],
      table: {
        body: [
          [
            [
              {
                text: [
                  {
                    fontSize: 4,
                    text: `${transliteration.title.toUpperCase()} ${repeat}x `,
                  },
                  {
                    text: [
                      { style: 'prefix', text: prefix },
                      {
                        text: Array.from(
                          { length: repeat },
                          (_repeat, idx) => ({
                            style: 'roll',
                            text: `${infix}${text}${idx === lastPhrase ? '' : `${infix} `}`,
                          }),
                        ),
                      },
                      { style: 'roll', text: suffix },
                    ],
                  },
                ],
              },
            ],
          ],
        ],
        heights: [65],
      },
    },
    index === lastRoll ? null : {
      canvas: [
        {
          dash: { length: 3.5, space: 2.5 },
          lineWidth: 1,
          type: 'line',
          x1: 0,
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
      defaultStyle: { font: 'NotoSans', fontSize: 6, lineHeight },
      info: {
        keywords: [
          transliteration.title.toLowerCase(),
          'mantra',
          'roll',
          'scroll',
          'sacred',
          'statue',
          'stupa',
          'purify',
          'consecration',
          'prayer wheel',
          'wisdom',
          'compassion',
          'relic',
        ].join(';'),
        subject: 'Placing mantra rolls inside the Buddha statue or prayer wheel will purify defilement and obscuration, increase wisdom, and attain Buddhahood in this lifetime',
        title: `${transliteration.title} mantra roll`,
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
    path,
  };
}
