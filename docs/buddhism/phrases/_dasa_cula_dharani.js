/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

/* eslint-disable import/extensions */
import bhaisajyaguru from './_bhaisajyaguru.js';
import mahaCundiDurga from './_maha_cundi_durga.js';
import saptaAtitabuddhaKarasaniya from './_sapta_atitabuddha_karasaniya.js';
import sukhavatiVyuha from './_sukhavativyuha.js';

export default {
  sanskrit: {
    children: [
      'ॐ चक्रवर्तिन् चिन्तामणि महापद्मे रु रु तिष्ठ ज्वल आकर्शाय हूँ फट् स्वाहा । ॐ पद्म चिन्तामणि ज्वल हूँ । ॐ वरद पद्मे हूँ',
      'ॐ ख ख । खाहि खाहि । हूँ हूँ ज्वल ज्वल । प्रज्वल प्रज्वल । तिष्ठ तिष्ठ ष्टिरि ष्टिरि स्फोट स्फोट । शान्तिक श्रिये स्वाहा',
      'ॐ सिद्धे हुरु हुरु सिधुरु कृपा कृपा सिद्धाणि पूरुणि स्वाहा',
      mahaCundiDurga.sanskrit.children,
      'ॐ सर्वसंस्कार परिशुद्धे धर्मते गगन समुद्गते स्वभाव विशुद्धे महानय परिवारे स्वाहा',
      bhaisajyaguru.sanskrit.children,
      'ॐ मणिपद्मे हूँ । महा निर्याण चित्तोत्पाद । चित्तक्षन वितर्क । सर्वार्थ भूरि सिद्ध कामपूर्ण । भूरि द्योतोत्पान्न । नमः लोकेश्वराय स्वाहा',
      saptaAtitabuddhaKarasaniya.sanskrit.children,
      sukhavatiVyuha.core.sanskrit.children,
      'ॐ परिपूर्ण चरे । समन्त दर्शने । महा विहार गते । समन्त विधामने । महा कार्य प्रतिष्ठापने । सर्वार्थ साधने सुप्रतिपूरे । आयान धर्मता महा विकुर्विते । महा मैत्री उपसंहिते । महार्षि सुसंगृहीते । समन्तार्थ अनुपालने स्वाहा',
    ],
    title: 'दश चूल धारणी',
  },
  transliteration: {
    children: [
      'oṃ cakravarti cintāmaṇi mahāpadme ru ru tiṣṭha jvāla ākarṣāya hūṃ phaṭ svāhā । oṃ padma cintāmaṇi jvāla hūṃ । oṃ varada padme hūṃ',
      'oṃ kha kha । khāhi khāhi । hūṃ hūṃ jvāla jvāla । prajvāla prajvāla । tiṣṭha tiṣṭha ṣṭiri ṣṭiri sphoṭa sphoṭa । śāntika śriye svāhā',
      'oṃ siddhe huru huru sidhuru kṛpā kṛpā siddhāṇi puruṇi svāhā',
      mahaCundiDurga.transliteration.children,
      'oṃ sarva saṃskāra pariśuddha । dharmate gagana samudgate । svabhāva viśuddhe । mahānaya parivāre svāhā',
      bhaisajyaguru.transliteration.children,
      'oṃ maṇipadme hūṃ । mahā niryāṇa cittotpāda । cittakṣana vitarka । sarvārtha bhūri siddha kāmapūrṇa । bhūri dyototpanna । namaḥ lokeśvarāya svāhā',
      saptaAtitabuddhaKarasaniya.transliteration.children,
      sukhavatiVyuha.core.transliteration.children,
      'oṃ paripūrṇa cāre । samanta darśane । mahā vihāra gate । samanta vidhāmane । mahā kārya pratiṣṭhāpane । sarvārtha sādhane supratipūre । āyāna dharmatā mahā vikurvite । mahā maitrī upasaṃhite । mahārṣi susaṃgṛhīte । samantārtha anupālane svāhā',
    ],
    speech: [
      'oum cakrawarti cintamani, maha padme, ru-ru, tista jwala akarsaya, houm patt swaha, oum padma cintamani jwala houm, oum warada padme houm',
      'oum ka ka, khahi khahi, houm houm, jwala jwala, prajwala prajwala, tista tista, stiri stiri, sphota sphota, santika sriye swaha',
      'oum siddhe, huru huru sidhuru, kripa kripa, siddhani puruni swaha',
      mahaCundiDurga.transliteration.speech,
      'oum sarwa samskara parisuddha, dharmate gagana samudgate, swabawa wisuddhe, mahanaya pariware swaha',
      bhaisajyaguru.transliteration.speech,
      'oum manipadme houm, maha niryana cittotpada, cittaksana witarka, sarwartha buri siddha kamapurna, buri dyototpanna, namah lokeswaraya swaha',
      saptaAtitabuddhaKarasaniya.transliteration.speech,
      sukhavatiVyuha.core.transliteration.speech,
      'oum paripurna ca-re, samanta darsane, maha wihara ga-te, samanta widhamane, maha karya pratisthapane, sarwartha sadhane supratipure, ayana dharmata maha wikurwite, maha maitri upasamhite, maharsi susamgrihite, samantartha anupalane swaha',
    ].join(', '),
    // The Ten Short Dhāraṇī.
    title: 'Daśa Cūla Dhāraṇī',
  },
};
