/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body, substance } from '#buddhism/pdf/_strip';
import condensed from '#buddhism/pdf/templates/_condensed';

jest.mock('#buddhism/pdf/_strip', () => ({
  body: jest.fn(() => 'BODY_RESULT'),
  substance: jest.fn(() => 'SUBSTANCE_RESULT'),
}));

describe('docs.buddhism.pdf.templates._condensed', () => {
  test('handles Tibetan (bo-CN) branch correctly', () => {
    jest.mock('#buddhism/bo', () => ({
      default: {
        lang: 'bo-CN',
        tibetan: {
          repeat: { condensed: 3 },
          typography: { condensed: { default: 9, title: 7 } },
        },
        transliteration: { title: 'Mantra' },
        total: 3,
      },
    }), { virtual: true });

    const result = condensed('#buddhism/bo');
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
      lineHeight: 0.895,
    });

    // Prefix/roll fonts.
    expect(definition.styles.prefix.font).toBe('Kokonor');
    expect(definition.styles.roll.font).toBe('Kokonor');

    // Last roll has empty canvas.
    const [, lastCanvas] = definition.content[2];
    expect(lastCanvas).toEqual({ canvas: [] });

    // Table layout functions.
    const layout = options.tableLayouts.condensed;
    expect(layout.hLineWidth()).toBe(0.25);
    expect(layout.paddingBottom()).toBe(0);
    expect(layout.paddingLeft()).toBe(1.5);
    expect(layout.paddingRight()).toBe(1);
    expect(layout.paddingTop()).toBe(1.15);
    expect(layout.vLineWidth()).toBe(0.25);
  });

  test('handles Sanskrit (sa-IN) branch correctly', () => {
    jest.mock('#buddhism/sa', () => ({
      default: {
        lang: 'sa-IN',
        transliteration: { title: 'Dhāraṇī' },
        total: 2,
      },
    }), { virtual: true });

    const result = condensed('#buddhism/sa');
    const { definition } = result;

    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 2,
      lineHeight: 0.86,
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

    const result = condensed('#buddhism/default');
    const { definition } = result;

    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 2,
      lineHeight: 0.71,
    });

    // Title formatting.
    expect(definition.info.title).toBe('Om mani padme hum condensed prayer roll');

    // substance() called once.
    expect(substance).toHaveBeenCalledTimes(1);
  });

  test('uses all fallback defaults when fields are missing', () => {
    jest.mock('#buddhism/fallback', () => ({
      default: { transliteration: { title: 'Fallback' } },
    }), { virtual: true });

    const result = condensed('#buddhism/fallback');
    const { definition } = result;

    // Default font sizes + lineHeight.
    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 2,
      lineHeight: 0.895,
    });

    // Default repeat = 1 -> lastPhrase = 0.
    expect(body).toHaveBeenCalledTimes(18);

    // Last roll empty canvas.
    const [, lastCanvas] = definition.content[17];
    expect(lastCanvas).toEqual({ canvas: [] });
  });
});
