/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable import/extensions */
import darsanaMukta from './_darsana_mukta.js';

const core = {
  sanskrit: {
    children: 'ॐ विपुलगर्भे मणिप्रभे तथागतनिदर्शने । मणि मणि सुप्रभे विमले सागर गंभीरे हूं हूं ज्वल ज्वल । बुद्धविलोकिते गुह्याधिष्ठित गर्भे स्वाहा । पद्मधर अमोघ जायते चुरुचुरु स्वाहा । ॐ मणिवज्रे हूँ । ॐ मणिधरे हूँ फट् । ॐ मणिपद्मे हूँ ह्रीः अरपचमित हृदय स्वाहा',
  },
  tibetan: {
    children: 'ༀ་བི་པུ་ལ་ག་རྦྷེ་མ་ཎི་པྲ་བྷེ་ཏ་ཐཱ་ག་ཏ་ནི་ད་རྴ་ནེ། མ་ཎི་མ་ཎི་སུ་པྲ་བྷེ་བི་མ་ལེ་སཱ་ག་ར་གཾ་བྷཱི་རེ་ཧཱུཾ་ཧཱུཾ་ཛྭ་ལ་ཛྭ་ལ། བུ་དྡྷ་བི་ལོ་ཀི་ཏེ་གུ་ཧྱཱ་དྷི་ཥྛི་ཏ་ག་རྦྷེ་སྭཱ་ཧཱ། པ་དྨ་དྷ་ར་ཨ་མོ་གྷ་ཛཱ་ཡ་ཏེ་ཙུ་རུ་ཙུ་རུ་སྭཱ་ཧཱ། ༀ་མ་ཎི་བ་ཛྲེ་ཧཱུྃ། ༀ་མ་ཎི་དྷ་རེ་ཧཱུྃ་ཕ་ཊ། ༀ་མ་ཎི་པ་དྨེ་ཧཱུྃ་ཧྲཱིཿཨ་ར་པ་ཙ་མི་ཏ་ཧྲྀ་ད་ཡ་སྭཱ་ཧཱ',
  },
  transliteration: {
    children: 'oṃ vipulagarbhe maṇiprabhe tathāgatanidarśane । maṇi maṇi suprabhe vimale sāgara gambhīre hūṃ hūṃ jvāla jvāla । buddhāvilokite guhyādhiṣṭita garbhe svāhā । padmadhara amogha jayate curu curu svāhā । oṃ maṇivajre hūṃ । oṃ maṇidhare hūṃ phaṭ । oṃ maṇipadme hūṃ hrīḥ arapacamita hṛdaya svāhā',
    speech: 'oum wipula garbe, mani prabe, tathagata nidarsane, mani mani suprabe, wimale sagara gambire, houm houm, jwala jwala, buddha-wilokite guh-ya-dhistita garbe swaha, padma-dara amoga jayate, curu curu swaha, oum mani-wajre houm, oum mani-dare houm patt, oum mani-padme houm hrih, arapacamita hridaya swaha',
  },
};

export default {
  core,
  path: import.meta.url,
  sanskrit: {
    children: [core.sanskrit.children, darsanaMukta.sanskrit.children].join(' । '),
    title: 'महामणि विपुलविमान',
  },
  tibetan: {
    children: [core.tibetan.children, darsanaMukta.tibetan.children].join('། '),
    repeat: {
      condensed: 39,
      roll: 14,
      wheel: 13,
    },
    title: 'ནོར་བུ་ཆེན་པོ་རྒྱས་པའི་གཞལ་མེད་ཁང',
  },
  translation: {
    title: 'Great Jewel Celestial Palace',
  },
  transliteration: {
    children: [core.transliteration.children, darsanaMukta.transliteration.children].join(' । '),
    repetition: 3,
    speech: [core.transliteration.speech, darsanaMukta.transliteration.speech].join(', '),
    title: 'Mahāmaṇi Vipulavimāna',
  },
};
