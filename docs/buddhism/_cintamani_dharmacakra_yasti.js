/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line import/extensions
const { body } = require('./_strip.js');

// ((page height - (margins + borders)) / 6) - paddings.
const height = 79.25;
const infix = '།';
const phrase = {
  sanskrit: {
    children: [
      'ॐ सर्व विद्या स्वाहा । नमः समन्त बुद्धानां । ॐ वज्रायुषे स्वाहा',
      'ॐ धर्मधातु गर्भे स्वाहा । ॐ सर्वतथागता मणि शत दीप्त ज्वल ज्वल धर्मधातु गर्भे स्वाहा',
      'ये धर्मा हेतुप्रभवा हेतुं तेषां तथागत उवाच । तेषांच यो निरोध एवंवादी महाश्रमणः । ॐ सुप्रतिष्ठ वज्रये स्वाहा',
    ],
    title: 'चिन्तामणि धर्मचक्र यष्टि',
  },
  tibetan: {
    children: [
      'ༀ་སརྦ་བི་དྱཱ་སྭཱ་ཧཱ། ན་མཿས་མ་ནྟ་བུ་དྡྷཱ་ནཱཾ། ༀ་བ་ཛྲཱ་ཡུ་ཥེ་སྭཱ་ཧཱ',
      'ༀ་དྷ་རྨ་དྷཱ་ཏུ་ག་རྦྷེ་སྭཱ་ཧཱ། ༀ་སརྦ་ཏ་ཐཱ་ག་ཏཱ་མ་ཎི་ཤ་ཏ་དཱི་པྟ་ཛྭ་ལ་ཛྭ་ལ་དྷ་རྨ་དྷཱ་ཏུ་ག་རྦྷེ་སྭཱ་ཧཱ',
      'ཡེ་དྷ་རྨཱ་ཧེ་ཏུ་པྲ་བྷ་བཱ་ཧེ་ཏུཾ་ཏེ་ཥཱཾ་ཏ་ཐཱ་ག་ཏ་ཨུ་བཱ་ཙ། ཏེ་ཥཱཾ་ཙ་ཡོ་ནི་རོ་དྷ་ཨེ་བཾ་བཱ་དཱི་མ་ཧཱ་ཤྲ་མ་ཎཿ། ཨོཾ་སུ་པྲ་ཏིཥྛ་བཛྲ་ཡེ་སྭཱ་ཧཱ',
    ],
    intros: ['ༀ', 'ཨཱཿ', 'ཧཱུྃ'],
    margins: [
      [0, 5, 0, -5],
      [0, 0, 0, 0],
      [0, 1, 0, -1],
    ],
    repeats: [20, 13, 10],
    title: 'མ་ཎི་འཁོར་ལོ་སྲོག་ཤིང',
  },
  transliteration: {
    children: [
      'oṃ sarva vidyā svāhā । namaḥ samanta buddhānāṃ । oṃ vajrāyuṣe svāhā',
      'oṃ dharmadhātu garbhe svāhā । oṃ sarva tathāgata maṇi śata dīpta jvāla jvāla dharmadhātu garbhe svāhā',
      'ye dharmā hetuprabhavā hetuṃ teṣāṃ tathāgata uvāca । teṣāṃ-ca yo nirodha evaṃ vādi mahāśramaṇaḥ । oṃ supratiṣṭha vajraye svāhā',
    ],
    // Prayer Wheel Life Force Pillar.
    title: 'Cintāmaṇi Dharmacakra Yaṣṭi',
  },
};
const prefix = '༄༅། ';
const rowHeight = height / 3;
const suffix = '༎';

/**
 * @description Generates a pdfMake object for `prayer wheel life force pillar`.
 * @returns {object} A pdfMake compatible object.
 */
export default async function cintamaniDharmacakraYasti() {
  return {
    definition: {
      content: [
        {
          layout: 'roll',
          margin: [0, 0, 0, 7.5],
          table: {
            body: phrase.tibetan.children.map((text, index) => {
              const intro = phrase.tibetan.intros.at(index);
              const margin = phrase.tibetan.margins.at(index);
              const repeat = phrase.tibetan.repeats.at(index);
              return [
                { margin, style: 'intro', text: intro },
                {
                  text: [
                    { fontSize: 4, text: `${repeat}x ` },
                    body(infix, repeat - 1, prefix, repeat, suffix, text),
                  ],
                },
              ];
            }),
            heights: [rowHeight, rowHeight, rowHeight],
            widths: [18, '*'],
          },
        },
        {
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
      ],
      defaultStyle: { font: 'NotoSans', fontSize: 6, lineHeight: 0.84 },
      info: {
        keywords: [
          'cintāmaṇi dharmacakra yaṣṭi',
          'prayer wheel',
          'life force pillar',
          'mantra roll',
          'prayer roll',
          'prayer scroll',
          'sacred',
          'purify',
          'wisdom',
          'compassion',
          'buddhahood',
          'dhāraṇī',
          'zung',
        ],
        subject: 'Turning prayer wheel will purify defilement and obscuration, increase wisdom, and attain Buddhahood in this lifetime',
        title: 'Prayer Wheel Life Force Pillar',
      },
      pageOrientation: 'landscape',
      styles: {
        intro: { alignment: 'center', font: 'Kokonor', fontSize: 16 },
        prefix: { font: 'Kokonor' },
        roll: { font: 'Kokonor' },
      },
    },
    options: {
      tableLayouts: {
        roll: {
          paddingBottom: () => 1,
          paddingLeft: () => 2.5,
          paddingRight: () => 2.5,
          paddingTop: () => 0.25,
        },
      },
    },
  };
}
