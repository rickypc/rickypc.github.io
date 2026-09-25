/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { body, substance } from '#buddhism/media/pdf/_strip';
import wheel from '#buddhism/media/pdf/templates/_wheel';

const geometries = {
  'bo-CN': {
    lineHeight: 0.84,
    paddingBottom: 1,
    paddingTop: 0.25,
    prefixFont: 'Kokonor',
    rollFont: 'Kokonor',
  },
  'sa-IN': {
    lineHeight: 0.81,
    paddingBottom: 0.825,
    paddingTop: 1,
    prefixFont: 'NotoSerifDevanagari',
    rollFont: 'NotoSerifDevanagari',
  },
};

type GeometryKey = keyof typeof geometries;

mock.module('#buddhism/media/pdf/_strip', () => ({
  body: mock(() => 'BODY_RESULT'),
  languageGeometry: mock((_, lang, sanskrit, tibetan, transliteration) => {
    const geometry = geometries[lang as GeometryKey] || {};
    const phrases = { 'bo-CN': tibetan, 'sa-IN': sanskrit };
    return {
      fontSizes: { default: lang === 'bo-CN' ? 9 : 6, title: 4 },
      height: 83.75,
      infix: '།',
      lineHeight: geometry.lineHeight || 0.71,
      paddingBottom: geometry.paddingBottom || 2.5,
      paddingTop: geometry.paddingTop || 0,
      prefix: '༄༅། ',
      prefixFont: geometry.prefixFont || 'NotoSerifDevanagari',
      rollFont: geometry.rollFont || 'NotoSerifDevanagari',
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

describe('docs.buddhism.media.pdf.templates._wheel', () => {
  test('handles Tibetan (bo-CN) branch correctly', async () => {
    mock.module('#buddhism/bo', () => ({
      __esModule: true,
      default: {
        lang: 'bo-CN',
        tibetan: {
          repeat: { roll: 2, wheel: 3 },
          typography: { wheel: { default: 9, title: 7 } },
        },
        total: 3,
        transliteration: { title: 'Mantra' },
      },
    }));

    const result = await wheel('#buddhism/bo');
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
      lineHeight: 0.84,
    });

    // Prefix/roll fonts.
    expect(definition.styles.prefix.font).toBe('Kokonor');
    expect(definition.styles.roll.font).toBe('Kokonor');

    // 1st page special table.
    const [firstPage] = definition.content[0];
    const { table } = firstPage as any;
    const tableBody = table?.body || [];

    expect(tableBody).toHaveLength(3);
    expect(tableBody[0][0].text).toBe('ༀ');
    expect(tableBody[1][0].text).toBe('ཨཱཿ');
    expect(tableBody[2][0].text).toBe('ཧཱུྃ');

    // RowSpan cell.
    expect(tableBody[0][1].rowSpan).toBe(3);

    // Widths & heights.
    expect(table?.heights).toHaveLength(3);
    expect(table?.widths).toEqual([18, '*']);

    // Last page has empty canvas.
    const [, lastCanvas] = definition.content[2];
    expect(lastCanvas).toEqual({ canvas: [] });

    // Table layout functions.
    const { layout } = definition.content[0][0] as any;
    expect(layout.paddingBottom()).toBe(1);
    expect(layout.paddingLeft()).toBe(2.5);
    expect(layout.paddingRight()).toBe(2.5);
    expect(layout.paddingTop()).toBe(0.25);
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

    const result = await wheel('#buddhism/sa');
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

  test('handles default (transliteration) branch correctly', async () => {
    mock.module('#buddhism/default', () => ({
      __esModule: true,
      default: {
        lang: 'en-US',
        total: 1,
        transliteration: { title: 'OM MANI PADME HUM' },
      },
    }));

    const result = await wheel('#buddhism/default');
    const { definition } = result;

    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 6,
      lineHeight: 0.71,
    });

    expect(definition.info.title).toBe('Om mani padme hum prayer roll');

    expect(substance).toHaveBeenCalledTimes(1);
  });

  test('uses all fallback defaults when fields are missing', async () => {
    mock.module('#buddhism/fallback', () => ({
      __esModule: true,
      default: { transliteration: { title: 'Fallback' } },
    }));

    const result = await wheel('#buddhism/fallback');
    const { definition } = result;

    // Default font sizes + lineHeight.
    expect(definition.defaultStyle).toEqual({
      font: 'NotoSans',
      fontSize: 9,
      lineHeight: 0.84,
    });

    // Default repeat = {} -> wheel=1, roll=1.
    expect(body).toHaveBeenCalledTimes(6);

    // Last roll empty canvas.
    const [, lastCanvas] = definition.content[5];
    expect(lastCanvas).toEqual({ canvas: [] });
  });
});
