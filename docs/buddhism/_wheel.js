/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const body = (infix, lastPhrase, prefix, repeat, suffix, text) => ({
  text: (Array.isArray(text) ? text : [text]).flatMap((phrase, index) => [
    { style: 'prefix', text: index === 0 ? prefix : ` ${prefix}` },
    {
      text: Array.from(
        { length: repeat },
        (_repeat, idx) => ({
          style: 'roll',
          text: `${infix}${phrase}${idx === lastPhrase ? '' : `${infix} `}`,
        }),
      ),
    },
    { style: 'roll', text: suffix },
  ]),
});

const substance = (children) => (Array.isArray(children) || typeof (children) === 'string'
  ? children : children?.props?.children);

export default function roll(path) {
  const {
    default: {
      lang = 'bo-CN',
      sanskrit,
      tibetan,
      total = 6,
      transliteration,
    },
    // eslint-disable-next-line global-require,import/no-dynamic-require
  } = require(path);
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
  let repeat = 1;
  let rollFont = 'NotoSans';
  const rowHeight = height / 3;
  let suffix = '||';
  let text = '';

  switch (lang) {
    case 'bo-CN':
      infix = '།';
      lineHeight = 0.84;
      paddingBottom = 1;
      paddingTop = 0.25;
      prefix = '༄༅། ';
      prefixFont = 'Kokonor';
      repeat = tibetan?.repeat?.wheel || 1;
      rollFont = 'Kokonor';
      suffix = '༎';
      text = substance(tibetan?.children);
      break;
    case 'sa-IN':
      infix = '।';
      lineHeight = 0.81;
      paddingBottom = 0.825;
      paddingTop = 1;
      repeat = sanskrit?.repeat?.wheel || 1;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      text = substance(sanskrit.children);
      break;
    default:
      repeat = transliteration?.repeat?.wheel || 1;
      text = substance(transliteration.children);
  }

  const lastPhrase = repeat - 1;
  // After lastPhrase assignment.
  const content = Array.from({ length: total }, (_total, index) => ([
    {
      layout: 'roll',
      margin: [0, 0, 0, index === lastRoll ? 0 : 7.5],
      table: {
        body: [
          [
            { margin: [0, 5, 0, -5], style: 'intro', text: 'ༀ' },
            {
              rowSpan: 3,
              text: [
                {
                  fontSize: 4,
                  text: `${transliteration?.title?.toUpperCase()} ${repeat}x `,
                },
                body(infix, lastPhrase, prefix, repeat, suffix, text),
              ],
            },
          ],
          [{ margin: [0, 0, 0, 0], style: 'intro', text: 'ཨཱཿ' }],
          [{ margin: [0, 1, 0, -1], style: 'intro', text: 'ཧཱུྃ' }],
        ],
        heights: [rowHeight, rowHeight, rowHeight],
        widths: [18, '*'],
      },
    },
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
  ]));

  return {
    definition: {
      content,
      defaultStyle: { font: 'NotoSans', fontSize: 6, lineHeight },
      info: {
        keywords: [
          transliteration?.title?.toLowerCase(),
          'mantra roll',
          'prayer roll',
          'prayer scroll',
          'sacred',
          'statue filling',
          'stupa',
          'purify',
          'consecration',
          'prayer wheel',
          'wisdom',
          'compassion',
          'buddhahood',
          'relic',
          'dhāraṇī',
          'zung',
        ].join(';'),
        subject: 'Placing prayer rolls inside the Buddha statue or prayer wheel will purify defilement and obscuration, increase wisdom, and attain Buddhahood in this lifetime',
        title: `${transliteration?.title} prayer roll`,
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
