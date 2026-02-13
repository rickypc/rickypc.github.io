/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import aksobhya from './_aksobhya';
import amoghapasaPadmaUsnisa from './_amoghapasa_padma_usnisa';
import mahavairocanaSarvadurgatiParisodhana from './_mahavairocana_sarvadurgati_parisodhana';
import usnisaVijaya from './_usnisa_vijaya';
import vimalaUsnisa from './_vimala_usnisa';

export default {
  path: import.meta.url,
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
      condensed: 23,
      roll: 8,
      wheel: 7,
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
    // The Five Great Purifications.
    title: 'Pañca Mahā Śuddhi',
  },
};
