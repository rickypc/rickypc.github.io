/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body } from '#buddhism/media/_common';
import thangka from '#buddhism/media/pdf/templates/_thangka';

jest.mock('#buddhism/media/_common', () => {
  const actual = jest.requireActual('#buddhism/media/_common');
  return {
    ...actual,
    body: jest.fn((phrase) => (phrase?.title === 'Dhāraṇī'
      ? 'BODY_RESULT_WITH_LONG_TEXT_ON_IT_BEYOND_THRESHOLD' : 'BODY_RESULT')),
  };
});

describe('docs.buddhism.media.pdf.templates._thangka', () => {
  test('handles Tibetan (bo-CN) branch correctly', async () => {
    jest.mock('#buddhism/bo', () => ({
      __esModule: true,
      default: {
        lang: 'bo-CN',
        tibetan: {
          title: 'Tibetan',
          typography: { thangka: { default: 9, double: 40, single: 60 } },
        },
        transliteration: { title: 'Translit' },
      },
    }), { virtual: true });

    const result = await thangka('#buddhism/bo');
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

  test('handles Sanskrit (sa-IN) branch correctly', async () => {
    jest.mock('#buddhism/sa', () => ({
      __esModule: true,
      default: {
        lang: 'sa-IN',
        sanskrit: { title: 'Dhāraṇī' },
        transliteration: { title: 'Translit' },
      },
    }), { virtual: true });

    const result = await thangka('#buddhism/sa');
    const { definition } = result;

    // Default font.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(10);

    // Sanskrit overrides.
    expect(definition.styles.double.font).toBe('NotoSerifDevanagari');
    expect(definition.styles.single.font).toBe('NotoSerifDevanagari');

    expect(body).toHaveBeenCalledTimes(1);
  });

  test('handles default (transliteration) branch correctly', async () => {
    jest.mock('#buddhism/default', () => ({
      __esModule: true,
      default: {
        lang: 'en-US',
        transliteration: { title: 'OM MANI PADME HUM' },
      },
    }), { virtual: true });

    const result = await thangka('#buddhism/default');
    const { definition } = result;

    // Default font.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(10);

    // Fallback overrides.
    expect(definition.styles.double.font).toBe('NotoSans');
    expect(definition.styles.single.font).toBe('NotoSans');

    expect(definition.info.title).toBe('Om mani padme hum paubhā/thangka prayer');
  });

  test('uses fallback defaults when fields are missing', async () => {
    jest.mock('#buddhism/fallback', () => ({
      __esModule: true,
      default: { transliteration: { title: 'Fallback' } },
    }), { virtual: true });

    const result = await thangka('#buddhism/fallback');
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
