/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import CodeBlock from '@theme/CodeBlock';
import { memo } from 'react';
import PropTypes from 'prop-types';

export default memo(Object.assign(function MultiLingual({
  chinese,
  sanskrit,
  tibetan,
}) {
  return (
    <>
      {sanskrit && (
        <CodeBlock title={sanskrit.title}>
          {sanskrit.children}
          ॥
        </CodeBlock>
      )}
      {tibetan && (
        <CodeBlock title={tibetan.title}>
          {tibetan.children}
          ༎
        </CodeBlock>
      )}
      {chinese && (
        <CodeBlock title={chinese.title}>
          {chinese.children}
          。
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
