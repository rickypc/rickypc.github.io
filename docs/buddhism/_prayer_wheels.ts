/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import image from './_image';

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
        keywords: `This document is about the prayer wheels and its sacred role
          in traditional rituals where prayer rolls or zung are placed inside
          prayer wheels to serve as relics in support of purification and the
          removal of obscuration while nurturing wisdom and compassion so that
          practitioners may advance toward Buddhahood`.replace(/\n\s*/g, ' '),
        subject: `Turning prayer wheels helps purify defilement and
          obscuration, fosters wisdom and compassion, and supports the
          attainment of Buddhahood in this very lifetime`.replace(/\n\s*/g, ' '),
        title: 'Prayer wheels',
      },
    },
  };
}
