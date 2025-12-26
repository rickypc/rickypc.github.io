/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import aksobhya from './_aksobhya';
import amoghapasaPadmaUsnisa from './_amoghapasa_padma_usnisa';
import avalokitesvara from './_avalokitesvara';
import bhaisajyaguru from './_bhaisajyaguru';
import ekadasaMukhaLokesvara from './_ekadasamukhalokesvara';
import mahavairocanaSarvadurgatiParisodhana from './_mahavairocana_sarvadurgati_parisodhana';
import milarepa from './_milarepa';
import rasmiVimalaDharani from './_rasmi_vimala_dharani';
import rasmiVimalaHrdaya from './_rasmi_vimala_hrdaya';
import usnisaVijaya from './_usnisa_vijaya';
import vimalaUsnisa from './_vimala_usnisa';

export default {
  sanskrit: {
    children: [
      [ekadasaMukhaLokesvara.sanskrit.children, avalokitesvara.sanskrit.children].join(' । '),
      [usnisaVijaya.sanskrit.children, 'ॐ अमृते । अमृत उद्भवे । अमृत विक्रान्ते । अमृत गात्रे । अमृत गामिने । अमृत आयुर्ददे । गगन कृतिकरे । सर्व क्लेश क्षयंकरीये स्वाहा'].join(' । '),
      milarepa.sanskrit.children,
      mahavairocanaSarvadurgatiParisodhana.sanskrit.children,
      bhaisajyaguru.sanskrit.children,
      rasmiVimalaDharani.sanskrit.children,
      rasmiVimalaHrdaya.sanskrit.children,
      vimalaUsnisa.sanskrit.children,
      amoghapasaPadmaUsnisa.sanskrit.children,
      aksobhya.sanskrit.children,
    ],
    title: 'दश अत्यय मन्त्राः',
  },
  tibetan: {
    children: [
      [ekadasaMukhaLokesvara.tibetan.children, avalokitesvara.tibetan.children].join('། '),
      [usnisaVijaya.tibetan.children, 'ༀ་ཨ་མྲྀ་ཏེ། ཨ་མྲྀ་ཏ་ཨུ་དྦྷ་བེ། ཨ་མྲྀ་ཏ་བི་ཀྲཱ་ནྟེ། ཨ་མྲྀ་ཏ་གཱ་ཏྲེ། ཨ་མྲྀ་ཏ་གཱ་མི་ནེ། ཨ་མྲྀ་ཏ་ཨཱ་ཡུ་རྡ་དེ། ག་ག་ན་ཀྲྀ་ཏི་ཀ་རེ། སརྦ་ཀླེ་ཤ་ཀྵ་ཡཾ་ཀ་རཱི་ཡེ་སྭཱ་ཧཱ'].join('། '),
      milarepa.tibetan.children,
      mahavairocanaSarvadurgatiParisodhana.tibetan.children,
      bhaisajyaguru.tibetan.children,
      rasmiVimalaDharani.tibetan.children,
      rasmiVimalaHrdaya.tibetan.children,
      vimalaUsnisa.tibetan.children,
      amoghapasaPadmaUsnisa.tibetan.children,
      aksobhya.tibetan.children,
    ],
    title: 'སྔགས་འདའ་ཀ་བཅུ',
  },
  transliteration: {
    children: [
      [ekadasaMukhaLokesvara.transliteration.children, avalokitesvara.transliteration.children].join(' । '),
      [usnisaVijaya.transliteration.children, 'oṃ amṛte । amṛta udbhave । amṛta vikrānte । amṛta gātre । amṛta gāmine । amṛta āyurdade । gagana kṛtikare । sarva kleśa kṣayaṃkarīye svāhā'].join(' । '),
      milarepa.transliteration.children,
      mahavairocanaSarvadurgatiParisodhana.transliteration.children,
      bhaisajyaguru.transliteration.children,
      rasmiVimalaDharani.transliteration.children,
      rasmiVimalaHrdaya.transliteration.children,
      vimalaUsnisa.transliteration.children,
      amoghapasaPadmaUsnisa.transliteration.children,
      aksobhya.transliteration.children,
    ],
    speech: [
      [ekadasaMukhaLokesvara.transliteration.speech, avalokitesvara.transliteration.speech].join(', '),
      [usnisaVijaya.transliteration.speech, 'oum amrite, amrita udbawe, amrita wi-krante, amrita gatre, amrita gamine, amrita ayurdade, gagana kirtikare, sarwa klesa kesayamkare swaha'].join(', '),
      milarepa.transliteration.speech,
      mahavairocanaSarvadurgatiParisodhana.transliteration.speech,
      bhaisajyaguru.transliteration.speech,
      rasmiVimalaDharani.transliteration.speech,
      rasmiVimalaHrdaya.transliteration.speech,
      vimalaUsnisa.transliteration.speech,
      amoghapasaPadmaUsnisa.transliteration.speech,
      aksobhya.transliteration.speech,
    ].join(', '),
    // The Ten Mantras for the Dead.
    title: 'Daśa Atyaya Mantrāḥ',
  },
};
