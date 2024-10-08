/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable import/extensions */
import amitabha from './_amitabha.js';

const core = {
  sanskrit: {
    children: 'ॐ अमृते । अमृत उद्भवे । अमृत संभवे । अमृत गर्भे । अमृत सिद्धे । अमृत तेजे । अमृत विक्रान्ते । अमृत विक्रान्त गामिने । अमृत गगन कृतिकरे । अमृत दुंदुभि स्वरे । सर्व अर्थ साधने । सर्व कर्म क्लेश क्षयंकरे स्वाहा',
  },
  transliteration: {
    children: 'oṃ amṛte । amṛta udbhave । amṛta saṃbhave । amṛta garbhe । amṛta siddhe । amṛta teje । amṛta vikrānte । amṛta vikrānta gāmine । amṛta gagana kṛtikare । amṛta duṃdubhi svare । sarva artha sādhane । sarva karma kleśa kṣayaṃkare svāhā',
    speech: 'oum amrite, amrita udbawe, amrita sambawe, amrita garbe, amrita siddhe, amrita t-j, amrita wi-krante, amrita wi-kranta gamine, amrita gagana kirtikare, amrita dumdubi sware, sarwa arta sadhane, sarwa karma klesa kesayamkare swaha',
  },
};

export default {
  core,
  sanskrit: {
    children: [core.sanskrit.children, amitabha.sanskrit.children].join(' । '),
    title: 'सुखावतीव्यूह धारणी',
  },
  translation: {
    title: 'Pure Land Rebirth Dhāraṇī',
  },
  transliteration: {
    children: [core.transliteration.children, amitabha.transliteration.children].join(' । '),
    speech: [core.transliteration.speech, amitabha.transliteration.speech].join(', '),
    title: 'Sukhāvatīvyūha Dhāraṇī',
  },
};
