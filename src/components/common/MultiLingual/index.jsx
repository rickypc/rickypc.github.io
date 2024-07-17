/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { memo } from 'react';
import PhraseBlock from '@site/src/components/common/PhraseBlock';
import PropTypes from 'prop-types';

export default memo(Object.assign(function MultiLingual({
  chinese,
  pali,
  sanskrit,
  thai,
  tibetan,
  transliteration = {},
}) {
  return (
    <>
      {sanskrit?.children && (
        <PhraseBlock
          infix="।"
          phrase={{
            ...sanskrit,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="॥"
        />
      )}
      {sanskrit?.siddham?.children && (
        <PhraseBlock
          infix="𑗂"
          phrase={{
            ...sanskrit.siddham,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="𑗃"
        />
      )}
      {tibetan?.children && (
        <PhraseBlock
          infix="།"
          phrase={{
            ...tibetan,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="༄༅། །"
          suffix="༎"
        />
      )}
      {pali?.sinhala?.children && (
        <PhraseBlock
          infix="."
          phrase={{
            ...pali.sinhala,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="෴"
        />
      )}
      {chinese?.children && (
        <PhraseBlock
          infix="·"
          phrase={{
            ...chinese,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="。"
        />
      )}
      {thai?.children && (
        <PhraseBlock
          infix="ฯ"
          phrase={{
            ...thai,
            className: transliteration.className,
            unify: transliteration.unify,
          }}
          prefix="꣼ "
          suffix="๚"
        />
      )}
    </>
  );
}, {
  propTypes: {
    chinese: PropTypes.shape(),
    sanskrit: PropTypes.shape(),
    tibetan: PropTypes.shape(),
    transliteration: PropTypes.shape(),
  },
}));
