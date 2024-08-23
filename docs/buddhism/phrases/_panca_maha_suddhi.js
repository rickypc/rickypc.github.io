/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable import/extensions */
import aksobhya from './_aksobhya.js';
import amoghapasaPadmaUsnisa from './_amoghapasa_padma_usnisa.js';
import mahavairocanaSarvadurgatiParisodhana from './_mahavairocana_sarvadurgati_parisodhana.js';
import usnisaVijaya from './_usnisa_vijaya.js';
import vimalaUsnisa from './_vimala_usnisa.js';

export default {
  path: new URL('', import.meta.url).pathname,
  sanskrit: {
    children: [
      mahavairocanaSarvadurgatiParisodhana.sanskrit.children,
      aksobhya.sanskrit.children,
      usnisaVijaya.sanskrit.children,
      vimalaUsnisa.sanskrit.children,
      amoghapasaPadmaUsnisa.sanskrit.children,
    ],
    title: 'पञ्च महा शुद्धि',
  },
  tibetan: {
    children: [
      mahavairocanaSarvadurgatiParisodhana.tibetan.children,
      aksobhya.tibetan.children,
      usnisaVijaya.tibetan.children,
      vimalaUsnisa.tibetan.children,
      amoghapasaPadmaUsnisa.tibetan.children,
    ],
    repeat: {
      roll: 8,
    },
    title: 'དག་པ་ཆེན་སྡེ་ལྔ',
  },
  transliteration: {
    children: [
      mahavairocanaSarvadurgatiParisodhana.transliteration.children,
      aksobhya.transliteration.children,
      usnisaVijaya.transliteration.children,
      vimalaUsnisa.transliteration.children,
      amoghapasaPadmaUsnisa.transliteration.children,
    ],
    speech: [
      mahavairocanaSarvadurgatiParisodhana.transliteration.speech,
      aksobhya.transliteration.speech,
      usnisaVijaya.transliteration.speech,
      vimalaUsnisa.transliteration.speech,
      amoghapasaPadmaUsnisa.transliteration.speech,
    ].join(', '),
    // The Five Great Purifications.
    title: 'Pañca Mahā Śuddhi',
  },
};
