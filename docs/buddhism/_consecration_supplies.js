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
    return `${text ? `${text}${index !== last ? '।' : ''}` : ''}`;
  }).join('\n');
};

const instruction = (direction) => ({
  text: [
    ...((Array.isArray(direction) ? direction : [direction])
      .map((text) => (typeof (text) === 'string' ? { style: 'instruction', text } : text))),
  ],
});

// After instruction assignment.
const header = (title, direction = '') => (direction?.length ? {
  style: 'section-set',
  text: [{ style: 'section', text: title }, instruction(direction)],
} : { style: ['section', 'section-set'], text: title });

const main = (sanskrit, transliteration, repetition = 0) => ([
  { style: 'sanskrit', text: sanskrit },
  repetition ? {
    style: 'phrase-set',
    text: [
      { style: 'phrase', text: transliteration },
      { style: 'repetition', text: ` [${repetition}x]` },
    ],
  } : { style: ['phrase', 'phrase-set'], text: transliteration },
]);

const phrase = (path, direction = '', repetition = 0, title = '') => {
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const { default: { sanskrit, translation, transliteration } } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  return [
    header(title || `${transliteration.title}${translation?.title ? ` [${translation.title}]` : ''}`, direction),
    ...main(`${body(sanskrit)}॥`, `${body(transliteration)}॥`, repetition || transliteration.repetition),
  ];
};

export default {
  pages: [
    {
      title: [
        {
          alignment: 'center',
          fontSize: 28,
          margin: [0, 14, 0, 0],
          text: 'Supplies Consecration',
        },
      ],
    },
    {
      chapters: ['Maṅgala', 'Abhiṣeka'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_mala.js', ' (recite the prayer, then blow and rub the mālā gently)'),
          ...phrase('#buddhism/phrases/_japa.js'),
          ...phrase('#buddhism/phrases/_dharma.js'),
          ...phrase('#buddhism/phrases/_namaskara.js'),
        ],
        [
          header('Cleansing'),
          ...main('ॐ सर्वतथागता अभिषेकते समय श्रीये हूं॥', 'oṃ sarva tathāgata abhiṣekate samaya śrīye hūṃ॥', 7),
          ...phrase('#buddhism/phrases/_sunyata.js'),
          ...phrase('#buddhism/phrases/_pratityasamutpada.js'),
        ],
      ],
      number: '3',
    },
    '',
    '',
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_vairocana_sarvakata_danavidhih.js'),
          ...phrase('#buddhism/phrases/_ratnadhvaja_parikrama.js'),
          ...phrase('#buddhism/phrases/_vimala_usnisa.js'),
        ],
        [
          header('Preparation', ' (blessing mudrā with our left hand is held above the supplies, palm down with the thumb pressing down the pinky finger. Our right hand is held below the supplies, palm up with the thumb pressing down the pinky finger)'),
          ...main('ॐ धर्मधातु ये स्वाहा धर्मधातु गर्भे स्वाहा॥', 'oṃ dharmadhātu ye svāhā dharmadhātu garbhe svāhā॥', 7),
        ],
      ],
      number: '4',
    },
    '',
  ],
  path: new URL('', import.meta.url).pathname,
  title: 'Supplies Consecration',
};
