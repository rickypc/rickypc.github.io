/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable import/extensions */
import guhyadhatuKaranda from './_guhyadhatu_karanda.js';
import pratityasamutpada from './_pratityasamutpada.js';
import rasmiVimalaDharani from './_rasmi_vimala_dharani.js';
import rasmiVimalaHrdaya from './_rasmi_vimala_hrdaya.js';
import usnisaVijaya from './_usnisa_vijaya.js';
import vimalaUsnisa from './_vimala_usnisa.js';

export default {
  chinese: {
    title: '六部大陀羅尼',
  },
  path: new URL('', import.meta.url).pathname,
  sanskrit: {
    children: [
      usnisaVijaya.sanskrit.children,
      vimalaUsnisa.sanskrit.children,
      guhyadhatuKaranda.sanskrit.children,
      'बोधि बोधि । बोधनी बोधनी । सर्वतथागता गोचरी । धर धर । हर हर । प्रहर प्रहर । महा बोधिचित्त धारे । चुलु चुलु । शत रश्मि सञ्चोदिते । सर्व ­तथागताभिषिक्ते । गुणी गुणपाते । सर्व बुद्धा गुणावभासे । मिल् मिल् । गगनतले । सर्व ­तथागताधिष्ठिते । नभस्तले । शमे शमे । प्रशमे प्रशमे । सर्व पापं प्रशमे । सर्व पापं विशोधने । हुलु हुलु । महाबोधि मार्ग सम्प्रतिष्ठिते । सर्वतथागता­ सुप्रतिष्ठिते शुद्धे स्वाहा । ॐ सर्वतथागता व्यवलोकिते । जय जय स्वाहा । ॐ धुरु धुरु जयामुखे स्वाहा । ॐ वज्रायुषे स्वाहा',
      pratityasamutpada.core.sanskrit.children,
      [rasmiVimalaDharani.sanskrit.children, rasmiVimalaHrdaya.sanskrit.children].join(' । '),
    ],
    siddham: {
      children: [
        usnisaVijaya.sanskrit.siddham.children,
        vimalaUsnisa.sanskrit.siddham.children,
        guhyadhatuKaranda.sanskrit.siddham.children,
        '𑖤𑖺𑖠𑖰 𑖤𑖺𑖠𑖰 𑗂 𑖤𑖺𑖠𑖡𑖱 𑖤𑖺𑖠𑖡𑖱 𑗂 𑖭𑖨𑖿𑖪𑖝𑖞𑖯𑖐𑖝𑖯 𑖐𑖺𑖓𑖨𑖱 𑗂 𑖠𑖨 𑖠𑖨 𑗂 𑖮𑖨 𑖮𑖨 𑗂 𑖢𑖿𑖨𑖮𑖨 𑖢𑖿𑖨𑖮𑖨 𑗂 𑖦𑖮𑖯 𑖤𑖺𑖠𑖰𑖓𑖰𑖝𑖿𑖝 𑖠𑖯𑖨𑖸 𑗂 𑖓𑖲𑖩𑖲 𑖓𑖲𑖩𑖲 𑗂 𑖫𑖝 𑖨𑖫𑖿𑖦𑖰 𑖭𑖗𑖿𑖓𑖺𑖟𑖰𑖝𑖸 𑗂 𑖭𑖨𑖿𑖪 ­𑖝𑖞𑖯𑖐𑖝𑖯𑖥𑖰𑖬𑖰𑖎𑖿𑖝𑖸 𑗂 𑖐𑖲𑖜𑖱 𑖐𑖲𑖜𑖢𑖯𑖝𑖸 𑗂 𑖭𑖨𑖿𑖪 𑖤𑖲𑖟𑖿𑖠𑖯 𑖐𑖲𑖜𑖯𑖪𑖥𑖯𑖭𑖸 𑗂 𑖦𑖰𑖩𑖿 𑖦𑖰𑖩𑖿 𑗂 𑖐𑖐𑖡𑖝𑖩𑖸 𑗂 𑖭𑖨𑖿𑖪 ­𑖝𑖞𑖯𑖐𑖝𑖯𑖠𑖰𑖬𑖿𑖙𑖰𑖝𑖸 𑗂 𑖡𑖥𑖭𑖿𑖝𑖩𑖸 𑗂 𑖫𑖦𑖸 𑖫𑖦𑖸 𑗂 𑖢𑖿𑖨𑖫𑖦𑖸 𑖢𑖿𑖨𑖫𑖦𑖸 𑗂 𑖭𑖨𑖿𑖪 𑖢𑖯𑖢𑖽 𑖢𑖿𑖨𑖫𑖦𑖸 𑗂 𑖭𑖨𑖿𑖪 𑖢𑖯𑖢𑖽 𑖪𑖰𑖫𑖺𑖠𑖡𑖸 𑗂 𑖮𑖲𑖩𑖲 𑖮𑖲𑖩𑖲 𑗂 𑖦𑖮𑖯𑖤𑖺𑖠𑖰 𑖦𑖯𑖨𑖿𑖐 𑖭𑖦𑖿𑖢𑖿𑖨𑖝𑖰𑖬𑖿𑖙𑖰𑖝𑖸 𑗂 𑖭𑖨𑖿𑖪𑖝𑖞𑖯𑖐𑖝𑖯­ 𑖭𑖲𑖢𑖿𑖨𑖝𑖰𑖬𑖿𑖙𑖰𑖝𑖸 𑖫𑖲𑖟𑖿𑖠𑖸 𑖭𑖿𑖪𑖯𑖮𑖯 𑗂 𑖌𑖼 𑖭𑖨𑖿𑖪𑖝𑖞𑖯𑖐𑖝𑖯 𑖪𑖿𑖧𑖪𑖩𑖺𑖎𑖰𑖝𑖸 𑗂 𑖕𑖧 𑖕𑖧 𑖭𑖿𑖪𑖯𑖮𑖯 𑗂 𑖌𑖼 𑖠𑖲𑖨𑖲 𑖠𑖲𑖨𑖲 𑖕𑖧𑖯𑖦𑖲𑖏𑖸 𑖭𑖿𑖪𑖯𑖮𑖯 𑗂 𑖌𑖼 𑖪𑖕𑖿𑖨𑖯𑖧𑖲𑖬𑖸 𑖭𑖿𑖪𑖯𑖮𑖯',
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
      'བོ་དྷི་བོ་དྷི། བོ་དྷ་ནཱི་བོ་དྷ་ནཱི། སརྦ་ཏ་ཐཱ་ག་ཏཱ་གོ་ཙ་རཱི། དྷ་ར་དྷ་ར། ཧ་ར་ཧ་ར། པྲ་ཧ་ར་པྲ་ཧ་ར། མ་ཧཱ་བོ་དྷི་ཙི་ཏྟ་དྷཱ་རེ། ཙུ་ལུ་ཙུ་ལུ། ཤ་ཏ་ར་ཤྨི་ས་ཉྩོ་དི་ཏེ། སརྦ་­ཏ་ཐཱ་ག་ཏཱ་བྷི་ཥི་ཀྟེ། གུ་ཎཱི་གུ་ཎ་པཱ་ཏེ། སརྦ་བུ་དྡྷཱ་གུ་ཎཱ་བ་བྷཱ་སེ། མི་ལ་མི་ལ། ག་ག་ན་ཏ་ལེ། སརྦ་­ཏ་ཐཱ་ག་ཏཱ་དྷི་ཥྛི་ཏེ། ན་བྷ་སྟ་ལེ། ཤ་མེ་ཤ་མེ། པྲ་ཤ་མེ་པྲ་ཤ་མེ། སརྦ་པཱ་པཾ་པྲ་ཤ་མེ། སརྦ་པཱ་པཾ་བི་ཤོ་དྷ་ནེ། ཧུ་ལུ་ཧུ་ལུ། མ་ཧཱ་བོ་དྷི་མཱ་རྒ་ས་མྤྲ་ཏི་ཥྛི་ཏེ། སརྦ་ཏ་ཐཱ་ག་ཏཱ­་སུ་པྲ་ཏི་ཥྛི་ཏེ་ཤུ་དྡྷེ་སྭཱ་ཧཱ། ༀ་སརྦ་ཏ་ཐཱ་ག་ཏཱ་བྱ་བ་ལོ་ཀི་ཏེ། ཛ་ཡ་ཛ་ཡ་སྭཱ་ཧཱ། ༀ་དྷུ་རུ་དྷུ་རུ་ཛ་ཡཱ་མུ་ཁེ་སྭཱ་ཧཱ། ༀ་བ་ཛྲཱ་ཡུ་ཥེ་སྭཱ་ཧཱ',
      pratityasamutpada.core.tibetan.children,
      [rasmiVimalaDharani.tibetan.children, rasmiVimalaHrdaya.tibetan.children].join('། '),
    ],
    repeat: {
      roll: 2,
    },
    title: 'ཆོས་སྐུ་རིང་བསྲེལ་དྲུག',
  },
  transliteration: {
    children: [
      usnisaVijaya.transliteration.children,
      vimalaUsnisa.transliteration.children,
      guhyadhatuKaranda.transliteration.children,
      'bodhi bodhi । bodhanī bodhanī । sarva tathāgata gocarī । dhara dhara । hara hara । prahara prahara । mahā bodhicitta dhāre । culu culu । śata raśmi sañcodite । sarva tathāgatābhiṣikte । guṇī guṇapate । sarva buddha guṇāvabhāse । mili mili । gaganatale । sarva tathāgatādhiṣṭhite । nabhasthale । śame śame । praśame praśame । sarva pāpam praśame । sarva pāpaṃ viśodhane । hulu hulu । mahābodhi mārga sampratiṣṭhite । sarva tathāgata supratiṣṭhite śuddhe svāhā । oṃ sarva tathāgata vyavalokite । jaya jaya svāhā । oṃ dhuru dhuru jayamukhe svāhā । oṃ vajrāyuṣe svāhā',
      pratityasamutpada.core.transliteration.children,
      [rasmiVimalaDharani.transliteration.children, rasmiVimalaHrdaya.transliteration.children].join(' । '),
    ],
    speech: [
      usnisaVijaya.transliteration.speech,
      vimalaUsnisa.transliteration.speech,
      guhyadhatuKaranda.transliteration.speech,
      'bodhi bodhi, bodhani bodhani, sarwa tathagata gocari, dhara dhara, hara hara, prahara prahara, maha bodhicitta dhare, culu culu, sata rasmi sanncodite, sarwa tathagatabisikte, guni gunapate, sarwa buddha gunawabase, mili mili, gaganatale, sarwa tathagatadhisthite, nabasthale, sa-mei sa-mei prasame prasame, sarwa papam prasame, sarwa papam wisodhane, hulu hulu, mahabodhi marga sampratisthite, sarwa tathagata supratisthite suddhe swaha, oum sarwa tathagata wyawalokite, jaya jaya swaha, oum dhuru dhuru jayamukhe swaha, oum wajrayuse swaha',
      pratityasamutpada.core.transliteration.speech,
      [rasmiVimalaDharani.transliteration.speech, rasmiVimalaHrdaya.transliteration.speech].join(', '),
    ].join(', '),
    // The Six Dharmakāya Relics.
    title: 'Ṣáṭ Dharmakāya Śarīrāḥ',
  },
};
