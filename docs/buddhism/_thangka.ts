/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { body } from './_common';

/**
 * Generates a pdfMake object for `thangka backside mantra`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default function thangka(path: string) {
  const {
    default: {
      lang = 'bo-CN',
      sanskrit,
      tibetan,
      transliteration,
    },
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  let delimiter = ' ';
  let font = 'NotoSans';
  let fontSizes = { default: 10, double: 30, single: 52.5 };
  let infix = '|';
  let phrase = transliteration;

  switch (lang) {
    case 'bo-CN':
      delimiter = '་';
      font = 'Kokonor';
      fontSizes = tibetan?.typography?.thangka || fontSizes;
      infix = '།';
      phrase = tibetan;
      break;
    case 'sa-IN':
      font = 'NotoSerifDevanagari';
      fontSizes = sanskrit?.typography?.thangka || fontSizes;
      infix = '।';
      phrase = sanskrit;
      break;
    default:
      fontSizes = transliteration?.typography?.thangka || fontSizes;
  }

  const text = `${body(phrase, infix)}${infix}`;
  // After text assignment.
  // eslint-disable-next-line security/detect-non-literal-regexp
  const style = (text.replace(new RegExp(`[${delimiter}${infix}]`, 'g'), '').length / 2) >= 15 ? 'double' : 'single';

  return {
    definition: {
      content: [
        { style: 'bija', text: 'ༀ' },
        { style: 'prayer', margin: [0, -15, 0, 0], text: 'ༀ་སརྦ་བི་དྱཱ་སྭཱ་ཧཱ། ༀ་སརྦ་བི་དྱཱ་སྭཱ་ཧཱ།' },
        { style: 'bija', text: 'ཨཱཿ' },
        { style: 'prayer', text: 'ཨ་ཨཱ། ཨི་ཨཱི། ཨུ་ཨཱུ། རྀ་རཱྀ། ལྀ་ལཱྀ། ཨེ་ཨཻ། ཨོ་ཨཽ། ཨཾ་ཨཿ ཀ་ཁ་ག་གྷ་ང།' },
        { fontSize: 21, text: 'ཙ་ཚ་ཛ་ཛྷ་ཉ། ཊ་ཋ་ཌ་ཌྷ་ཎ། ཏ་ཐ་ད་དྷ་ན། པ་ཕ་བ་བྷ་མ། ཡ་ར་ལ་ཝ། ཤ་ཥ་ས་ཧ་ཀྵ།' },
        { style: 'bija', margin: [0, 30, 0, 0], text: 'ཧཱུྃ' },
        { style: 'prayer', text: 'ༀ་བ་ཛྲཱ་ཡུ་ཥེ་སྭཱ་ཧཱ།' },
        { style, text },
        { style: 'bija', text: 'སྭཱ' },
        { style: 'prayer', text: 'ཡེ་དྷ་རྨཱ་ཧེ་ཏུ་པྲ་བྷ་བཱ་ཧེ་ཏུཾ་ཏེ་ཥཱཾ་ཏ་ཐཱ་ག་ཏ་ཨུ་བཱ་ཙ། ཏེ་ཥཱཾ་ཙ་ཡོ་ནི་རོ་དྷ་ཨེ་བཾ་བཱ་དཱི་མ་ཧཱ་ཤྲ་མ་ཎཿ།' },
        { style: 'bija', text: 'ཧཱ།' },
        { style: 'prayer', text: 'ཨོཾ་སུ་པྲ་ཏིཥྛ་བཛྲ་ཡེ་སྭཱ་ཧཱ།' },
      ],
      defaultStyle: {
        alignment: 'center',
        color: '#cc0000',
        font: 'Kokonor',
        fontSize: fontSizes.default,
        lineHeight: 0.85,
      },
      info: {
        keywords: `This document is about the
          ${transliteration?.title?.toLowerCase()} and its sacred role in
          traditional rituals where prayers are placed on the back of a paubhā
          or thangka to serve as relics in support of purification and the
          removal of obscuration while nurturing wisdom and compassion so that
          practitioners may advance toward Buddhahood`.replace(/\n\s*/g, ' '),
        subject: `Placing prayers on the back of a paubhā or thangka helps
          purify defilement and obscuration, fosters wisdom and compassion, and
          supports the attainment of Buddhahood in this very lifetime`.replace(/\n\s*/g, ' '),
        title: `${transliteration?.title?.[0]}${transliteration?.title?.slice(1)?.toLowerCase()} paubhā/thangka prayer`,
      },
      pageMargins: [7.5, 0, 7.5, 0],
      pageOrientation: 'portrait',
      pageSize: 'LETTER',
      styles: {
        bija: { fontSize: 52.5, margin: [0, 25, 0, 0] },
        double: { font, fontSize: fontSizes.double, margin: [0, 42.5, 0, 0] },
        prayer: { fontSize: 21, margin: [0, 5, 0, 0] },
        single: { font, fontSize: fontSizes.single, margin: [0, 25, 0, -10] },
      },
    },
    options: {},
  };
}
