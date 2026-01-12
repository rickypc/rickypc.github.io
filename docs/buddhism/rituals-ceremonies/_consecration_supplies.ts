/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { header, main, phrase } from '#buddhism/pdf/_common';

export default {
  pages: [
    {
      title: [
        {
          alignment: 'center',
          fontSize: 28,
          margin: [0, 14, 0, 0],
          text: 'Supplies Consecration',
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
          header('Cleansing'),
          ...main('ॐ सर्वतथागता अभिषेकते समय श्रीये हूं॥', 'oṃ sarva tathāgata abhiṣekate samaya śrīye hūṃ॥', 7),
          ...phrase('#buddhism/practical-daily-practice/phrases/_sunyata.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_pratityasamutpada.ts'),
        ],
      ],
      number: '3',
    },
    '',
    '',
    {
      chapters: ['Abhiṣeka'],
      contents: [
        [
          ...phrase('#buddhism/practical-daily-practice/phrases/_vairocana_sarvakata_danavidhih.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_ratnadhvaja_parikrama.ts'),
          ...phrase('#buddhism/practical-daily-practice/phrases/_vimala_usnisa.ts'),
        ],
        [
          header('Preparation', ' (blessing mudrā with our left hand is held above the supplies, palm down with the thumb pressing down the pinky finger. Our right hand is held below the supplies, palm up with the thumb pressing down the pinky finger)'),
          ...main('ॐ धर्मधातु ये स्वाहा धर्मधातु गर्भे स्वाहा॥', 'oṃ dharmadhātu ye svāhā dharmadhātu garbhe svāhā॥', 7),
        ],
      ],
      number: '4',
    },
    '',
  ],
  path: import.meta.url,
  title: 'Supplies Consecration',
};
