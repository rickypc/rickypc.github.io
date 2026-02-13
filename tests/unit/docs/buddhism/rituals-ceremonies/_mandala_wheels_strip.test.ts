/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import image from '#buddhism/media/pdf/_image';
import mandalaWheelsStrip from '#buddhism/rituals-ceremonies/_mandala_wheels_strip';

jest.mock('#buddhism/media/pdf/_image', () => ({
  default: jest.fn(async (opts) => ({ mocked: true, ...opts })),
  __esModule: true,
}));

describe('docs.buddhism.rituals-ceremonies._mandala_wheels_strip', () => {
  test('builds the mandala wheels strip document correctly', async () => {
    const result = await mandalaWheelsStrip();

    expect(result).toHaveProperty('definition');
    expect(result).toHaveProperty('options');

    const { definition, options } = result;

    // Content.
    expect(definition.content).toHaveLength(2);

    const firstTable = definition.content[0];
    const secondTable = definition.content[1];

    // 1st table.
    expect(firstTable.layout).toBe('table');
    expect(firstTable.table.body).toHaveLength(1);
    expect(firstTable.table.body[0]).toHaveLength(5);

    // image() called for 4 images in the first table.
    expect(image).toHaveBeenCalledWith({
      alt: 'Jambhala Maṇḍala',
      path: '#buddhism/img/mandala-jambhala.webp',
      width: 155.4,
    });

    expect(image).toHaveBeenCalledWith({
      alt: 'Vasudhārā Maṇḍala',
      path: '#buddhism/img/mandala-vasudhara.webp',
      width: 155.4,
    });

    expect(image).toHaveBeenCalledWith({
      alt: 'Aṣṭamaṅgala Maṇḍala',
      path: '#buddhism/img/mandala-asta-mangala.webp',
      margin: [0, 1.5, 0, 1.5],
      width: 155.4 - 1.5,
    });

    expect(image).toHaveBeenCalledWith({
      alt: 'Viśvavajra Maṇḍala',
      margin: [0, 2.5, 0, 1.5],
      path: '#buddhism/img/mandala-visva-vajra.webp',
      width: 155.4 - 2,
    });

    // 2nd table.
    expect(secondTable.layout).toBe('table');
    expect(secondTable.pageBreak).toBe('before');
    expect(secondTable.table.body).toHaveLength(1);
    expect(secondTable.table.body[0]).toHaveLength(5);

    // Ganapati image.
    expect(image).toHaveBeenCalledWith({
      alt: 'Ganapati Maṇḍala',
      path: '#buddhism/img/mandala-ganapati.webp',
      width: 155.4,
    });

    // Arrow cell.
    const arrowCell = secondTable.table.body[0][4];
    expect(arrowCell).toEqual({
      alignment: 'center',
      fontSize: 24,
      lineHeight: 0.25,
      text: '^\n|',
    });

    // Total image calls = 5 (first table) + 1 (second table) = 5.
    expect(image).toHaveBeenCalledTimes(5);

    // Metadata.
    expect(definition.info.keywords).toContain('maṇḍala wheels');
    expect(definition.info.subject).toContain('Placing maṇḍala wheels');
    expect(definition.info.title).toBe('Maṇḍala wheels');

    // Page orientation.
    expect(definition.pageOrientation).toBe('landscape');

    // Table layout functions.
    const layout = options.tableLayouts.table;

    expect(layout.hLineWidth()).toBe(0.25);
    expect(layout.paddingBottom()).toBe(2.5);
    expect(layout.paddingLeft()).toBe(5);
    expect(layout.paddingRight()).toBe(5);
    expect(layout.paddingTop()).toBe(0);
    expect(layout.vLineWidth()).toBe(0.25);
  });
});
