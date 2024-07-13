/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
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
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { default: { sanskrit, translation, transliteration } } = require(path);
  return [
    header(title || `${transliteration.title}${translation?.title ? ` [${translation.title}]` : ''}`, direction),
    ...main(`${body(sanskrit)}॥`, `${body(transliteration)}॥`, repetition || transliteration.repetition),
  ];
};

const phrases = (path, direction = '', repetition = 0, title = '') => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { default: { sanskrit, translation, transliteration } } = require(path);
  return [
    [
      header(title || `${transliteration.title}${translation?.title ? ` [${translation.title}]` : ''}`, direction),
      ...main(
        `${body({ children: sanskrit.children.slice(0, sanskrit.children.indexOf('')) })}।`,
        `${body({ children: transliteration.children.slice(0, transliteration.children.indexOf('')) })}।`,
      ),
    ],
    [
      header(title || `${transliteration.title}${translation?.title ? ` [${translation.title}]` : ''}`, ' (continued)'),
      ...main(
        `${body({ children: sanskrit.children.slice(sanskrit.children.indexOf('') + 1) })}॥`,
        `${body({ children: transliteration.children.slice(transliteration.children.indexOf('') + 1) })}॥`,
        repetition || transliteration.repetition,
      ),
    ],
  ];
};

const pratityasamutpadaSamudayaNirodha = phrases('#buddhism/phrases/_pratityasamutpada_samudaya_nirodha.js');

