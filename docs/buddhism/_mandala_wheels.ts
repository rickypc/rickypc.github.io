/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import image from '#buddhism/_image';
import { oneLine } from '#root/src/data/common';

/**
 * Generates a pdfMake object for `5 mandala wheels`.
 * @returns {object} A pdfMake compatible object.
 */
export default async function mandalaWheels() {
  return {
    definition: {
      content: [
        await image({ alt: 'Jambhala Maṇḍala', path: '#buddhism/img/mandala-jambhala.webp', width: 624 }),
        await image({ alt: 'Vasudhārā Maṇḍala', path: '#buddhism/img/mandala-vasudhara.webp', width: 612 }),
        await image({ alt: 'Ganapati Maṇḍala', path: '#buddhism/img/mandala-ganapati.webp', width: 612 }),
        await image({ alt: 'Aṣṭamaṅgala Maṇḍala', path: '#buddhism/img/mandala-asta-mangala.webp', width: 612 }),
        await image({ alt: 'Viśvavajra Maṇḍala', path: '#buddhism/img/mandala-visva-vajra.webp', width: 587 }),
      ],
      info: {
        keywords: oneLine(`This document is about the maṇḍala wheels and its
          sacred role in traditional consecration rituals where jambhala -
          vasudhārā - ganapati - aṣṭamaṅgala and viśvavajra wheels are placed
          inside Buddha statues or stupas or prayer wheels to serve as relics
          in support of purification and the removal of obscuration while
          nurturing wisdom and compassion so that practitioners may advance
          toward Buddhahood`),
        subject: oneLine(`Placing maṇḍala wheels inside a Buddha statue helps
          purify defilement and obscuration, fosters wisdom and compassion, and
          supports the attainment of Buddhahood in this very lifetime`),
        title: 'Maṇḍala wheels',
      },
    },
  };
}
