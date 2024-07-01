/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import CodeBlock from '@theme/CodeBlock';
import { memo } from 'react';
import PropTypes from 'prop-types';

const body = (prefix, suffix, variant) => (
  <span className={variant.className}>
    {
      (Array.isArray(variant.children) ? variant.children : [variant.children])
        .map((phrase, _, array) => {
          const multi = array.length > 1;
          return (
            <>
              {multi && prefix}
              {phrase}
              {suffix}
              {multi && '\n'}
            </>
          );
        })
    }
  </span>
);

export default memo(Object.assign(function MultiLingual({
  chinese,
  sanskrit,
  tibetan,
}) {
  return (
    <>
      {sanskrit && (
        <CodeBlock title={sanskrit.title}>
          {body('꣼ ', '॥', sanskrit)}
        </CodeBlock>
      )}
      {tibetan && (
        <CodeBlock title={tibetan.title}>
          {body('༄༅། །', '༎', tibetan)}
        </CodeBlock>
      )}
      {chinese && (
        <CodeBlock title={chinese.title}>
          {body('꣼ ', '。', chinese)}
        </CodeBlock>
      )}
    </>
  );
}, {
  propTypes: {
    chinese: PropTypes.shape(),
    sanskrit: PropTypes.shape(),
    tibetan: PropTypes.shape(),
  },
}));
