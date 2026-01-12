/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import aksobhya from './_aksobhya';
import amitabha from './_amitabha';
import amoghapasaPadmaUsnisa from './_amoghapasa_padma_usnisa';
import avalokitesvara from './_avalokitesvara';
import bhaisajyaguru from './_bhaisajyaguru';
import darsanaMukta from './_darsana_mukta';
import mahamaniVipulavimana from './_mahamani_vipulavimana';
import ratnasikhin from './_ratnasikhin';
import sadjaMukta from './_sadja_mukta';
import usnisaVijaya from './_usnisa_vijaya';

export default {
  path: import.meta.url,
  sanskrit: {
    children: [
      amoghapasaPadmaUsnisa.sanskrit.children,
      darsanaMukta.sanskrit.children,
      sadjaMukta.sanskrit.children,
      mahamaniVipulavimana.core.sanskrit.children,
      aksobhya.sanskrit.children,
      ratnasikhin.sanskrit.children,
      bhaisajyaguru.sanskrit.children,
      usnisaVijaya.sanskrit.children,
      avalokitesvara.sanskrit.children,
      amitabha.sanskrit.children,
    ],
    title: 'दश मुक्त र्मन्त्राः',
  },
  tibetan: {
    children: [
      amoghapasaPadmaUsnisa.tibetan.children,
      darsanaMukta.tibetan.children,
      sadjaMukta.tibetan.children,
      mahamaniVipulavimana.core.tibetan.children,
      aksobhya.tibetan.children,
      ratnasikhin.tibetan.children,
      bhaisajyaguru.tibetan.children,
      usnisaVijaya.tibetan.children,
      avalokitesvara.tibetan.children,
      amitabha.tibetan.children,
    ],
    repeat: {
      condensed: 17,
      roll: 6,
      wheel: 6,
    },
    title: 'སྔགས་ཐར་པ་བཅུ',
  },
  transliteration: {
    children: [
      amoghapasaPadmaUsnisa.transliteration.children,
      darsanaMukta.transliteration.children,
      sadjaMukta.transliteration.children,
      mahamaniVipulavimana.core.transliteration.children,
      aksobhya.transliteration.children,
      ratnasikhin.transliteration.children,
      bhaisajyaguru.transliteration.children,
      usnisaVijaya.transliteration.children,
      avalokitesvara.transliteration.children,
      amitabha.transliteration.children,
    ],
    speech: [
      amoghapasaPadmaUsnisa.transliteration.speech,
      darsanaMukta.transliteration.speech,
      sadjaMukta.transliteration.speech,
      mahamaniVipulavimana.core.transliteration.speech,
      aksobhya.transliteration.speech,
      ratnasikhin.transliteration.speech,
      bhaisajyaguru.transliteration.speech,
      usnisaVijaya.transliteration.speech,
      avalokitesvara.transliteration.speech,
      amitabha.transliteration.speech,
    ].join(', '),
    // The Ten Liberation Mantras.
    title: 'Daśa Mukta Mantrāḥ',
  },
};
