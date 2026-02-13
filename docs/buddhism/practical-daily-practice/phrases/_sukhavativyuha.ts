/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import amitabha from './_amitabha';

const core = {
  sanskrit: {
    children: 'ॐ अमृते । अमृत उद्भवे । अमृत संभवे । अमृत गर्भे । अमृत सिद्धे । अमृत तेजे । अमृत विक्रान्ते । अमृत विक्रान्त गामिने । अमृत गगन कृतिकरे । अमृत दुंदुभि स्वरे । सर्व अर्थ साधने । सर्व कर्म क्लेश क्षयंकरे स्वाहा',
  },
  transliteration: {
    children: 'oṃ amṛte । amṛta udbhave । amṛta saṃbhave । amṛta garbhe । amṛta siddhe । amṛta teje । amṛta vikrānte । amṛta vikrānta gāmine । amṛta gagana kṛtikare । amṛta duṃdubhi svare । sarva artha sādhane । sarva karma kleśa kṣayaṃkare svāhā',
  },
};

export default {
  core,
  lang: 'sa-IN',
  path: import.meta.url,
  sanskrit: {
    children: [core.sanskrit.children, amitabha.sanskrit.children].join(' । '),
    repeat: {
      condensed: 51,
      roll: 18,
      wheel: 17,
    },
    title: 'सुखावतीव्यूह धारणी',
  },
  translation: {
    title: 'Pure Land Rebirth Dhāraṇī',
  },
  transliteration: {
    children: [core.transliteration.children, amitabha.transliteration.children].join(' । '),
    title: 'Sukhāvatīvyūha Dhāraṇī',
  },
};
