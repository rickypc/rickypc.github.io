/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line import/extensions
const image = require('./_image.js');

/**
 * Generates a pdfMake object for `prayer wheel mandalas`.
 * @returns {object} A pdfMake compatible object.
 */
export default async function prayerWheel() {
  return {
    definition: {
      content: [
        await image({ alt: 'Sky (Top) Wheel', path: '#buddhism/img/sky-wheel.webp', width: 612 }),
        await image({ alt: 'Earth (Bottom) Wheel', path: '#buddhism/img/earth-wheel.webp', width: 612 }),
      ],
      info: {
        keywords: [
          'prayer wheels',
          'sacred',
          'purify',
          'wisdom',
          'compassion',
          'buddhahood',
        ],
        subject: 'Turning prayer wheel will purify defilement and obscuration, increase wisdom, and attain Buddhahood in this lifetime',
        title: 'Prayer Wheels',
      },
    },
  };
}
