/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const body = (infix, lastPhrase, prefix, repeat, suffix, text) => ({
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

export const substance = (children) => (Array.isArray(children) || typeof (children) === 'string'
  ? children : children?.props?.children);
