/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export default {
  chinese: {
    children: [
      '唵 阿蜜哩多婆囉 婆囉婆囉 缽囉婆囉 毘輸地 吽吽 帕帕 梭哈',
      '唵 阿蜜哩多尾盧吉尼 伽婆 僧囉叉尼 阿羯叉尼 吽吽 帕帕 梭哈',
      '唵 毘摩哩 毘富哩 闍耶婆囉 闍耶婆訶尼 阿蜜哩多尾囉闍 吽吽 帕帕 梭哈',
      '唵 婆囉婆囉 僧跋囉僧跋囉 因陀利耶婆囉毘輸陀尼 嚕嚕 遮哩 吽吽 帕帕 梭哈',
      '唵 摩尼達哩 伐折哩尼 摩訶鉢底娑囉 吽吽 帕帕 梭哈',
    ].join(' · '),
    title: '大隨求陀羅尼',
  },
  path: import.meta.url,
  sanskrit: {
    children: [
      'ॐ अमृतवरे वरवर प्रवरे विशुद्धे हूँ हूँ फट् फट् स्वाहा',
      'ॐ अमृतविलोकिनि गर्भे संरक्षिणि आकर्षिणि हूँ हूँ फट् फट् स्वाहा',
      'ॐ विमले विपुले जयवरे जयवाहिनि अमृतविरजे हूँ हूँ फट् फट् स्वाहा',
      'ॐ भरभर सम्भरसम्भर इन्द्रियबलविशोधनि रुरु चले हूँ हूँ फट् फट् स्वाहा',
      'ॐ मणिधरि वज्रिणि महाप्रतिसरे हूँ हूँ फट् फट् स्वाहा',
    ].join(' । '),
    title: 'महाप्रतिसरा विद्या धारणी',
  },
  tibetan: {
    children: [
      'ཨོཾ་ཨ་མྲྀ་ཏ་བ་རེ་བ་རེ་བ་རེ་པྲ་བ་རེ་བི་ཤུད་དྷེ་ཧཱུྃ་ཧཱུྃ་ཕཊ་ཕཊ་སྭཱ་ཧཱ',
      'ཨོཾ་ཨ་མྲྀ་ཏ་བི་ལོ་ཀི་ནི་གརྦྷེ་སཾ་རཀྵ་ཎི་ཨཱ་ཀརྵ་ཎི་ཧཱུྃ་ཧཱུྃ་ཕཊ་ཕཊ་སྭཱ་ཧཱ',
      'ཨོཾ་བི་མ་ལེ་བི་པུ་ལེ་ཛ་ཡ་བ་རེ་ཛ་ཡ་བཱ་ཧི་ནི་ཨ་མྲྀ་ཏེ་བི་ར་ཛེ་ཧཱུྃ་ཧཱུྃ་ཕཊ་ཕཊ་སྭཱ་ཧཱ',
      'ཨོཾ་བྷ་ར་བྷ་ར་སཾ་བྷ་ར་སཾ་བྷ་ར་ཨིནྡྲི་ཡ་བ་ལ་བི་ཤོ་དྷ་ནི་རུ་རུ་ཙ་ལེ་ཧཱུྃ་ཧཱུྃ་ཕཊ་ཕཊ་སྭཱ་ཧཱ',
      'ཨོཾ་མ་ཎི་དྷ་རི་བཛྲི་ཎི་མ་ཧཱ་པྲ་ཏི་ས་རེ་ཧཱུྃ་ཧཱུྃ་ཕཊ་ཕཊ་སྭཱ་ཧཱ',
    ].join('། '),
    repeat: { condensed: 37, roll: 12, wheel: 11 },
    title: 'འཕགས་པ་རིག་པའི་རྒྱལ་མོ་སོ་སོར་འབྲང་བ་ཆེན་མོ',
    typography: {
      condensed: { default: 1.955, title: 1.655 },
    },
  },
  translation: {
    title: 'The Great Pratisarā Vidyā Dhāraṇī',
  },
  transliteration: {
    // https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/4_rellit/buddh/mprsvdhu.htm
    children: [
      'oṃ amṛtavare vara-vara pravara viśuddhe hūṃ hūṃ phaṭ phaṭ svāhā',
      'oṃ amṛtavilokini garbhe saṃrakṣaṇi ākarṣaṇi hūṃ hūṃ phaṭ phaṭ svāhā',
      'oṃ vimale vipule jayavare jayavāhini amṛtaviraje hūṃ hūṃ phaṭ phaṭ svāhā',
      'oṃ bhara-bhara saṃbhara-saṃbhara indriyabala-viśodhani ruru cale hūṃ hūṃ phaṭ phaṭ svāhā',
      'oṃ maṇidhari vajriṇi mahāpratisare hūṃ hūṃ phaṭ phaṭ svāhā',
    ].join(' । '),
    title: 'Mahāpratisarā Vidyā Dhāraṇī',
  },
};
