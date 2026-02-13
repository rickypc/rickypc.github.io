/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import image from '#buddhism/media/pdf/_image';
import { oneLine } from '#root/src/data/common';

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
        keywords: oneLine(`This document is about the prayer wheels and its
          sacred role in traditional rituals where prayer rolls or zung are
          placed inside prayer wheels to serve as relics in support of
          purification and the removal of obscuration while nurturing wisdom
          and compassion so that practitioners may advance toward Buddhahood`),
        subject: oneLine(`Turning prayer wheels helps purify defilement and
          obscuration, fosters wisdom and compassion, and supports the
          attainment of Buddhahood in this very lifetime`),
        title: 'Prayer wheels',
      },
    },
  };
}
