/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export default {
  chinese: {
    // https://zh.wikisource.org/zh-hant/%E5%8D%81%E4%B8%80%E9%9D%A2%E8%A7%80%E9%9F%B3%E9%99%80%E7%BE%85%E5%B0%BC#%E5%94%90%E7%8E%84%E5%A5%98%E7%89%88
    children: '唵 達囉 達囉 · 地履 地履 · 杜嚕 杜嚕 · 壹𪘨 伐𪘨 · 折隷 折隷 · 鉢囉折隷 鉢囉折隷 · 俱蘇謎 俱蘇摩伐隷 · 壹履 弭履 止履 · 止徵 社摩波隷耶 · 波羅摩 戍陀薩埵 莫訶 迦嚧尼迦 莎訶',
    title: '十一面观音陀罗尼',
  },
  path: import.meta.url,
  sanskrit: {
    // https://www.dsbcproject.org/canon-text/content/385/1773
    children: 'ॐ धर धर । धिरि धिरि । धुरु धुरु । इट्टे विट्टे । चले चले । प्रचले प्रचले । कुसुमे कुसुमवरे । इलि मिलि विटि । चित्ति ज्वालम् आपनाय । परम शुद्धसत्त्व महा कारुणिक स्वाहा',
    title: 'एकादशमुखलोकेश्वर',
  },
  tibetan: {
    children: 'ༀ་དྷ་ར་དྷ་ར། དྷི་རི་དྷི་རི། དྷུ་རུ་དྷུ་རུ། ཨི་ཊྚེ་བི་ཊྚེ། ཙ་ལེ་ཙ་ལེ། པྲ་ཙ་ལེ་པྲ་ཙ་ལེ། ཀུ་སུ་མེ་ཀུ་སུ་མ་བ་རེ། ཨི་ལི་མི་ལི་བི་ཊི། ཙི་ཏྟི་ཛྭཱ་ལ་མ་ཨཱ་པ་ནཱ་ཡ། པ་ར་མ་ཤུ་དྡྷ་ས་ཏྟྭ་མ་ཧཱ་ཀཱ་རུ་ཎི་ཀ་སྭཱ་ཧཱ',
    repeat: { condensed: 68, roll: 24, wheel: 22 },
    title: 'བཅུ་གཅིག་ཞལ',
    typography: {
      thangka: { default: 10, double: 18, single: 42.5 },
    },
  },
  translation: {
    title: 'Eleven-Faced Avalokiteśvara',
  },
  transliteration: {
    // https://www.dsbcproject.org/canon-text/content/15/207
    children: 'oṃ dhara dhara । dhīre dhīre । dhuru dhuru । iṭṭe viṭṭe । cale cale । pracale pracale । kusume kusumavare । ili mili viṭi । citti jvālaṃ āpanāya । parama śuddhasattva mahā kāruṇika svāhā',
    repetition: 3,
    // The eleven-faced lord of the world (Avalokiteśvara).
    title: 'Ekādaśamukhalokeśvara',
  },
};
