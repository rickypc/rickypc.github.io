/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { body, properCase } from '#buddhism/media/_common';
import { type Repeat } from '#buddhism/media/pdf/_strip';
import { oneLine } from '#root/src/data/common';
import { type PropsWithChildren } from 'react';

type Geometry = {
  delimiter: string;
  font: string;
  fontSizes: Typography;
  infix: string;
  lineHeight: number;
  phrase: LanguageProps;
};

type GeometryFactory = () => Partial<Geometry>;

type Language = {
  repeat: Repeat;
  title: string;
  typography?: {
    thangka?: Typography;
  };
};

type LanguageProps = PropsWithChildren<Language>;

type Languages = {
  default: {
    lang: string;
    sanskrit: LanguageProps;
    tibetan: LanguageProps;
    total: number;
    transliteration: LanguageProps;
  };
};

type Typography = {
  default: number;
  double: number;
  single: number;
};

export const BASE_GEOMETRY = Object.freeze({
  delimiter: ' ',
  font: 'NotoSans',
  fontSizes: { default: 10, double: 30, single: 52.5 },
  infix: '|',
  lineHeight: 0.85,
});

export const languageFontSizes = (
  context: LanguageProps,
): Typography => context?.typography?.thangka || BASE_GEOMETRY.fontSizes;

export const languageGeometry = (
  lang: string,
  sanskrit: LanguageProps,
  tibetan: LanguageProps,
  transliteration: LanguageProps,
) => {
  const fallback: GeometryFactory = () => ({
    fontSizes: languageFontSizes(transliteration),
    phrase: transliteration,
  });
  const geometries = new Map<string, GeometryFactory>([
    ['bo-CN', () => ({
      delimiter: '་',
      font: 'Kokonor',
      fontSizes: languageFontSizes(tibetan),
      infix: '།',
      phrase: tibetan,
    })],
    ['sa-IN', () => ({
      font: 'NotoSerifDevanagari',
      fontSizes: languageFontSizes(sanskrit),
      infix: '।',
      phrase: sanskrit,
    })],
  ]);
  const geometry = (geometries.get(lang) || fallback)();
  return { ...BASE_GEOMETRY, ...geometry };
};

/**
 * Generates a pdfMake object for `thangka backside mantra`.
 * @param {string} path - Multilingual file path.
 * @returns {object} A pdfMake compatible object.
 */
export default async function thangka(path: string) {
  const {
    default: {
      lang = 'bo-CN', sanskrit, tibetan, transliteration,
    },
  }: Languages = await import(path);
  const {
    delimiter, font, fontSizes, infix, lineHeight, phrase,
  } = languageGeometry(lang, sanskrit, tibetan, transliteration);
  const text = `${body(phrase as PropsWithChildren, infix)}${infix}`;
  // After text assignment.
  // eslint-disable-next-line security/detect-non-literal-regexp
  const style = (text.replace(new RegExp(`[${delimiter}${infix}]`, 'g'), '').length / 2) >= 15 ? 'double' : 'single';

  return {
    definition: {
      content: [
        { style: 'bija', text: 'ༀ' },
        { style: 'prayer', margin: [0, -15, 0, 0], text: 'ༀ་སརྦ་བི་དྱཱ་སྭཱ་ཧཱ། ༀ་སརྦ་བི་དྱཱ་སྭཱ་ཧཱ།' },
        { style: 'bija', text: 'ཨཱཿ' },
        { style: 'prayer', text: 'ཨ་ཨཱ། ཨི་ཨཱི། ཨུ་ཨཱུ། རྀ་རཱྀ། ལྀ་ལཱྀ། ཨེ་ཨཻ། ཨོ་ཨཽ། ཨཾ་ཨཿ ཀ་ཁ་ག་གྷ་ང།' },
        { fontSize: 21, text: 'ཙ་ཚ་ཛ་ཛྷ་ཉ། ཊ་ཋ་ཌ་ཌྷ་ཎ། ཏ་ཐ་ད་དྷ་ན། པ་ཕ་བ་བྷ་མ། ཡ་ར་ལ་ཝ། ཤ་ཥ་ས་ཧ་ཀྵ།' },
        { style: 'bija', margin: [0, 30, 0, 0], text: 'ཧཱུྃ' },
        { style: 'prayer', text: 'ༀ་བ་ཛྲཱ་ཡུ་ཥེ་སྭཱ་ཧཱ།' },
        { style, text },
        { style: 'bija', text: 'སྭཱ' },
        { style: 'prayer', text: 'ཡེ་དྷ་རྨཱ་ཧེ་ཏུ་པྲ་བྷ་བཱ་ཧེ་ཏུཾ་ཏེ་ཥཱཾ་ཏ་ཐཱ་ག་ཏ་ཨུ་བཱ་ཙ། ཏེ་ཥཱཾ་ཙ་ཡོ་ནི་རོ་དྷ་ཨེ་བཾ་བཱ་དཱི་མ་ཧཱ་ཤྲ་མ་ཎཿ།' },
        { style: 'bija', text: 'ཧཱ།' },
        { style: 'prayer', text: 'ཨོཾ་སུ་པྲ་ཏིཥྛ་བཛྲ་ཡེ་སྭཱ་ཧཱ།' },
      ],
      defaultStyle: {
        alignment: 'center',
        color: '#cc0000',
        font: 'Kokonor',
        fontSize: fontSizes.default,
        lineHeight,
      },
      info: {
        keywords: oneLine(`This document is about the
          ${transliteration?.title?.toLowerCase()} and its sacred role in
          traditional rituals where prayers are placed on the back of a paubhā
          or thangka to serve as relics in support of purification and the
          removal of obscuration while nurturing wisdom and compassion so that
          practitioners may advance toward Buddhahood`),
        subject: oneLine(`Placing prayers on the back of a paubhā or thangka
          helps purify defilement and obscuration, fosters wisdom and
          compassion, and supports the attainment of Buddhahood in this very
          lifetime`),
        title: `${properCase(transliteration?.title)} paubhā/thangka prayer`,
      },
      pageMargins: [7.5, 0, 7.5, 0],
      pageOrientation: 'portrait',
      pageSize: 'LETTER',
      styles: {
        bija: { fontSize: 52.5, margin: [0, 25, 0, 0] },
        double: { font, fontSize: fontSizes.double, margin: [0, 42.5, 0, 0] },
        prayer: { fontSize: 21, margin: [0, 5, 0, 0] },
        single: { font, fontSize: fontSizes.single, margin: [0, 25, 0, -10] },
      },
    },
    options: {},
  };
}
