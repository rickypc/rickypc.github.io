/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { body } from '#buddhism/media/_common';
import thangka, {
  BASE_GEOMETRY,
  languageFontSizes,
  languageGeometry,
} from '#buddhism/media/pdf/templates/_thangka';

mock.module('#buddhism/media/_common', () => {
  const actual = require('#buddhism/media/_common');
  return {
    ...actual,
    body: mock((phrase) =>
      phrase?.title === 'Dhāraṇī'
        ? 'BODY_RESULT_WITH_LONG_TEXT_ON_IT_BEYOND_THRESHOLD'
        : 'BODY_RESULT',
    ),
  };
});

describe('docs.buddhism.media.pdf.templates._thangka.languageFontSizes()', () => {
  test('should return thangka typography from context when it exists', () => {
    const mockContext = {
      typography: { thangka: { default: 10, double: 30, single: 52.5 } },
    };
    const result = languageFontSizes(mockContext as any);

    expect(result).toEqual({ default: 10, double: 30, single: 52.5 });
  });

  test('should fall back to BASE_GEOMETRY.fontSizes when thangka typography is missing from context', () => {
    const mockContext = { typography: {} };
    const result = languageFontSizes(mockContext as any);

    expect(result).toEqual(BASE_GEOMETRY.fontSizes);
  });

  test('should safely fall back to BASE_GEOMETRY.fontSizes if the context parameter itself is undefined', () => {
    const result = languageFontSizes(undefined as any);
    expect(result).toEqual(BASE_GEOMETRY.fontSizes);
  });
});

describe('docs.buddhism.media.pdf.templates._thangka.languageGeometry()', () => {
  const mockSanskrit = { typography: { thangka: { default: 11, double: 31, single: 51 } } } as any;
  const mockTibetan = { typography: { thangka: { default: 12, double: 32, single: 52 } } } as any;
  const mockTransliteration = {
    typography: { thangka: { default: 13, double: 33, single: 53 } },
  } as any;

  test('should return combined Tibetan geometry configurations when lang parameter matches bo-CN', () => {
    const result = languageGeometry('bo-CN', mockSanskrit, mockTibetan, mockTransliteration);

    expect(result).toEqual({
      ...BASE_GEOMETRY,
      delimiter: '་',
      font: 'Kokonor',
      fontSizes: { default: 12, double: 32, single: 52 },
      infix: '།',
      phrase: mockTibetan,
    });
  });

  test('should return combined Sanskrit geometry configurations when lang parameter matches sa-IN', () => {
    const result = languageGeometry('sa-IN', mockSanskrit, mockTibetan, mockTransliteration);

    expect(result).toEqual({
      ...BASE_GEOMETRY,
      font: 'NotoSerifDevanagari',
      fontSizes: { default: 11, double: 31, single: 51 },
      infix: '।',
      phrase: mockSanskrit,
    });
  });

  test('should gracefully return default transliteration configurations when lang is an unrecognized language variant', () => {
    const result = languageGeometry('en-US', mockSanskrit, mockTibetan, mockTransliteration);

    expect(result).toEqual({
      ...BASE_GEOMETRY,
      fontSizes: { default: 13, double: 33, single: 53 },
      phrase: mockTransliteration,
    });
  });
});

describe('docs.buddhism.media.pdf.templates._thangka', () => {
  test('handles Tibetan (bo-CN) branch correctly', async () => {
    mock.module('#buddhism/bo', () => ({
      __esModule: true,
      default: {
        lang: 'bo-CN',
        tibetan: {
          title: 'Tibetan',
          typography: { thangka: { default: 9, double: 40, single: 60 } },
        },
        transliteration: { title: 'Translit' },
      },
    }));

    const result = await thangka('#buddhism/bo');
    const { definition } = result;

    // body() called once.
    expect(body).toHaveBeenCalledTimes(1);

    // Default font.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(9);

    // Style chosen based on text length.
    const dynamic = definition.content[7];
    expect(['double', 'single']).toContain(dynamic.style as string);

    // Tibetan overrides.
    expect(definition.styles.double.font).toBe('Kokonor');
    expect(definition.styles.single.font).toBe('Kokonor');

    // Title formatting.
    expect(definition.info.title).toBe('Translit paubhā/thangka prayer');
  });

  test('handles Sanskrit (sa-IN) branch correctly', async () => {
    mock.module('#buddhism/sa', () => ({
      __esModule: true,
      default: {
        lang: 'sa-IN',
        sanskrit: { title: 'Dhāraṇī' },
        transliteration: { title: 'Translit' },
      },
    }));

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
    mock.module('#buddhism/default', () => ({
      __esModule: true,
      default: { lang: 'en-US', transliteration: { title: 'OM MANI PADME HUM' } },
    }));

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
    mock.module('#buddhism/fallback', () => ({
      __esModule: true,
      default: { transliteration: { title: 'Fallback' } },
    }));

    const result = await thangka('#buddhism/fallback');
    const { definition } = result;

    // Default font + sizes.
    expect(definition.defaultStyle.font).toBe('Kokonor');
    expect(definition.defaultStyle.fontSize).toBe(10);

    // body() called once.
    expect(body).toHaveBeenCalledTimes(1);

    // Style chosen based on default text.
    const dynamic = definition.content[7];
    expect(['double', 'single']).toContain(dynamic.style as string);
  });
});
