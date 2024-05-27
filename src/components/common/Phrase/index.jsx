/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import CodeBlock from '@theme/CodeBlock';
import { memo } from 'react';
import PropTypes from 'prop-types';
import Repetition from '@site/src/components/common/Repetition';
import RollPrint from '@site/src/components/common/RollPrint';
import Speech from '@site/src/components/common/Speech';

export default memo(Object.assign(function Phrase({
  repetition = 0,
  sanskrit,
  tibetan,
  transliteration,
}) {
  if (!transliteration) {
    return null;
  }
  let lang = 'bo-CN';
  let print = tibetan;
  if (!print?.children) {
    lang = 'sa-IN';
    print = sanskrit;
  }
  return (
    <>
      <CodeBlock>
        {transliteration.children}
        ॥
      </CodeBlock>
      <Repetition value={repetition || transliteration.repetition} />
      {print.children && (
        <RollPrint label={transliteration.title} lang={lang} repeat={print.repeat}>
          {print.children}
        </RollPrint>
      )}
      <Speech>{transliteration.speech}</Speech>
    </>
  );
}, {
  propTypes: {
    repetition: PropTypes.number,
    sanskrit: PropTypes.shape(),
    tibetan: PropTypes.shape(),
    transliteration: PropTypes.shape(),
  },
}));
