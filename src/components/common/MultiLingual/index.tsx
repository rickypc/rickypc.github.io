/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { memo, type PropsWithChildren, type ReactElement } from 'react';
import PhraseBlock from '@site/src/components/common/PhraseBlock';

export type MultiLingualProps = {
  chinese?: PropsWithChildren;
  pali?: PropsWithChildren<{
    sinhala?: PropsWithChildren;
  }>;
  sanskrit?: PropsWithChildren<{
    siddham?: PropsWithChildren;
  }>;
  thai?: PropsWithChildren;
  tibetan?: PropsWithChildren;
  transliteration?: Transliteration;
};

export type Transliteration = {
  className?: string;
  repetition?: number;
  speech?: string;
  title?: string;
  unify?: boolean;
};

/**
 * MultiLingual component for managing written representations of
 * multiple languages and their script variants. Focused on script-level
 * rendering rather than spoken language or translation.
 *
 * Supported languages and their scripts:
 * - Chinese: default script assumed (Han characters).
 * - Pali: default script assumed; optionally supports Sinhala.
 * - Sanskrit: default script is Devanagari; also supports Siddham.
 * - Thai: default script assumed.
 * - Tibetan: default script assumed.
 * - Transliteration: always available; represents phonetic spelling using Latin
 *   characters (e.g., 'ॐ' -> 'oṃ').
 *
 * Each language may include multiple script variants. The default or
 * most commonly used script is defined directly under the language key,
 * while additional scripts are nested under named properties.
 * @param {object} props - Component props.
 * @param {object} props.languages - Spread of supported language keys
 *   (e.g., sanskrit, chinese, pali). Each language key maps to an object
 *   containing written forms:
 *     - Default script is defined directly under the key.
 *     - Additional scripts are nested under named properties
 *       (e.g., siddham, sinhala).
 * @param {object} props.transliteration - Latin-script representation of
 *   the text.
 * @example
 * {
 *   chinese: {
 *     ...definition // Han characters
 *   },
 *   pali: {
 *     ...definition,
 *     sinhala: { ... }
 *   },
 *   sanskrit: {
 *     ...definition, // Devanagari
 *     siddham: { ... }
 *   },
 *   transliteration: { ... }
 * }
 */
export default memo(function MultiLingual({
  transliteration = {},
  ...languages
}: MultiLingualProps): ReactElement {
  return (
    <>
      {languages?.sanskrit?.children && (
        <PhraseBlock
          infix="।"
          phrase={{
            ...languages.sanskrit,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="॥"
        />
      )}
      {languages?.sanskrit?.siddham?.children && (
        <PhraseBlock
          infix="𑗂"
          phrase={{
            ...languages.sanskrit.siddham,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="𑗃"
        />
      )}
      {languages?.tibetan?.children && (
        <PhraseBlock
          infix="།"
          phrase={{
            ...languages.tibetan,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="༄༅། །"
          suffix="༎"
        />
      )}
      {languages?.pali?.children && (
        <PhraseBlock
          infix="."
          phrase={{
            ...languages.pali,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="෴"
        />
      )}
      {languages?.pali?.sinhala?.children && (
        <PhraseBlock
          infix="."
          phrase={{
            ...languages.pali.sinhala,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="෴"
        />
      )}
      {languages?.chinese?.children && (
        <PhraseBlock
          infix="·"
          phrase={{
            ...languages.chinese,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="。"
        />
      )}
      {languages?.thai?.children && (
        <PhraseBlock
          infix="ฯ"
          phrase={{
            ...languages.thai,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="๚"
        />
      )}
    </>
  );
});
