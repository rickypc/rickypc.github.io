/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { key, tail } from '@site/src/data/common';
import { memo, type PropsWithChildren, type ReactElement } from 'react';
import PhraseBlock from '@site/src/components/common/PhraseBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

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
  title?: string;
  unify?: boolean;
};

const linguals = [
  {
    infix: '।', label: 'संस्कृतम्-Sanskrit', prefix: '꣼ ', suffix: '॥',
  },
  {
    group: 'sanskrit', infix: '𑗂', label: '𑖭𑖿𑖠𑖩𑖿-Siddhaṃ', prefix: '꣼ ', suffix: '𑗃',
  },
  {
    infix: '།', label: 'བོད་སྐད་-Tibetan', prefix: '༄༅། །', suffix: '༎',
  },
  {
    infix: '.', label: 'Pāli', prefix: '꣼ ', suffix: '෴',
  },
  {
    group: 'pali', infix: '.', label: 'සිංහල-Sinhala', prefix: '꣼ ', suffix: '෴',
  },
  {
    infix: '·', label: '中文-Chinese', prefix: '꣼ ', suffix: '。',
  },
  {
    infix: 'ฯ', label: 'ไทย-Thai', prefix: '꣼ ', suffix: '๚',
  },
];

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
  transliteration = {}, ...languages
}: MultiLingualProps): ReactElement | null {
  const tabs = linguals.map(({
    group, infix, label, prefix, suffix,
  }) => {
    const lang = tail(key(label), '-');
    const path = group?.split('.') ?? [];
    path.push(lang);
    // eslint-disable-next-line security/detect-object-injection
    const phrase = path.reduce((acc: any, segment) => acc?.[segment], languages);
    if (!phrase?.children) {
      return null;
    }
    return (
      <TabItem key={lang} label={label} value={lang}>
        <PhraseBlock
          infix={infix}
          phrase={{
            ...phrase,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix={prefix}
          suffix={suffix}
        />
      </TabItem>
    );
  }).filter(Boolean);
  return tabs.length ? (<Tabs groupId="multi-lingual">{tabs}</Tabs>) : null;
});
