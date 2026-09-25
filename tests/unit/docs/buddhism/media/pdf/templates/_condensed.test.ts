/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { body, substance } from '#buddhism/media/pdf/_strip';
import condensed from '#buddhism/media/pdf/templates/_condensed';

const geometries = {
  'bo-CN': { lineHeight: 0.895, prefixFont: 'Kokonor', rollFont: 'Kokonor' },
  'sa-IN': { lineHeight: 0.86, prefixFont: 'NotoSerifDevanagari', rollFont: 'NotoSerifDevanagari' },
};

type GeometryKey = keyof typeof geometries;

mock.module('#buddhism/media/pdf/_strip', () => ({
  body: mock(() => 'BODY_RESULT'),
  languageGeometry: mock((_, lang, sanskrit, tibetan, transliteration) => {
    const phrases = { 'bo-CN': tibetan, 'sa-IN': sanskrit };
    return {
      fontSizes: { default: lang === 'bo-CN' ? 9 : 2, title: 1.75 },
      height: 36.7925,
      infix: '།',
      lineHeight: geometries[lang as GeometryKey]?.lineHeight || 0.71,
      paddingBottom: 0,
      paddingTop: 1.15,
      prefix: '༄༅། ',
      prefixFont: geometries[lang as GeometryKey]?.prefixFont || 'NotoSerifDevanagari',
      rollFont: geometries[lang as GeometryKey]?.rollFont || 'NotoSerifDevanagari',
      suffix: '༎',
      text: substance(phrases[lang as GeometryKey] || transliteration),
    };
  }),
  subsequentBody: mock(
    (fontSizes, infix, prefix, repeat, repeatKey, suffix, text, transliteration) => {
      const count = repeat?.[repeatKey as keyof typeof repeat] || 1;
      return [
        [
          {
            text: [
              {
                fontSize: fontSizes?.title,
                text: `${transliteration?.title?.toUpperCase()} ${count}x `,
              },
              body(infix, count - 1, prefix, count, suffix, text),
            ],
          },
        ],
      ];
    },
  ),
  substance: mock(() => 'SUBSTANCE_RESULT'),
}));

describe('docs.buddhism.media.pdf.templates._condensed', () => {
  test('handles Tibetan (bo-CN) branch correctly', async () => {
    mock.module('#buddhism/bo', () => ({
      __esModule: true,
      default: {
        lang: 'bo-CN',
        tibetan: {
          repeat: { condensed: 3 },
          typography: { condensed: { default: 9, title: 7 } },
        },
        total: 3,
        transliteration: { title: 'Mantra' },
      },
    }));

    const result = await condensed('#buddhism/bo');
    const { definition } = result;

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
    const { layout } = definition.content[0][0] as any;
    expect(layout.hLineWidth()).toBe(0.25);
    expect(layout.paddingBottom()).toBe(0);
    expect(layout.paddingLeft()).toBe(1.5);
    expect(layout.paddingRight()).toBe(1);
    expect(layout.paddingTop()).toBe(1.15);
    expect(layout.vLineWidth()).toBe(0.25);
  });

  test('handles Sanskrit (sa-IN) branch correctly', async () => {
    mock.module('#buddhism/sa', () => ({
      __esModule: true,
      default: {
        lang: 'sa-IN',
        total: 2,
        transliteration: { title: 'Dhāraṇī' },
      },
    }));

    const result = await condensed('#buddhism/sa');
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

  test('handles default (transliteration) branch correctly', async () => {
    mock.module('#buddhism/default', () => ({
      __esModule: true,
      default: {
        lang: 'en-US',
        total: 1,
        transliteration: { title: 'OM MANI PADME HUM' },
      },
    }));

    const result = await condensed('#buddhism/default');
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

  test('uses all fallback defaults when fields are missing', async () => {
    mock.module('#buddhism/fallback', () => ({
      __esModule: true,
      default: { transliteration: { title: 'Fallback' } },
    }));

    const result = await condensed('#buddhism/fallback');
    const { definition } = result;

    // Default font sizes + lineHeight.
    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 9,
      lineHeight: 0.895,
    });

    // Default repeat = 1 -> lastPhrase = 0.
    expect(body).toHaveBeenCalledTimes(18);

    // Last roll empty canvas.
    const [, lastCanvas] = definition.content[17];
    expect(lastCanvas).toEqual({ canvas: [] });
  });
});
