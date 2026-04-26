/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { phrase } from '#buddhism/media/_common';

export default {
  pages: [
    {
      title: [
        {
          alignment: 'center',
          fontSize: 28,
          margin: [0, 14, 0, 0],
          text: 'Consecration of Supplies',
        },
      ],
    },
    {
      chapters: ['Maṅgala', 'Abhiṣeka'],
      contents: [
        [
          ...phrase('#buddhism/practice-daily-life/phrases/_mala.ts', ' (recite the prayer, gently blow on the mālā and rub it lightly)'),
          ...phrase('#buddhism/practice-daily-life/phrases/_japa.ts'),
          ...phrase('#buddhism/practice-daily-life/phrases/_dharma.ts'),
          ...phrase('#buddhism/practice-daily-life/phrases/_namaskara.ts'),
        ],
        [
          ...phrase('#buddhism/practice-daily-life/phrases/_abhiseka.ts', '', 7, 'Empowerment'),
          ...phrase('#buddhism/practice-daily-life/phrases/_sunyata.ts'),
          ...phrase('#buddhism/practice-daily-life/phrases/_pratityasamutpada.ts'),
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
          ...phrase('#buddhism/practice-daily-life/phrases/_vairocana_sarvakata_danavidhih.ts'),
          ...phrase('#buddhism/practice-daily-life/phrases/_ratnadhvaja_parikrama.ts'),
          ...phrase('#buddhism/practice-daily-life/phrases/_vimala_usnisa.ts'),
        ],
        [
          ...phrase('#buddhism/practice-daily-life/phrases/_pratistha.ts', ' (blessing mudrā: left hand above the items, palm down with the thumb pressing the little finger; right hand below the items, palm up with the thumb pressing the little finger)', 7, 'Consecration'),
        ],
      ],
      number: '4',
    },
    '',
  ],
  path: import.meta.url,
  title: 'Consecration of Supplies',
};
