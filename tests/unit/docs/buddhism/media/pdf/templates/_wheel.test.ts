/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body, substance } from '#buddhism/media/pdf/_strip';
import wheel from '#buddhism/media/pdf/templates/_wheel';

jest.mock('#buddhism/media/pdf/_strip', () => ({
  body: jest.fn(() => 'BODY_RESULT'),
  substance: jest.fn(() => 'SUBSTANCE_RESULT'),
}));

describe('docs.buddhism.media.pdf.templates._wheel', () => {
  test('handles Tibetan (bo-CN) branch correctly', () => {
    jest.mock('#buddhism/bo', () => ({
      default: {
        lang: 'bo-CN',
        tibetan: {
          repeat: { wheel: 3, roll: 2 },
          typography: { wheel: { default: 9, title: 7 } },
        },
        transliteration: { title: 'Mantra' },
        total: 3,
      },
    }), { virtual: true });

    const result = wheel('#buddhism/bo');
    const { definition, options } = result;

    // 3 rolls.
    expect(definition.content).toHaveLength(3);

    // body() called once per roll.
    expect(body).toHaveBeenCalledTimes(3);

    // substance() called once.
    expect(substance).toHaveBeenCalledTimes(1);

    // Tibetan settings applied.
    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 9,
      lineHeight: 0.84,
    });

    // Prefix/roll fonts.
    expect(definition.styles.prefix.font).toBe('Kokonor');
    expect(definition.styles.roll.font).toBe('Kokonor');

    // 1st page special table.
    const [firstPage] = definition.content[0];
    const { table } = firstPage;

    expect(table?.body).toHaveLength(3);
    expect(table?.body?.[0][0].text).toBe('ༀ');
    expect(table?.body?.[1][0].text).toBe('ཨཱཿ');
    expect(table?.body?.[2][0].text).toBe('ཧཱུྃ');

    // RowSpan cell.
    expect(table?.body?.[0][1].rowSpan).toBe(3);

    // Widths & heights.
    expect(table?.heights).toHaveLength(3);
    expect(table?.widths).toEqual([18, '*']);

    // Last page has empty canvas.
    const [, lastCanvas] = definition.content[2];
    expect(lastCanvas).toEqual({ canvas: [] });

    // Table layout functions.
    const layout = options.tableLayouts.roll;
    expect(layout.paddingBottom()).toBe(1);
    expect(layout.paddingLeft()).toBe(2.5);
    expect(layout.paddingRight()).toBe(2.5);
    expect(layout.paddingTop()).toBe(0.25);
  });

  test('handles Sanskrit (sa-IN) branch correctly', () => {
    jest.mock('#buddhism/sa', () => ({
      default: {
        lang: 'sa-IN',
        transliteration: { title: 'Dhāraṇī' },
        total: 2,
      },
    }), { virtual: true });

    const result = wheel('#buddhism/sa');
    const { definition } = result;

    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 6,
      lineHeight: 0.81,
    });

    expect(definition.styles.prefix.font).toBe('NotoSerifDevanagari');
    expect(definition.styles.roll.font).toBe('NotoSerifDevanagari');

    // substance() called once.
    expect(substance).toHaveBeenCalledTimes(1);
  });

  test('handles default (transliteration) branch correctly', () => {
    jest.mock('#buddhism/default', () => ({
      default: {
        lang: 'en-US',
        transliteration: { title: 'OM MANI PADME HUM' },
        total: 1,
      },
    }), { virtual: true });

    const result = wheel('#buddhism/default');
    const { definition } = result;

    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 6,
      lineHeight: 0.71,
    });

    expect(definition.info.title).toBe('Om mani padme hum prayer roll');

    expect(substance).toHaveBeenCalledTimes(1);
  });

  test('uses all fallback defaults when fields are missing', () => {
    jest.mock('#buddhism/fallback', () => ({
      default: { transliteration: { title: 'Fallback' } },
    }), { virtual: true });

    const result = wheel('#buddhism/fallback');
    const { definition } = result;

    // Default font sizes + lineHeight.
    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 6,
      lineHeight: 0.84,
    });

    // Default repeat = {} -> wheel=1, roll=1.
    expect(body).toHaveBeenCalledTimes(6);

    // Last roll empty canvas.
    const [, lastCanvas] = definition.content[5];
    expect(lastCanvas).toEqual({ canvas: [] });
  });
});
