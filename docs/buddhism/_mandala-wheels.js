/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line import/extensions
const image = require('./_image.js');

export default async function prayerWheel() {
  return {
    definition: {
      content: [
        await image({ alt: 'Jambhala Maṇḍala', path: '#buddhism/img/mandala-jambhala.webp', width: 612 }),
        await image({ alt: 'Vasudhārā Maṇḍala', path: '#buddhism/img/mandala-vasudhara.webp', width: 612 }),
        await image({ alt: 'Ganapati Maṇḍala', path: '#buddhism/img/mandala-ganapati.webp', width: 612 }),
        await image({ alt: 'Aṣṭamaṅgala Maṇḍala', path: '#buddhism/img/mandala-asta-mangala.webp', width: 612 }),
        await image({ alt: 'Viśvavajra Maṇḍala', path: '#buddhism/img/mandala-visva-vajra.webp', width: 612 }),
      ],
      info: {
        keywords: [
          'mandala wheels',
          'Jambhala',
          'Vasudhārā',
          'Ganapati',
          'Aṣṭamaṅgala',
          'Viśvavajra',
          'sacred',
          'purify',
          'wisdom',
          'compassion',
          'buddhahood',
        ],
        subject: 'Maṇḍala wheels will purify defilement and obscuration, increase wisdom, and attain Buddhahood in this lifetime',
        title: 'Maṇḍala Wheels',
      },
    },
  };
}
