/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import CodeBlock from '@theme/CodeBlock';
import { GenIcon } from 'react-icons/lib';
import Image from '@site/src/components/common/Image';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import MDXDetails from '@theme-original/MDXComponents/Details';
import { memo } from 'react';
import PropTypes from 'prop-types';
import Repetition from '@site/src/components/common/Repetition';
import Speech from '@site/src/components/common/Speech';
// eslint-disable-next-line import/extensions
import pdf from '#buddhism/_pdf.js';
import styles from './styles.module.css';

function FaScroll(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 576 512' }, child: [{ tag: 'path', attr: { d: 'M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z' }, child: [] }] })(props);
}

export default memo(Object.assign(function Phrase({
  image,
  instruction,
  repetition = 0,
  transliteration,
}) {
  if (!transliteration) {
    return null;
  }
  return (
    <>
      {(instruction || image) && (
        <MDXDetails>
          <summary>{instruction || transliteration.title}</summary>
          {image && (
            <Image
              alt={transliteration.title}
              className={styles.picture}
              picture={{ fallback: image }}
            />
          )}
        </MDXDetails>
      )}
      <CodeBlock>
        {transliteration.children}
        ॥
      </CodeBlock>
      <Repetition value={repetition || transliteration.repetition} />
      {Object.prototype.hasOwnProperty.call(pdf, transliteration?.pdf) && (
        <Link
          className={styles.roll}
          href={key(transliteration.title, '/pdf', '/', 'pdf', '.')}
          rel="noopener noreferrer"
          target="_blank"
          title={`Open ${transliteration.title} mantra roll`}
        >
          <FaScroll />
        </Link>
      )}
      <Speech>{transliteration.speech}</Speech>
    </>
  );
}, {
  propTypes: {
    image: PropTypes.string,
    instruction: PropTypes.node,
    repetition: PropTypes.number,
    transliteration: PropTypes.shape(),
  },
}));
