/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import image from '#buddhism/media/pdf/_image';
import prayerWheel from '#buddhism/rituals-ceremonies/_prayer_wheels';

mock.module('#buddhism/media/pdf/_image', () => ({
  __esModule: true,
  default: mock(async (opts) => ({ mocked: true, ...opts })),
}));

describe('docs.buddhism.rituals-ceremonies._prayer_wheels', () => {
  test('builds the prayer wheel mandalas document correctly', async () => {
    const result = await prayerWheel();

    expect(result).toHaveProperty('definition');
    const { definition } = result;

    // Content.
    expect(definition.content).toHaveLength(2);

    expect(image).toHaveBeenNthCalledWith(1, {
      alt: 'Sky (Top) Wheel',
      path: '#buddhism/img/sky-wheel.webp',
      width: 612,
    });

    expect(image).toHaveBeenNthCalledWith(2, {
      alt: 'Earth (Bottom) Wheel',
      path: '#buddhism/img/earth-wheel.webp',
      width: 612,
    });

    expect(image).toHaveBeenCalledTimes(2);

    // Metadata.
    expect(definition.info.keywords).toContain('prayer wheels');
    expect(definition.info.subject).toContain('Turning prayer wheels helps purify');
    expect(definition.info.title).toBe('Prayer wheels');
  });
});
