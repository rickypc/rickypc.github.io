/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  header,
  main,
  phrase,
  phrases,
} from '#buddhism/pdf/_common';

const pratityasamutpadaSamudayaNirodha = phrases('#buddhism/practical-daily-practice/phrases/_pratityasamutpada_samudaya_nirodha.ts');

export default {
  pages: [
    {
      title: [
        {
          alignment: 'center',
          fontSize: 28,
          lineHeight: 0.85,
          text: 'Buddha Statue/Stupa/Sculpture Consecration',
        },
      ],
    },
    {
      chapters: ['Maṅgala', 'Abhiṣeka'],
      contents: [
        [
          ...phrase('#buddhism/practical-daily-practice/phrases/_mala.ts', ' (recite the prayer, then blow and rub the mālā gently)'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_japa.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_dharma.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_namaskara.ts'),
        ],
        [
          ...phrase('#buddhism/practical-daily-practice/phrases/_saranagamana_cittotpada.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_catvary_apramanani.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_prajna_paramita.ts', '', 7),
          ...phrase('#buddhism/practical-daily-practice/phrases/_sunyata.ts'),
        ],
      ],
      number: '3',
    },
    {
      chapters: ['Abhiṣeka'],
      contents: [pratityasamutpadaSamudayaNirodha[1]],
      number: '5',
    },
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          ...phrase('#buddhism/practical-daily-practice/phrases/_anekajati.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_pratityasamutpada.ts'),
        ],
        [
          ...phrase('#buddhism/practical-daily-practice/phrases/_vairocana_sarvakata_danavidhih.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_ratnadhvaja_parikrama.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_vimala_usnisa.ts'),
        ],
      ],
      number: '6',
    },
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          header('Āhvāna [Invitation]'),
          { style: 'tibetan', text: 'ཕྱོགས་བཅུ་ན་བཞུགས་པའི་སངས་རྒྱས་དང་བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་བདག་ལ་དགོངས་སུ་གསོལ།' },
          { style: 'tibetan', text: 'ཇི་སྲིད་ནམ་མཁའི་མཐའ་དང་མཉམ་པའི་སེམས་ཅན་ཐམས་ཅད་མི་གནས་པའི་མྱ་ངན་ལས་འདས་པའི་ས་ལ་མ་བཞག་གི་བར་དུ་རྒྱལ་བ་རྣམས་མྱ་ངན་ལས་མི་འདའ་བར་བརྟན་པར་བཞུགས་སུ་གསོལ།' },
          { style: 'tibetan', text: 'ཁྱད་པར་དུ་ཡང་སྐུ་གསུང་ཐུགས་ཀྱི་རྟེན་འདི་རྣམས་ལ་ཇི་སྲིད་འབྱུང་བ་བཞིའི་གནོད་པས་མ་ཞིག་གི་བར་དུ་བརྟན་པར་བཞུགས་སུ་གསོལ།' },
          { style: 'tibetan', text: 'བརྟན་པར་བཞུགས་ནས་ཀྱང་བདག་དང་སེམས་ཅན་ཐམས་ཅད་ལ་མཆོག་དང་ཐུན་མོང་གི་དངོས་གྲུབ་མ་ལུས་པ་སྩལ་དུ་གསོལ༎' },
          { style: ['phrase', 'phrase-set'], text: 'chok chu na zhukpé sangyé dang chang chub sempa tamché dak la gong su sol।' },
          { style: ['phrase', 'phrase-set'], text: 'ji si namkhé ta dang nyampé semchen tamché mi népé nya ngen lé dépé sa la ma zhak gi bar du gyalwa nam nya ngen lé mi dawar tenpar zhuk su sol।' },
          { style: ['phrase', 'phrase-set'], text: 'khyepar du yang ku sung tuk kyi ten di nam ji si jungwa zhi\'i nöpé ma zhik gi bar du tenpar zhuk su sol।' },
          {
            style: 'phrase-set',
            text: [
              { style: 'phrase', text: 'tenpar zhuk né kyang dak dang sem chen tamché la chok dang tün mong gi ngö drup ma lü pa tsal du sol॥' },
              { style: 'repetition', text: ' [3x]' },
            ],
          },
        ],
        [pratityasamutpadaSamudayaNirodha[0]],
      ],
      number: '4',
    },
    '',
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          header('Cakṣu Unmilan [Opening Of Eyes]'),
          ...main('ॐ ज्ञान चक्षु प्रवेशय फट्॥', 'oṃ jñāna cakṣu praveśāya phaṭ॥', 3),
          header('Pañcajñāna [Five Wisdoms]'),
          ...main('ॐ आः हूँ स्वाहा॥', 'oṃ āḥ hūṃ svāhā॥', 3),
          header('Abhiṣekapūjā [Consecration Offering]'),
          ...main('ॐ भगवं सर्वतथागत परमपूजा प्रतीच्छ होः । ॐ पुरुषाय होः॥', 'oṃ sarva tathāgata mahāpūja pratīccha hoḥ । oṃ puruṣāya hoḥ॥', 3),
        ],
        [
          header('Supratiṣṭha [Request For Deities To Remain]', ' (blessing mudrā with our left hand is held above the statue/stupa/sculpture, palm down with the thumb pressing down the pinky finger. Our right hand is held below the statue/stupa/sculpture, palm up with the thumb pressing down the pinky finger)'),
          ...main('ॐ गुरु बुद्ध बोधिसत्त्व धर्मपाल सपरिवार एजति जः हूं बं होः । ॐ सुप्रतिष्ठ वज्रये स्वाहा॥', 'oṃ guru buddha bodhisattva dharmapāla saparivāra ejati jaḥ hūṃ baṃ hoḥ । oṃ supratiṣṭha vajraye svāhā॥', 3),
          header('Puṇya Pariṇāmanā [Merit Dedication]', ' (in our own words)'),
          { margin: [0, 7.5, 0, 7.5], text: '' },
        ],
      ],
      number: '7',
    },
    '',
    '',
    '',
    '',
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          header('Svastigāthā [Verses of Auspiciousness]'),
          { style: 'tibetan', text: 'རབ་མཛེས་གསེར་ཞུན་བརྩེགས་པའི་ལྷུན་པོ་ལ།' },
          { style: 'tibetan', text: 'རྣམ་མང་རིན་ཆེན་ཚོགས་ཀྱི་ཕྲ་བཀོད་ལྟར།' },
          { style: 'tibetan', text: 'ལྟ་བས་མི་ངོམས་སྐུ་གཟུགས་མཆོག་འདི་ལ།' },
          { style: 'tibetan', text: 'སྲིད་མཐའི་བར་དུ་བརྟན་པར་བཞུགས་སུ་གསོལ།' },
          { style: ['phrase', 'phrase-set'], text: 'rab dze ser zhun tzeg pä\'i lhun po la।' },
          { style: ['phrase', 'phrase-set'], text: 'nam mang rin ch\'en tsog kyi tr\'a kö tar।' },
          { style: ['phrase', 'phrase-set'], text: 'ta wä mi ngom ku zug ch\'og di d\'ag।' },
          { style: ['phrase', 'phrase-set'], text: 'si thäi bar du tän par zhug su söl।' },
        ],
        [
          header('Svastigāthā [Verses of Auspiciousness]', ' (continued)'),
          { style: 'tibetan', text: 'མི་འགྱུར་ལྷུན་པོ་སྐུ་ཡི་བཀྲ་ཤིས་ཤོག།' },
          { style: 'tibetan', text: 'ཡན་ལག་དྲུག་ཅུ་གསུང་གི་བཀྲ་ཤིས་ཤོག།' },
          { style: 'tibetan', text: 'མཐའ་བྲལ་དོན་དམ་གས་ཀི་བཀྲ་ཤིས་ཤོག།' },
          { style: 'tibetan', text: 'རྒྱལ་བའི་སྐུ་གསུང་ཐུགས་ཀི་བཀྲ་ཤིས་ཤོག༎' },
          { style: ['phrase', 'phrase-set'], text: 'mi gyur lhun po ku yi tra shi shog।' },
          { style: ['phrase', 'phrase-set'], text: 'yan lag dr\'ug chu sung gi tra shi shog।' },
          { style: ['phrase', 'phrase-set'], text: 'tha\' dr\'äl d\'on d\'am thug kyi tra shi shog।' },
          { style: ['phrase', 'phrase-set'], text: 'gyäl wa\'i ku sung thug kyi tra shi shog॥' },
          header('Prārthanāsiddhiḥ [Accomplishment Of All Aspirations]'),
          ...main('पञ्चेन्द्रियावबोधनीये स्वहा । जय जय सुजय॥', 'pañcendriyāvabodhanīye svāhā । jaya jaya sujaya॥'),
        ],
      ],
      number: '8',
    },
  ],
  path: import.meta.url,
  title: 'Buddha Statue/Stupa/Sculpture Consecration',
};
