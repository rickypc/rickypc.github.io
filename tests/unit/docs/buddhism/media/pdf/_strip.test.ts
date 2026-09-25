/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { createElement } from 'react';
import {
  BASE_GEOMETRY,
  body,
  CONDENSED_GEOMETRY,
  languageFontSizes,
  languageGeometry,
  subsequentBody,
  substance,
} from '#buddhism/media/pdf/_strip';

describe('docs.buddhism.media.pdf._strip.body()', () => {
  test('wraps a single phrase into the expected structure', () => {
    const result = body('-', 1, 'pre', 2, 'suf', 'X');

    expect(result.text).toEqual([
      { style: 'prefix', text: 'pre' },
      {
        text: [
          { style: 'roll', text: '-X- ' },
          { style: 'roll', text: '-X' },
        ],
      },
      { style: 'roll', text: 'suf' },
    ]);
  });

  test('handles multiple phrases and prefixes correctly', () => {
    const result = body('*', 0, 'p', 1, 'end', ['A', 'B']);

    expect(result.text).toEqual([
      { style: 'prefix', text: 'p' },
      { text: [{ style: 'roll', text: '*A' }] },
      { style: 'roll', text: 'end' },
      { style: 'prefix', text: ' p' },
      { text: [{ style: 'roll', text: '*B' }] },
      { style: 'roll', text: 'end' },
    ]);
  });
});

describe('docs.buddhism.media.pdf._strip.languageFontSizes()', () => {
  test('should return typography from context when the exact typography key exists', () => {
    const mockContext = { typography: { roll: { default: 12, title: 10 } } };
    const result = languageFontSizes(mockContext as any, 'roll');

    expect(result).toEqual({ default: 12, title: 10 });
  });

  test('should fall back to BASE_GEOMETRY.fontSizes when typography key is missing from context', () => {
    const mockContext = { typography: {} };
    const result = languageFontSizes(mockContext as any, 'roll');

    expect(result).toEqual(BASE_GEOMETRY.fontSizes);
  });

  test('should fall back to CONDENSED_GEOMETRY.fontSizes when key is "condensed" and missing from context', () => {
    const mockContext = { typography: {} };
    const result = languageFontSizes(mockContext as any, 'condensed');

    expect(result).toEqual(CONDENSED_GEOMETRY.fontSizes);
  });

  test('should safely fall back to BASE_GEOMETRY.fontSizes if the context itself is undefined', () => {
    const result = languageFontSizes(undefined as any, 'roll');
    expect(result).toEqual(BASE_GEOMETRY.fontSizes);
  });

  test('should safely fall back to CONDENSED_GEOMETRY.fontSizes if the context itself is undefined and key is "condensed"', () => {
    const result = languageFontSizes(undefined as any, 'condensed');
    expect(result).toEqual(CONDENSED_GEOMETRY.fontSizes);
  });
});

describe('docs.buddhism.media.pdf._strip.languageGeometry()', () => {
  const mockSanskrit = { repeat: { roll: 1 }, text: 'sanskrit-text' } as any;
  const mockTibetan = { repeat: { roll: 2 }, text: 'tibetan-text' } as any;
  const mockTransliteration = { repeat: { roll: 3 }, text: 'translit-text' } as any;

  test('should return standard Tibetan metrics when lang is bo-CN and key is not condensed', () => {
    const result = languageGeometry(
      'roll',
      'bo-CN',
      mockSanskrit,
      mockTibetan,
      mockTransliteration,
    );

    expect(result).toEqual({
      ...BASE_GEOMETRY,
      fontSizes: BASE_GEOMETRY.fontSizes,
      infix: '།',
      lineHeight: 0.84,
      paddingBottom: 1,
      paddingTop: 0.25,
      prefix: '༄༅། ',
      prefixFont: 'Kokonor',
      repeat: mockTibetan.repeat,
      rollFont: 'Kokonor',
      suffix: '༎',
      text: undefined as never,
    });
  });

  test('should return condensed Tibetan metrics when lang is bo-CN and key is condensed', () => {
    const result = languageGeometry(
      'condensed',
      'bo-CN',
      mockSanskrit,
      mockTibetan,
      mockTransliteration,
    );

    expect(result).toEqual({
      ...CONDENSED_GEOMETRY,
      fontSizes: CONDENSED_GEOMETRY.fontSizes,
      infix: '།',
      lineHeight: 0.895,
      paddingBottom: 0,
      paddingTop: 1.15,
      prefix: '༄༅། ',
      prefixFont: 'Kokonor',
      repeat: mockTibetan.repeat,
      rollFont: 'Kokonor',
      suffix: '༎',
      text: undefined as never,
    });
  });

  test('should return standard Sanskrit metrics when lang is sa-IN and key is not condensed', () => {
    const result = languageGeometry(
      'roll',
      'sa-IN',
      mockSanskrit,
      mockTibetan,
      mockTransliteration,
    );

    expect(result).toEqual({
      ...BASE_GEOMETRY,
      fontSizes: BASE_GEOMETRY.fontSizes,
      height: 83.175,
      infix: '\u0964',
      lineHeight: 0.81,
      paddingBottom: 0.825,
      paddingTop: 1,
      repeat: mockSanskrit.repeat,
      rollFont: 'NotoSerifDevanagari',
      suffix: '\u0965',
      text: undefined as never,
    });
  });

  test('should return condensed Sanskrit metrics when lang is sa-IN and key is condensed', () => {
    const result = languageGeometry(
      'condensed',
      'sa-IN',
      mockSanskrit,
      mockTibetan,
      mockTransliteration,
    );

    expect(result).toEqual({
      ...CONDENSED_GEOMETRY,
      fontSizes: CONDENSED_GEOMETRY.fontSizes,
      height: 36.7925,
      infix: '\u0964',
      lineHeight: 0.86,
      paddingBottom: 0,
      paddingTop: 1.15,
      repeat: mockSanskrit.repeat,
      rollFont: 'NotoSerifDevanagari',
      suffix: '\u0965',
      text: undefined as never,
    });
  });

  test('should return fallback transliteration metrics when lang matches no known configs', () => {
    const result = languageGeometry(
      'roll',
      'en-US',
      mockSanskrit,
      mockTibetan,
      mockTransliteration,
    );

    expect(result).toEqual({
      ...BASE_GEOMETRY,
      fontSizes: BASE_GEOMETRY.fontSizes,
      repeat: mockTransliteration.repeat,
      text: undefined as never,
    });
  });
});

