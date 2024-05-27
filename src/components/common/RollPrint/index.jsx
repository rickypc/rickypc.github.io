/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { GenIcon } from 'react-icons/lib';
import { memo } from 'react';
import Print from '@site/src/components/common/Print';
import PropTypes from 'prop-types';

function FaScroll(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 576 512' }, child: [{ tag: 'path', attr: { d: 'M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z' }, child: [] }] })(props);
}

export default memo(Object.assign(function RollPrint({
  children,
  label = '',
  lang = 'bo-CN',
  repeat = 1,
  total = 6,
  ...props
}) {
  let infix = '|';
  const lastPhrase = repeat - 1;
  const lastRoll = total - 1;
  let lineHeight = 0.71;
  let paddingBottom = 2.5;
  let paddingTop = 0;
  // Siddhaṃ sign.
  let prefix = '꣼ ';
  let prefixFont = 'NotoSerifDevanagari';
  let rollFont = 'NotoSans';
  let suffix = '||';

  switch (lang) {
    case 'bo-CN':
      infix = '།';
      lineHeight = 0.84;
      paddingBottom = 1;
      paddingTop = 0.25;
      prefix = '༄༅། ';
      prefixFont = 'Kokonor';
      rollFont = 'Kokonor';
      suffix = '༎';
      break;
    case 'sa-IN':
      infix = '।';
      lineHeight = 0.805;
      paddingBottom = 1;
      paddingTop = 1;
      rollFont = 'NotoSerifDevanagari';
      suffix = '॥';
      break;
    default:
      // no-op.
  }

  const layouts = {
    roll: {
      paddingBottom: () => paddingBottom,
      paddingLeft: () => 2.5,
      paddingRight: () => 2.5,
      paddingTop: () => paddingTop,
    },
  };
  const text = typeof (children) === 'string'
    ? children : children.props.children;

  const content = Array.from({ length: total }, (_total, index) => ([
    {
      layout: 'roll',
      margin: [0, 0, 0, index === lastRoll ? 0 : 7.5],
      table: {
        body: [
          [
            [
              {
                text: [
                  {
                    fontSize: 4,
                    text: `${label.toUpperCase()} ${repeat}x `,
                  },
                  {
                    text: [
                      { style: 'prefix', text: prefix },
                      {
                        text: Array.from(
                          { length: repeat },
                          (_repeat, idx) => ({
                            style: 'roll',
                            text: `${infix}${text}${idx === lastPhrase ? '' : `${infix} `}`,
                          }),
                        ),
                      },
                      { style: 'roll', text: suffix },
                    ],
                  },
                ],
              },
            ],
          ],
        ],
        heights: [65],
      },
    },
    index === lastRoll ? null : {
      canvas: [
        {
          dash: { length: 3.5, space: 2.5 },
          lineWidth: 1,
          type: 'line',
          x1: 0,
          x2: 777,
          y1: 0,
          y2: 0,
        },
      ],
      margin: [0, 0, 0, 7.5],
    },
  ]));

  // After font assignment.
  const definition = {
    content,
    defaultStyle: { font: 'NotoSans', fontSize: 6, lineHeight },
    pageMargins: [7.5, 7.5, 7.5, 7.5],
    pageOrientation: 'landscape',
    pageSize: 'LETTER',
    styles: {
      prefix: { font: prefixFont },
      roll: { font: rollFont },
    },
  };

  return (
    <Print
      {...props}
      definition={definition}
      Icon={FaScroll}
      label={`Print ${label} mantra roll`}
      lang={lang}
      layouts={layouts}
      title={label}
    />
  );
}, {
  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    lang: PropTypes.string,
    repeat: PropTypes.number,
    total: PropTypes.number,
  },
}));
