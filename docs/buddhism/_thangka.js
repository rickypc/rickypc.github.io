/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const body = (phrase) => {
  const group = Array.isArray(phrase.children) ? phrase.children : [phrase.children];
  const last = group.length - 1;
  return group.flatMap((words, index) => {
    const text = `${words?.props?.children ? words.props.children : words}`;
    return `${text ? `${text}${index !== last ? '།' : ''}` : ''}`;
  }).join('\n');
};

/**
 * @description Generates a pdfMake object for `thangka backside mantra`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default function thangka(path) {
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const { default: { tibetan, transliteration } } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const text = `${body(tibetan)}།`;
  // After text assignment.
  const style = (text.replace(/[་།]/g, '').length / 2) >= 15 ? 'double' : 'single';

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
        fontSize: 10,
        lineHeight: 0.85,
      },
      info: {
        keywords: [
          transliteration?.title?.toLowerCase(),
          'paubhā',
          'thangka',
          'paubhā mantra',
          'thangka mantra',
          'paubhā prayer',
          'thangka prayer',
          'sacred',
          'relic',
          'dhāraṇī',
          'zung',
        ].join(';'),
        subject: 'Placing prayer on the back of paubhā/thangka will purify defilement and obscuration, increase wisdom, and attain Buddhahood in this lifetime',
        title: `${transliteration?.title} paubhā/thangka prayer`,
      },
      pageMargins: [0, 0, 0, 0],
      pageOrientation: 'portrait',
      pageSize: 'LETTER',
      styles: {
        bija: { fontSize: 52.5, margin: [0, 25, 0, 0] },
        double: { fontSize: 30, margin: [0, 42.5, 0, 0] },
        prayer: { fontSize: 21, margin: [0, 5, 0, 0] },
        single: { fontSize: 52.5, margin: [0, 25, 0, -10] },
      },
    },
  };
}