describe('docs.buddhism.media.pdf._strip.subsequentBody()', () => {
  const mockFontSizes = { default: '12px', title: '16px' } as any;
  const mockText = 'om mani padme hum' as any;
  const mockTransliteration = { title: 'mantra' } as any;

  test('should format structure correctly and convert transliteration title to uppercase', () => {
    const mockRepeat = { roll: 3 };
    const result = subsequentBody(
      mockFontSizes,
      '|',
      '[',
      mockRepeat,
      'roll',
      ']',
      mockText,
      mockTransliteration,
    );

    // Matches the actual production output from the body method.
    expect(result).toEqual([
      [
        {
          text: [
            { fontSize: '16px' as unknown as number, text: 'MANTRA 3x ' },
            {
              text: [
                { style: 'prefix', text: '[' },
                {
                  text: [
                    { style: 'roll', text: '|om mani padme hum| ' },
                    { style: 'roll', text: '|om mani padme hum| ' },
                    { style: 'roll', text: '|om mani padme hum' },
                  ],
                },
                { style: 'roll', text: ']' },
              ],
            },
          ],
        },
      ],
    ]);
  });

  test('should fallback to a count of 1 when repeat configuration or key is completely missing', () => {
    const result = subsequentBody(
      mockFontSizes,
      '|',
      '[',
      undefined as any,
      'roll',
      ']',
      mockText,
      mockTransliteration,
    );

    // Directly access nested output array to avoid deep template matching.
    expect(result[0][0].text[0].text).toBe('MANTRA 1x ');
    // Check that the real body function generated exactly 1 phrase entry.
    const bodyContent = (result[0][0].text[1] as any).text[1].text;
    expect(bodyContent).toHaveLength(1);
    expect(bodyContent[0].text).toBe('|om mani padme hum');
  });

  test('should dynamically access correct properties when swapping to a non-default repeatKey parameter', () => {
    const mockRepeat = { thangka: 5 };
    const result = subsequentBody(
      mockFontSizes,
      '|',
      '[',
      mockRepeat as any,
      'thangka' as any,
      ']',
      mockText,
      mockTransliteration,
    );

    expect(result[0][0].text[0].text).toBe('MANTRA 5x ');
    // Check that the body function loops exactly 5 times (count minus one loops with dividers).
    const bodyContent = (result[0][0].text[1] as any).text[1].text;
    expect(bodyContent).toHaveLength(5);
  });
});

describe('docs.buddhism.media.pdf._strip.substance()', () => {
  test('returns string children as-is', () => {
    expect(substance({ children: 'hello' })).toBe('hello');
  });

  test('returns array children as-is', () => {
    expect(substance({ children: ['a', 'b'] })).toEqual(['a', 'b']);
  });

  test('extracts nested children from a React element', () => {
    const element = createElement('div', null, ['x', 'y']);
    expect(substance({ children: element })).toEqual(['x', 'y']);
  });

  test('returns undefined if element has no children', () => {
    const element = createElement('div', null);
    expect(substance({ children: element })).toBeUndefined();
  });
});
