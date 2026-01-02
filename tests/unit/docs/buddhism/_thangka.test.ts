/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body } from '#buddhism/_common';
import thangka from '#buddhism/_thangka';

jest.mock('#buddhism/_common', () => ({
  body: jest.fn((phrase) => (phrase?.title === 'Dhāraṇī'
    ? 'BODY_RESULT_WITH_LONG_TEXT_ON_IT_BEYOND_THRESHOLD' : 'BODY_RESULT')),
}));

describe('docs.buddhism._thangka', () => {
  it('handles Tibetan (bo-CN) branch correctly', () => {
    jest.mock('#buddhism/bo', () => ({
      default: {
        lang: 'bo-CN',
        tibetan: {
          title: 'Tibetan',
          typography: { thangka: { default: 9, double: 40, single: 60 } },
        },
        transliteration: { title: 'Translit' },
      },
    }), { virtual: true });

    const result = thangka('#buddhism/bo');
    const { definition } = result;

    // body() called once.
    expect(body).toHaveBeenCalledTimes(1);

    // Default font.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(9);

    // Style chosen based on text length.
    const dynamic = definition.content[7];
    expect(['double', 'single']).toContain(dynamic.style);

    // Tibetan overrides.
    expect(definition.styles.double.font).toBe('Kokonor');
    expect(definition.styles.single.font).toBe('Kokonor');

    // Title formatting.
    expect(definition.info.title).toBe('Translit paubhā/thangka prayer');
  });

  it('handles Sanskrit (sa-IN) branch correctly', () => {
    jest.mock('#buddhism/sa', () => ({
      default: {
        lang: 'sa-IN',
        sanskrit: { title: 'Dhāraṇī' },
        transliteration: { title: 'Translit' },
      },
    }), { virtual: true });

    const result = thangka('#buddhism/sa');
    const { definition } = result;

    // Default font.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(10);

    // Sanskrit overrides.
    expect(definition.styles.double.font).toBe('NotoSerifDevanagari');
    expect(definition.styles.single.font).toBe('NotoSerifDevanagari');

    expect(body).toHaveBeenCalledTimes(1);
  });

  it('handles default (transliteration) branch correctly', () => {
    jest.mock('#buddhism/default', () => ({
      default: {
        lang: 'en-US',
        transliteration: { title: 'OM MANI PADME HUM' },
      },
    }), { virtual: true });

    const result = thangka('#buddhism/default');
    const { definition } = result;

    // Default font.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(10);

    // Fallback overrides.
    expect(definition.styles.double.font).toBe('NotoSans');
    expect(definition.styles.single.font).toBe('NotoSans');

    expect(definition.info.title).toBe('Om mani padme hum paubhā/thangka prayer');
  });

  it('uses fallback defaults when fields are missing', () => {
    jest.mock('#buddhism/fallback', () => ({
      default: { transliteration: { title: 'Fallback' } },
    }), { virtual: true });

    const result = thangka('#buddhism/fallback');
    const { definition } = result;

    // Default font + sizes.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(10);

    // body() called once.
    expect(body).toHaveBeenCalledTimes(1);

    // Style chosen based on default text.
    const dynamic = definition.content[7];
    expect(['double', 'single']).toContain(dynamic.style);
  });
});