export default {
  pages: [
    {
      title: [
        {
          alignment: 'center',
          fontSize: 28,
          lineHeight: 0.85,
          text: 'Buddha Statue/Stupa/Sculpture Consecration',
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
          ...phrase('#buddhism/phrases/_saranagamana_cittotpada.js'),
          ...phrase('#buddhism/phrases/_catvary_apramanani.js'),
          ...phrase('#buddhism/phrases/_prajna_paramita.js', '', 7),
          ...phrase('#buddhism/phrases/_sunyata.js'),
        ],
      ],
      number: '3',
    },
    {
      chapters: ['Abhiṣeka'],
      contents: [pratityasamutpadaSamudayaNirodha[1]],
      number: '5',
    },
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          ...phrase('#buddhism/phrases/_anekajati.js'),
          ...phrase('#buddhism/phrases/_pratityasamutpada.js'),
        ],
        [
          ...phrase('#buddhism/phrases/_vairocana_sarvakata_danavidhih.js'),
          ...phrase('#buddhism/phrases/_ratnadhvaja_parikrama.js'),
          ...phrase('#buddhism/phrases/_vimala_usnisa.js'),
        ],
      ],
      number: '6',
    },
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          header('Āhvāna [Invitation]'),
          { style: 'tibetan', text: 'ཕྱོགས་བཅུ་ན་བཞུགས་པའི་སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་བདག་ལ་དགོངས་སུ་གསོལ།' },
          { style: 'tibetan', text: 'ཇི་སྲིད་ནམ་མཁའི་མཐའ་དང་མཉམ་པའི་སེམས་ཅན་ཐམས་ཅད་མི་གནས་པའི་མྱ་ངན་ལས་འདས་པའི་ས་ལ་མ་བཞག་གི་བར་དུ་རྒྱལ་བ་རྣམས་མྱ་ངན་ལས་མི་འདའ་བར་བརྟན་པར་བཞུགས་སུ་གསོལ།' },
          { style: 'tibetan', text: 'ཁྱད་པར་དུ་ཡང་སྐུ་གསུང་ཐུགས་ཀྱི་རྟེན་འདི་རྣམས་ལ་ཇི་སྲིད་འབྱུང་བ་བཞིའི་གནོད་པས་མ་ཞིག་གི་བར་དུ་བརྟན་པར་བཞུགས་སུ་གསོལ།' },
          { style: 'tibetan', text: 'བརྟན་པར་བཞུགས་ནས་ཀྱང་བདག་དང་སེམས་ཅན་ཐམས་ཅད་ལ་མཆོག་དང་ཐུན་མོང་གི་དངོས་གྲུབ་མ་ལུས་པ་སྩལ་དུ་གསོལ༎' },
          { style: ['phrase', 'phrase-set'], text: 'chok chu na zhukpé sangyé dang chang chub sempa tamché dak la gong su sol।' },
          { style: ['phrase', 'phrase-set'], text: 'ji si namkhé ta dang nyampé semchen tamché mi népé nya ngen lé dépé sa la ma zhak gi bar du gyalwa nam nya ngen lé mi dawar tenpar zhuk su sol।' },
          { style: ['phrase', 'phrase-set'], text: 'khyepar du yang ku sung tuk kyi ten di nam ji si jungwa zhi\'i nöpé ma zhik gi bar du tenpar zhuk su sol।' },
          {
            style: 'phrase-set',
            text: [
              { style: 'phrase', text: 'tenpar zhuk né kyang dak dang sem chen tamché la chok dang tün mong gi ngö drup ma lü pa tsal du sol॥' },
              { style: 'repetition', text: ' [3x]' },
            ],
          },
        ],
        [pratityasamutpadaSamudayaNirodha[0]],
      ],
      number: '4',
    },
    '',
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          header('Cakṣu Unmilan [Opening Of Eyes]'),
          ...main('ॐ ज्ञान चक्षु प्रवेशय फट्॥', 'oṃ jñāna cakṣu praveśāya phaṭ॥', 3),
          header('Pañcajñāna [Five Wisdoms]'),
          ...main('ॐ आः हूँ स्वाहा॥', 'oṃ āḥ hūṃ svāhā॥', 3),
          header('Abhiṣekapūjā [Consecration Offering]'),
          ...main('ॐ भगवं सर्वतथागत परमपूजा प्रतीच्छ होः । ॐ पुरुषाय होः॥', 'oṃ sarva tathāgata mahāpūja pratīccha hoḥ । oṃ puruṣāya hoḥ॥', 3),
        ],
        [
          header('Supratiṣṭha [Request For Deities To Remain]', ' (blessing mudrā with our left hand is held above the statue/stupa/sculpture, palm down with the thumb pressing down the pinky finger. Our right hand is held below the statue/stupa/sculpture, palm up with the thumb pressing down the pinky finger)'),
          ...main('ॐ गुरु बुद्ध बोधिसत्त्व धर्मपाल सपरिवार एजति जः हूं बं होः । ॐ सुप्रतिष्ठ वज्रये स्वाहा॥', 'oṃ guru buddha bodhisattva dharmapāla saparivāra ejati jaḥ hūṃ baṃ hoḥ । oṃ supratiṣṭha vajraye svāhā॥', 3),
          header('Puṇya Pariṇāmanā [Merit Dedication]', ' (in our own words)'),
          { margin: [0, 7.5, 0, 7.5], text: '' },
        ],
      ],
      number: '7',
    },
    '',
    '',
    '',
    '',
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          header('Svastigāthā [Verses of Auspiciousness]'),
          { style: 'tibetan', text: 'རབ་མཛེས་གསེར་ཞུན་བརྩེགས་པའི་ལྷུན་པོ་ལ།' },
          { style: 'tibetan', text: 'རྣམ་མང་རིན་ཆེན་ཚོགས་ཀྱི་ཕྲ་བཀོད་ལྟར།' },
          { style: 'tibetan', text: 'ལྟ་བས་མི་ངོམས་སྐུ་གཟུགས་མཆོག་འདི་ལ།' },
          { style: 'tibetan', text: 'སྲིད་མཐའི་བར་དུ་བརྟན་པར་བཞུགས་སུ་གསོལ།' },
          { style: ['phrase', 'phrase-set'], text: 'rab dze ser zhun tzeg pä\'i lhun po la।' },
          { style: ['phrase', 'phrase-set'], text: 'nam mang rin ch\'en tsog kyi tr\'a kö tar।' },
          { style: ['phrase', 'phrase-set'], text: 'ta wä mi ngom ku zug ch\'og di d\'ag।' },
          { style: ['phrase', 'phrase-set'], text: 'si thäi bar du tän par zhug su söl।' },
        ],
        [
          header('Svastigāthā [Verses of Auspiciousness]', ' (continued)'),
          { style: 'tibetan', text: 'མི་འགྱུར་ལྷུན་པོ་སྐུ་ཡི་བཀྲ་ཤིས་ཤོག།' },
          { style: 'tibetan', text: 'ཡན་ལག་དྲུག་ཅུ་གསུང་གི་བཀྲ་ཤིས་ཤོག།' },
          { style: 'tibetan', text: 'མཐའ་བྲལ་དོན་དམ་གས་ཀི་བཀྲ་ཤིས་ཤོག།' },
          { style: 'tibetan', text: 'རྒྱལ་བའི་སྐུ་གསུང་ཐུགས་ཀི་བཀྲ་ཤིས་ཤོག༎' },
          { style: ['phrase', 'phrase-set'], text: 'mi gyur lhun po ku yi tra shi shog।' },
          { style: ['phrase', 'phrase-set'], text: 'yan lag dr\'ug chu sung gi tra shi shog।' },
          { style: ['phrase', 'phrase-set'], text: 'tha\' dr\'äl d\'on d\'am thug kyi tra shi shog।' },
          { style: ['phrase', 'phrase-set'], text: 'gyäl wa\'i ku sung thug kyi tra shi shog॥' },
          header('Prārthanāsiddhiḥ [Accomplishment Of All Aspirations]'),
          ...main('पञ्चेन्द्रियावबोधनीये स्वहा । जय जय सुजय॥', 'pañcendriyāvabodhanīye svāhā । jaya jaya sujaya॥'),
        ],
      ],
      number: '8',
    },
  ],
  path: new URL('', import.meta.url).pathname,
  title: 'Buddha Statue/Stupa/Sculpture Consecration',
};
