/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body } from '#buddhism/media/pdf/_strip';
import cintamaniDharmacakraYasti from '#buddhism/rituals-ceremonies/_cintamani_dharmacakra_yasti';

jest.mock('#buddhism/media/pdf/_strip', () => ({
  body: jest.fn(() => 'BODY_RESULT'),
}));

describe('docs.buddhism.rituals-ceremonies._cintamani_dharmacakra_yasti', () => {
  test('builds the prayer wheel life force pillar document correctly', async () => {
    const result = await cintamaniDharmacakraYasti();

    // Top-level structure.
    expect(result).toHaveProperty('definition');

    const { definition } = result;

    // Content block.
    expect(definition.content).toHaveLength(2);

    const [rollSection, dividerSection] = definition.content;

    // Roll section.
    expect(rollSection.layout).toStrictEqual({
      paddingBottom: expect.any(Function),
      paddingLeft: expect.any(Function),
      paddingRight: expect.any(Function),
      paddingTop: expect.any(Function),
    });
    expect(rollSection.margin).toEqual([0, 0, 0, 7.5]);

    const { table } = rollSection;
    expect(table?.dontBreakRows).toBeTruthy();
    expect(table?.heights).toHaveLength(3);
    expect(table?.widths).toEqual([18, '*']);

    // 3 rows for 3 Tibetan lines.
    expect(table?.body).toHaveLength(3);

    table?.body.forEach((row) => {
      // intro cell
      expect(row[0]).toEqual(
        expect.objectContaining({
          style: 'intro',
          margin: expect.any(Array),
          text: expect.any(String),
        }),
      );

      // Text cell.
      expect(row[1]).toEqual(
        expect.objectContaining({
          text: [
            { fontSize: 4, text: expect.stringMatching(/x /) },
            'BODY_RESULT',
          ],
        }),
      );
    });

    // Divider canvas.
    expect(dividerSection.canvas).toHaveLength(2);
    expect(dividerSection.margin).toEqual([0, 0, 0, 7.5]);

    dividerSection.canvas?.forEach((line) => {
      expect(line).toEqual(
        expect.objectContaining({
          type: 'line',
          lineWidth: 0.25,
          y1: 0,
          y2: 0,
        }),
      );
    });

    // Default style.
    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 6,
      lineHeight: 0.84,
    });

    // Info.
    expect(definition.info.title).toBe('Prayer wheel life force pillar');
    expect(definition.info.subject).toContain('Turning prayer wheels helps');
    expect(definition.info.keywords).toContain('cintāmaṇi dharmacakra yaṣṭi');

    // Styles.
    expect(definition.styles).toEqual(
      expect.objectContaining({
        intro: expect.any(Object),
        prefix: expect.any(Object),
        roll: expect.any(Object),
      }),
    );

    // Validate layout functions.
    expect(rollSection.layout!.paddingBottom()).toBe(1);
    expect(rollSection.layout!.paddingLeft()).toBe(2.5);
    expect(rollSection.layout!.paddingRight()).toBe(2.5);
    expect(rollSection.layout!.paddingTop()).toBe(0.25);

    // body() should be called once per Tibetan line.
    expect(body).toHaveBeenCalledTimes(3);
  });
});
