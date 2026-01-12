/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import image from '#buddhism/pdf/_image';
import mandalaWheels from '#buddhism/rituals-ceremonies/_mandala_wheels';

jest.mock('#buddhism/pdf/_image', () => ({
  default: jest.fn(async (opts) => ({ mocked: true, ...opts })),
  __esModule: true,
}));

describe('docs.buddhism.rituals-ceremonies._mandala_wheels', () => {
  test('builds the mandala wheels document correctly', async () => {
    const result = await mandalaWheels();

    expect(result).toHaveProperty('definition');
    const { definition } = result;

    // 5 images.
    expect(definition.content).toHaveLength(5);

    // image() called 5 times.
    expect(image).toHaveBeenCalledTimes(5);

    // Verify each call.
    expect(image).toHaveBeenNthCalledWith(1, {
      alt: 'Jambhala Maṇḍala',
      path: '#buddhism/img/mandala-jambhala.webp',
      width: 624,
    });

    expect(image).toHaveBeenNthCalledWith(2, {
      alt: 'Vasudhārā Maṇḍala',
      path: '#buddhism/img/mandala-vasudhara.webp',
      width: 612,
    });

    expect(image).toHaveBeenNthCalledWith(3, {
      alt: 'Ganapati Maṇḍala',
      path: '#buddhism/img/mandala-ganapati.webp',
      width: 612,
    });

    expect(image).toHaveBeenNthCalledWith(4, {
      alt: 'Aṣṭamaṅgala Maṇḍala',
      path: '#buddhism/img/mandala-asta-mangala.webp',
      width: 612,
    });

    expect(image).toHaveBeenNthCalledWith(5, {
      alt: 'Viśvavajra Maṇḍala',
      path: '#buddhism/img/mandala-visva-vajra.webp',
      width: 587,
    });

    // Metadata.
    expect(definition.info.keywords).toContain('maṇḍala wheels');
    expect(definition.info.subject).toContain('Placing maṇḍala wheels');
    expect(definition.info.title).toBe('Maṇḍala wheels');
  });
});
