/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren } from 'react';

type Commentary = { color?: string; style?: string; text: string };

type Commentaries = Array<Commentary | string> | string;

export const body = (phrase: PropsWithChildren, infix: string = '।') => {
  const group = Array.isArray(phrase.children) ? phrase.children : [phrase.children];
  const last = group.length - 1;
  return group.flatMap((words, index) => {
    const text = `${words?.props?.children ? words.props.children : words}`;
    return `${text ? `${text}${index !== last ? infix : ''}` : ''}`;
  }).join('\n');
};

export const instruction = (commentaries: Commentaries) => ({
  text: [
    ...((Array.isArray(commentaries) ? commentaries : [commentaries])
      .map((text) => (typeof (text) === 'string' ? { style: 'instruction', text } : text))),
  ],
});

// After instruction assignment.
export const header = (title: string, commentaries: Commentaries = '') => (commentaries?.length ? {
  style: 'section-set',
  text: [{ style: 'section', text: title }, instruction(commentaries)],
} : { style: ['section', 'section-set'], text: title });

export const main = (sanskrit: Commentaries, transliteration: Commentaries, repetition = 0) => ([
  { style: 'sanskrit', text: sanskrit },
  repetition ? {
    style: 'phrase-set',
    text: [
      { style: 'phrase', text: transliteration },
      { style: 'repetition', text: ` [${repetition}x]` },
    ],
  } : { style: ['phrase', 'phrase-set'], text: transliteration },
]);

export const phrase = (path: string, commentaries: Commentaries = '', repetition = 0, title = '') => {
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const { default: { sanskrit, translation, transliteration } } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  return [
    header(title || `${transliteration.title}${translation?.title ? ` [${translation.title}]` : ''}`, commentaries),
    ...main(`${body(sanskrit)}॥`, `${body(transliteration)}॥`, repetition || transliteration.repetition),
  ];
};

export const phrases = (path: string, commentaries: Commentaries = '', repetition = 0, title = '') => {
  /* eslint-disable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  const { default: { sanskrit, translation, transliteration } } = require(path);
  /* eslint-enable global-require,import/no-dynamic-require,security/detect-non-literal-require */
  return [
    [
      header(title || `${transliteration.title}${translation?.title ? ` [${translation.title}]` : ''}`, commentaries),
      ...main(
        `${body({ children: sanskrit.children.slice(0, sanskrit.children.indexOf('')) })}।`,
        `${body({ children: transliteration.children.slice(0, transliteration.children.indexOf('')) })}।`,
      ),
    ],
    [
      header(title || `${transliteration.title}${translation?.title ? ` [${translation.title}]` : ''}`, ' (continued)'),
      ...main(
        `${body({ children: sanskrit.children.slice(sanskrit.children.indexOf('') + 1) })}॥`,
        `${body({ children: transliteration.children.slice(transliteration.children.indexOf('') + 1) })}॥`,
        repetition || transliteration.repetition,
      ),
    ],
  ];
};
