/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

const core = {
  pali: {
    children: 'ye dhammā hetuppabhavā hetuṁ tesaṁ tathāgato uvāca । tesañ-ca yo nirodho evaṁvādī mahāsamaṇo',
    sinhala: {
      children: 'යේ ධර්මා හේතුප්‍රභවා හේතුං තේෂාං තථාගත උවාච . තේෂාංච යෝ නිරෝධ ඒවංවාදී මහාශ්‍රමණඃ',
    },
  },
  sanskrit: {
    children: 'ये धर्मा हेतुप्रभवा हेतुं तेषां तथागत उवाच । तेषांच यो निरोध एवंवादी महाश्रमणः',
    siddham: {
      children: '𑖧𑖸 𑖠𑖨𑖿𑖦𑖯 𑖮𑖸𑖝𑖲𑖢𑖿𑖨𑖥𑖪𑖯 𑖮𑖸𑖝𑖲𑖽 𑖝𑖸𑖬𑖯𑖽 𑖝𑖞𑖯𑖐𑖝 𑖄𑖪𑖯𑖓 𑗂 𑖝𑖸𑖬𑖯𑖽𑖓 𑖧𑖺 𑖡𑖰𑖨𑖺𑖠 𑖊𑖪𑖽𑖪𑖯𑖟𑖱 𑖦𑖮𑖯𑖫𑖿𑖨𑖦𑖜𑖾',
    },
  },
  tibetan: {
    children: 'ཡེ་དྷ་རྨཱ་ཧེ་ཏུ་པྲ་བྷ་བཱ་ཧེ་ཏུཾ་ཏེ་ཥཱཾ་ཏ་ཐཱ་ག་ཏ་ཨུ་བཱ་ཙ། ཏེ་ཥཱཾ་ཙ་ཡོ་ནི་རོ་དྷ་ཨེ་བཾ་བཱ་དཱི་མ་ཧཱ་ཤྲ་མ་ཎཿ',
  },
  transliteration: {
    children: 'ye dharmā hetuprabhavā hetuṃ teṣāṃ tathāgata uvāca । teṣāṃ-ca yo nirodha evaṃvādi mahāśramaṇaḥ',
    speech: 'y dharma hei-tu-prabawa, hei-tum t-samm tathagata uwaca, t-samm-ca yo nirodha, ewamwadi mahasramanah',
  },
};

export default {
  chinese: {
    title: '緣起經',
  },
  core,
  pali: {
    children: [core.pali.children, 'aññāṇaṁ cīyate kammaṁ jananaṁ kammakāraṇaṁ । ñāṇaṁ na cīyate kammaṁ kammābhāvaṁ na jāyate'].join(' । '),
    sinhala: {
      children: [core.pali.sinhala.children, 'අඥානාච්චීයතේ කර්ම ජන්මනඃ කර්ම කාරණම් . ඥානාන්නචීයතේ කර්ම කර්මාභාවාන්න ජායතේ'].join(' . '),
      title: 'පටිච්චසමුප්පාද ගාථා',
    },
    title: 'Paṭiccasamuppāda Gāthā',
  },
  path: import.meta.url,
  sanskrit: {
    children: [core.sanskrit.children, 'अज्ञानाच्चीयते कर्म जन्मनः कर्म कारणम् । ज्ञानान्नचीयते कर्म कर्माभावान्न जायते'].join(' । '),
    siddham: {
      children: [core.sanskrit.siddham.children, '𑖀𑖕𑖿𑖗𑖯𑖡𑖯𑖓𑖿𑖓𑖱𑖧𑖝𑖸 𑖎𑖨𑖿𑖦 𑖕𑖡𑖿𑖦𑖡𑖾 𑖎𑖨𑖿𑖦 𑖎𑖯𑖨𑖜𑖦𑖿 𑗂 𑖕𑖿𑖗𑖯𑖡𑖯𑖡𑖿𑖡𑖓𑖱𑖧𑖝𑖸 𑖎𑖨𑖿𑖦 𑖎𑖨𑖿𑖦𑖯𑖥𑖯𑖪𑖯𑖡𑖿𑖡 𑖕𑖯𑖧𑖝𑖸'].join(' 𑗂 '),
      title: '𑖢𑖿𑖨𑖝𑖱𑖝𑖿𑖧𑖭𑖦𑖲𑖝𑖿𑖢𑖯𑖟 𑖐𑖯𑖞𑖯',
    },
    title: 'प्रतीत्यसमुत्पाद गाथा',
  },
  tibetan: {
    children: core.tibetan.children,
    repeat: {
      condensed: 129,
      roll: 46,
      wheel: 44,
    },
    title: 'རྟེན་ཅིང་འབྲེལ་བར་འབྱུང་བའི་ཚིགས་སུ་བཅད་པ།',
  },
  translation: {
    title: 'Dependent Origination',
  },
  transliteration: {
    children: [core.transliteration.children, 'ajñānāc cīyate karma janmanaḥ karma kāraṇam । jñānān na cīyate karma karmābhāvān na jāyate'].join(' । '),
    repetition: 7,
    speech: [core.transliteration.speech, 'ajnanac ciya-t karma, jan-manah karma karanam, jnanan na ciya-t karma, karmabawan na jayate'].join(', '),
    title: 'Pratītyasamutpāda Gāthā',
  },
};
