/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import image from '#buddhism/media/pdf/_image';
import { oneLine } from '#root/src/data/common';

const width = 155.4;

/**
 * Generates a pdfMake object for `5 mandala wheels in a strip`.
 * @returns {object} A pdfMake compatible object.
 */
export default async function mandalaWheelsStrip() {
  return {
    definition: {
      content: [
        {
          layout: 'table',
          table: {
            body: [
              [
                await image({ alt: 'Jambhala Maṇḍala', path: '#buddhism/img/mandala-jambhala.webp', width }),
                await image({ alt: 'Vasudhārā Maṇḍala', path: '#buddhism/img/mandala-vasudhara.webp', width }),
                '',
                await image({
                  alt: 'Aṣṭamaṅgala Maṇḍala',
                  path: '#buddhism/img/mandala-asta-mangala.webp',
                  margin: [0, 1.5, 0, 1.5],
                  width: width - 1.5,
                }),
                await image({
                  alt: 'Viśvavajra Maṇḍala',
                  margin: [0, 2.5, 0, 1.5],
                  path: '#buddhism/img/mandala-visva-vajra.webp',
                  width: width - 2,
                }),
              ],
            ],
            dontBreakRows: true,
            widths: ['20%', '20%', '20%', '20%', '20%'],
          },
        },
        {
          layout: 'table',
          pageBreak: 'before',
          table: {
            body: [
              [
                '',
                '',
                await image({ alt: 'Ganapati Maṇḍala', path: '#buddhism/img/mandala-ganapati.webp', width }),
                '',
                {
                  alignment: 'center',
                  fontSize: 24,
                  lineHeight: 0.25,
                  text: '^\n|',
                },
              ],
            ],
            dontBreakRows: true,
            widths: ['20%', '20%', '20%', '20%', '20%'],
          },
        },
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
      pageOrientation: 'landscape',
    },
    options: {
      tableLayouts: {
        table: {
          hLineWidth: () => 0.25,
          paddingBottom: () => 2.5,
          paddingLeft: () => 5,
          paddingRight: () => 5,
          paddingTop: () => 0,
          vLineWidth: () => 0.25,
        },
      },
    },
  };
}
