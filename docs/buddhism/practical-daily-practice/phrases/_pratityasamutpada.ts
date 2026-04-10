/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

const core = {
  chinese: {
    children: [
      '耶 達摩 訶圖缽婆婆 訶敦 提舍 達多伽多 烏嚩左',
      '提舍拶 友 尼囉陀 伊縛婆提 摩訶沙門那',
    ].join(' · '),
  },
  pali: {
    children: [
      'ye dhammā hetuppabhavā hetuṁ tesaṁ tathāgato uvāca',
      'tesañ-ca yo nirodho evaṁvādī mahāsamaṇo',
    ].join(' । '),
    sinhala: {
      children: [
        'යේ ධර්මා හේතුප්‍රභවා හේතුං තේෂාං තථාගත උවාච',
        'තේෂාංච යෝ නිරෝධ ඒවංවාදී මහාශ්‍රමණඃ',
      ].join(' . '),
    },
  },
  sanskrit: {
    children: [
      'ये धर्मा हेतुप्रभवा हेतुं तेषां तथागत उवाच',
      'तेषांच यो निरोध एवंवादी महाश्रमणः',
    ].join(' । '),
    siddham: {
      children: [
        '𑖧𑖸 𑖠𑖨𑖿𑖦𑖯 𑖮𑖸𑖝𑖲𑖢𑖿𑖨𑖥𑖪𑖯 𑖮𑖸𑖝𑖲𑖽 𑖝𑖸𑖬𑖯𑖽 𑖝𑖞𑖯𑖐𑖝 𑖄𑖪𑖯𑖓',
        '𑖝𑖸𑖬𑖯𑖽𑖓 𑖧𑖺 𑖡𑖰𑖨𑖺𑖠 𑖊𑖪𑖽𑖪𑖯𑖟𑖱 𑖦𑖮𑖯𑖫𑖿𑖨𑖦𑖜𑖾',
      ].join(' 𑗂 '),
    },
  },
  tibetan: {
    children: [
      'ཡེ་དྷ་རྨཱ་ཧེ་ཏུ་པྲ་བྷ་བཱ་ཧེ་ཏུཾ་ཏེ་ཥཱཾ་ཏ་ཐཱ་ག་ཏ་ཨུ་བཱ་ཙ',
      'ཏེ་ཥཱཾ་ཙ་ཡོ་ནི་རོ་དྷ་ཨེ་བཾ་བཱ་དཱི་མ་ཧཱ་ཤྲ་མ་ཎཿ',
    ].join('། '),
  },
  transliteration: {
    // https://84000.co/translation/toh1-4/UT22084-001-004-section-3#UT22084-001-004-436
    children: [
      'ye dharmā hetuprabhavā hetuṃ teṣāṃ tathāgata uvāca',
      'teṣāṃ-ca yo nirodha evaṃvādi mahāśramaṇaḥ',
    ].join(' । '),
  },
};

export default {
  chinese: {
    children: core.chinese.children,
    title: '緣起經',
  },
  core,
  pali: {
    children: [
      core.pali.children,
      'aññāṇaṁ cīyate kammaṁ jananaṁ kammakāraṇaṁ',
      'ñāṇaṁ na cīyate kammaṁ kammābhāvaṁ na jāyate',
    ].join(' । '),
    sinhala: {
      children: [
        core.pali.sinhala.children,
        'අඥානාච්චීයතේ කර්ම ජන්මනඃ කර්ම කාරණම්',
        'ඥානාන්නචීයතේ කර්ම කර්මාභාවාන්න ජායතේ',
      ].join(' . '),
      title: 'පටිච්චසමුප්පාද ගාථා',
    },
    title: 'Paṭiccasamuppāda Gāthā',
  },
  path: import.meta.url,
  sanskrit: {
    children: [
      core.sanskrit.children,
      'अज्ञानाच्चीयते कर्म जन्मनः कर्म कारणम्',
      'ज्ञानान्नचीयते कर्म कर्माभावान्न जायते',
    ].join(' । '),
    siddham: {
      children: [
        core.sanskrit.siddham.children,
        '𑖀𑖕𑖿𑖗𑖯𑖡𑖯𑖓𑖿𑖓𑖱𑖧𑖝𑖸 𑖎𑖨𑖿𑖦 𑖕𑖡𑖿𑖦𑖡𑖾 𑖎𑖨𑖿𑖦 𑖎𑖯𑖨𑖜𑖦𑖿',
        '𑖕𑖿𑖗𑖯𑖡𑖯𑖡𑖿𑖡𑖓𑖱𑖧𑖝𑖸 𑖎𑖨𑖿𑖦 𑖎𑖨𑖿𑖦𑖯𑖥𑖯𑖪𑖯𑖡𑖿𑖡 𑖕𑖯𑖧𑖝𑖸',
      ].join(' 𑗂 '),
      title: '𑖢𑖿𑖨𑖝𑖱𑖝𑖿𑖧𑖭𑖦𑖲𑖝𑖿𑖢𑖯𑖟 𑖐𑖯𑖞𑖯',
    },
    title: 'प्रतीत्यसमुत्पाद गाथा',
  },
  tibetan: {
    children: core.tibetan.children,
    repeat: { condensed: 129, roll: 46, wheel: 44 },
    title: 'རྟེན་ཅིང་འབྲེལ་བར་འབྱུང་བའི་ཚིགས་སུ་བཅད་པ།',
  },
  translation: {
    title: 'Dependent Origination',
  },
  transliteration: {
    // https://hasp.ub.uni-heidelberg.de/catalog/view/788/1479/93430
    // https://biblioasia.nlb.gov.sg/all-sections/vol-16-issue-3-oct-dec-2020-borobudur/
    children: [
      core.transliteration.children,
      'ajñānāc cīyate karma janmanaḥ karma kāraṇam',
      'jñānān na cīyate karma karmābhāvān na jāyate',
    ].join(' । '),
    repetition: 7,
    title: 'Pratītyasamutpāda Gāthā',
  },
};
