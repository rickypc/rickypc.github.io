/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

export type Substance = string | string[];

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

export const substance = ({ children }: PropsWithChildren): Substance => (
  Array.isArray(children) || typeof (children) === 'string'
    ? children : (children as ReactElement<{ children: Substance }>)?.props?.children
);
