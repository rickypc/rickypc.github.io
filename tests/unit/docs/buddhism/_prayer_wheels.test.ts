/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import image from '#buddhism/_image';
import prayerWheel from '#buddhism/_prayer_wheels';

jest.mock('#buddhism/_image', () => ({
  default: jest.fn(async (opts) => ({ mocked: true, ...opts })),
  __esModule: true,
}));

describe('docs.buddhism._prayer_wheels', () => {
  it('builds the prayer wheel mandalas document correctly', async () => {
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
