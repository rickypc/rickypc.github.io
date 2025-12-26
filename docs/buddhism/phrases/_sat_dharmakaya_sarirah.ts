/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import bodhiGarbhalamkaraLaksa from './_bodhi_garbhalamkara_laksa';
import guhyadhatuKaranda from './_guhyadhatu_karanda';
import pratityasamutpada from './_pratityasamutpada';
import rasmiVimalaDharani from './_rasmi_vimala_dharani';
import rasmiVimalaHrdaya from './_rasmi_vimala_hrdaya';
import usnisaVijaya from './_usnisa_vijaya';
import vimalaUsnisa from './_vimala_usnisa';

export default {
  chinese: {
    title: '六部大陀羅尼',
  },
  path: import.meta.url,
  sanskrit: {
    children: [
      usnisaVijaya.sanskrit.children,
      vimalaUsnisa.sanskrit.children,
      guhyadhatuKaranda.sanskrit.children,
      bodhiGarbhalamkaraLaksa.sanskrit.children,
      pratityasamutpada.core.sanskrit.children,
      [rasmiVimalaDharani.sanskrit.children, rasmiVimalaHrdaya.sanskrit.children].join(' । '),
    ],
    siddham: {
      children: [
        usnisaVijaya.sanskrit.siddham.children,
        vimalaUsnisa.sanskrit.siddham.children,
        guhyadhatuKaranda.sanskrit.siddham.children,
        bodhiGarbhalamkaraLaksa.sanskrit.siddham.children,
        pratityasamutpada.core.sanskrit.siddham.children,
        [rasmiVimalaDharani.sanskrit.siddham.children, rasmiVimalaHrdaya.sanskrit.siddham.children].join(' 𑗂 '),
      ],
      title: '𑖬𑖘𑖿 𑖠𑖨𑖿𑖦𑖎𑖯𑖧 𑖫𑖨𑖱𑖨𑖯𑖾',
    },
    title: 'षट् धर्मकाय शरीराः',
  },
  tibetan: {
    children: [
      usnisaVijaya.tibetan.children,
      vimalaUsnisa.tibetan.children,
      guhyadhatuKaranda.tibetan.children,
      bodhiGarbhalamkaraLaksa.tibetan.children,
      pratityasamutpada.core.tibetan.children,
      [rasmiVimalaDharani.tibetan.children, rasmiVimalaHrdaya.tibetan.children].join('། '),
    ],
    repeat: {
      condensed: 6,
      roll: 2,
      wheel: 2,
    },
    title: 'ཆོས་སྐུ་རིང་བསྲེལ་དྲུག',
    typography: {
      condensed: { default: 1.875, title: 1.7 },
      wheel: { default: 5.8, title: 4 },
    },
  },
  transliteration: {
    children: [
      usnisaVijaya.transliteration.children,
      vimalaUsnisa.transliteration.children,
      guhyadhatuKaranda.transliteration.children,
      bodhiGarbhalamkaraLaksa.transliteration.children,
      pratityasamutpada.core.transliteration.children,
      [rasmiVimalaDharani.transliteration.children, rasmiVimalaHrdaya.transliteration.children].join(' । '),
    ],
    speech: [
      usnisaVijaya.transliteration.speech,
      vimalaUsnisa.transliteration.speech,
      guhyadhatuKaranda.transliteration.speech,
      bodhiGarbhalamkaraLaksa.transliteration.speech,
      pratityasamutpada.core.transliteration.speech,
      [rasmiVimalaDharani.transliteration.speech, rasmiVimalaHrdaya.transliteration.speech].join(', '),
    ].join(', '),
    // The Six Dharmakāya Relics.
    title: 'Ṣáṭ Dharmakāya Śarīrāḥ',
  },
};
