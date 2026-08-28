/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type Geometry = {
  fontSizes: Typography;
  height: number;
  infix: string;
  lineHeight: number;
  paddingBottom: number;
  paddingTop: number;
  prefix: string;
  prefixFont: string;
  repeat: Repeat;
  rollFont: string;
  suffix: string;
  text: Substance;
};

type GeometryFactory = () => Partial<Geometry>;

type Language = {
  repeat: Repeat;
  title: string;
  typography?: {
    condensed?: Typography;
    roll?: Typography;
    thangka?: Typography;
    wheel?: Typography;
  };
};

export type LanguageProps = PropsWithChildren<Language>;

export type Languages = {
  default: {
    lang: string;
    sanskrit: LanguageProps;
    tibetan: LanguageProps;
    total: number;
    transliteration: LanguageProps;
  };
};

export type Repeat = {
  condensed?: number;
  roll?: number;
  wheel?: number;
};

type RepeatKey = keyof NonNullable<Repeat>;

export type Substance = string | string[];

export type Typography = {
  default: number;
  title: number;
};

type TypographyKey = keyof NonNullable<LanguageProps['typography']>;

export const BASE_GEOMETRY = Object.freeze({
  fontSizes: { default: 6, title: 4 },
  // Geometric box height:
  //   H_geom = (612                 // page height (8.5" * 72pt)
  //     - (7.5 + 0)                 // page margins (top + bottom)
  //     - (6 * (1 + 1))             // box borders (6 boxes, top + bottom)
  //     - (5 * (7.5 + 0.25 + 7.5))  // gaps between boxes: margin + guide line + margin
  //   ) / 6                         // 6 boxes
  // Actual box height used (pdfmake page overhead):
  //   H = H_geom - offset           // offset ≈ 2.2916pt
  height: 83.75,
  infix: '|',
  lineHeight: 0.71,
  paddingBottom: 2.5,
  paddingTop: 0,
  // Siddhaṃ sign.
  prefix: '꣼ ',
  prefixFont: 'NotoSerifDevanagari',
  repeat: {} as Repeat,
  rollFont: 'NotoSans',
  suffix: '||',
  text: '' as Substance,
});

export const body = (
  infix: string,
  lastPhrase: number,
  prefix: string,
  repeat: number,
  suffix: string,
  text: Substance,
) => ({
  text: (Array.isArray(text) ? text : [text]).flatMap((phrase, index) => [
    { style: 'prefix', text: index === 0 ? prefix : ` ${prefix}` },
    {
      text: Array.from(
        { length: repeat },
        (_repeat, idx) => ({
          style: 'roll',
          text: `${infix}${phrase}${idx === lastPhrase ? '' : `${infix} `}`,
        }),
      ),
    },
    { style: 'roll', text: suffix },
  ]),
});

export const CONDENSED_GEOMETRY = Object.freeze({
  ...BASE_GEOMETRY,
  fontSizes: { default: 2, title: 1.75 },
  // Geometric box height:
  //   H_geom = (792                  // page height (11" * 72pt)
  //     - (7.5 + 0)                  // page margins (top + bottom)
  //     - (18 * (0.25 + 0.25))       // box borders (18 boxes, top + bottom)
  //     - (17 * (2.5 + 0.25 + 2.5))  // gaps between boxes: margin + guide line + margin
  //   ) / 18                         // 18 boxes
  // Actual box height used (pdfmake page overhead):
  //   H = H_geom - offset            // offset ≈ 1.3325pt
  height: 36.7925,
});

export const languageFontSizes = (
  context: LanguageProps,
  key: TypographyKey,
): Typography => {
  const fallback = key === 'condensed' ? CONDENSED_GEOMETRY : BASE_GEOMETRY;
  return context?.typography?.[key as TypographyKey] || fallback.fontSizes;
};

export const subsequentBody = (
  fontSizes: Typography,
  infix: string,
  prefix: string,
  repeat: Repeat,
  repeatKey: RepeatKey,
  suffix: string,
  text: Substance,
  transliteration: LanguageProps,
) => {
  const count = repeat?.[repeatKey as RepeatKey] || 1;
  return [
    [
      {
        text: [
          {
            fontSize: fontSizes.title,
            text: `${transliteration?.title?.toUpperCase()} ${count}x `,
          },
          body(infix, count - 1, prefix, count, suffix, text),
        ],
      },
    ],
  ];
};

export const substance = ({ children }: PropsWithChildren): Substance => (
  Array.isArray(children) || typeof (children) === 'string'
    ? children : (children as ReactElement<{ children: Substance }>)?.props?.children
);

// After substance assignment.
export const languageGeometry = (
  fontSizesKey: TypographyKey,
  lang: string,
  sanskrit: LanguageProps,
  tibetan: LanguageProps,
  transliteration: LanguageProps,
): Geometry => {
  const condensed = fontSizesKey === 'condensed';
  // After condensed assignment.
  const base = condensed ? CONDENSED_GEOMETRY : BASE_GEOMETRY;
  const fallback: GeometryFactory = () => ({
    fontSizes: languageFontSizes(transliteration, fontSizesKey),
    repeat: transliteration?.repeat,
    text: substance(transliteration),
  });
  const geometries = new Map<string, GeometryFactory>([
    ['bo-CN', () => ({
      fontSizes: languageFontSizes(tibetan, fontSizesKey),
      infix: '།',
      lineHeight: condensed ? 0.895 : 0.84,
      paddingBottom: condensed ? 0 : 1,
      paddingTop: condensed ? 1.15 : 0.25,
      prefix: '༄༅། ',
      prefixFont: 'Kokonor',
      repeat: tibetan?.repeat,
      rollFont: 'Kokonor',
      suffix: '༎',
      text: substance(tibetan),
    })],
    ['sa-IN', () => ({
      fontSizes: languageFontSizes(sanskrit, fontSizesKey),
      height: condensed ? 36.7925 : 83.175,
      infix: '।',
      lineHeight: condensed ? 0.86 : 0.81,
      paddingBottom: condensed ? 0 : 0.825,
      paddingTop: condensed ? 1.15 : 1,
      repeat: sanskrit?.repeat,
      rollFont: 'NotoSerifDevanagari',
      suffix: '॥',
      text: substance(sanskrit),
    })],
  ]);
  const geometry = (geometries.get(lang) || fallback)();
  return { ...base, ...geometry };
};
