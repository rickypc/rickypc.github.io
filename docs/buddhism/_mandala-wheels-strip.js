/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line import/extensions
const image = require('./_image.js');

const width = 155.4;

/**
 * @description Generates a pdfMake object for `5 mandala wheels in a strip`.
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
                await image({ alt: 'Aṣṭamaṅgala Maṇḍala', path: '#buddhism/img/mandala-asta-mangala.webp', width }),
                await image({ alt: 'Viśvavajra Maṇḍala', path: '#buddhism/img/mandala-visva-vajra.webp', width }),
              ],
            ],
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
            widths: ['20%', '20%', '20%', '20%', '20%'],
          },
        },
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
