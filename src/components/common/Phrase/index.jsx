/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { GenIcon } from 'react-icons/lib';
import Image from '@site/src/components/common/Image';
import {
  clsx,
  fileName,
  key,
  tail,
} from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import MDXDetails from '@theme-original/MDXComponents/Details';
import { memo } from 'react';
import PhraseBlock from '@site/src/components/common/PhraseBlock';
import PropTypes from 'prop-types';
import Speech from '@site/src/components/common/Speech';
// eslint-disable-next-line import/extensions
import pdf from '#buddhism/_pdf.js';
import styles from './styles.module.css';

function FaScroll(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 576 512' }, child: [{ tag: 'path', attr: { d: 'M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z' }, child: [] }] })(props);
}

export const Instruction = memo(function Instruction({ image, text, transliteration }) {
  if (image) {
    return (
      <MDXDetails>
        <summary>{text || transliteration.title}</summary>
        <Image
          alt={transliteration.title}
          className={styles.picture}
          picture={{ fallback: image }}
        />
      </MDXDetails>
    );
  }
  if (text) {
    return <div className={styles.instruction}>{text}</div>;
  }
});
Instruction.propTypes = {
  image: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  transliteration: PropTypes.shape(),
};

const Repetition = memo(Object.assign(function Repetition({ value = 1 }) {
  if (value < 2) {
    return null;
  }
  return (
    <span
      className={clsx(styles.badge, 'badge', 'badge--primary')}
      title={`Preferred repetition: ${value} times`}
    >
      {`${value}x`}
    </span>
  );
}, {
  propTypes: {
    value: PropTypes.number,
  },
}));

const Support = memo(function Support({ path, repetition = 0, transliteration }) {
  const alias = `#${tail(path, '/buddhism')}`;
  const hasRoll = pdf.some((entry) => entry?.[1] === alias);
  const value = repetition || transliteration.repetition;
  if (!value && !hasRoll && !transliteration.speech) {
    return null;
  }
  return (
    <div className={styles.support}>
      <Repetition value={value} />
      {hasRoll && (
        <Link
          className={styles.roll}
          href={key(fileName(path), '/pdf', '/', 'pdf', '.')}
          rel="noopener noreferrer"
          target="_blank"
          title={`Open ${transliteration.title} prayer roll`}
        >
          <FaScroll />
        </Link>
      )}
      <Speech>{transliteration.speech}</Speech>
    </div>
  );
});
Support.propTypes = {
  path: PropTypes.string,
  repetition: PropTypes.number,
  transliteration: PropTypes.shape(),
};

export default memo(Object.assign(function Phrase({
  image,
  instruction,
  path,
  repetition = 0,
  transliteration,
}) {
  if (!transliteration) {
    return null;
  }
  return (
    <>
      <Instruction image={image} text={instruction} transliteration={transliteration} />
      <PhraseBlock
        infix="।"
        phrase={{ ...transliteration, title: '' }}
        prefix="꣼ "
        suffix="॥"
      />
      <Support path={path} repetition={repetition} transliteration={transliteration} />
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
