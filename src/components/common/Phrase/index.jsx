/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
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

/**
 * @description Renders the `File Image` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function FaFileImage(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 384 512' }, child: [{ tag: 'path', attr: { d: 'M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6H216 176 128 80c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z' }, child: [] }] })(props);
}

/**
 * @description Renders the `Print` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
export function FaPrint(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 512 512' }, child: [{ tag: 'path', attr: { d: 'M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z' }, child: [] }] })(props);
}

/**
 * @description Renders the `Rev` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function FaRev(props) {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 448 512' }, child: [{ tag: 'path', attr: { d: 'M289.67 274.89a65.57 65.57 0 1 1-65.56-65.56 65.64 65.64 0 0 1 65.56 65.56zm139.55-5.05h-.13a204.69 204.69 0 0 0-74.32-153l-45.38 26.2a157.07 157.07 0 0 1 71.81 131.84C381.2 361.5 310.73 432 224.11 432S67 361.5 67 274.88c0-81.88 63-149.27 143-156.43v39.12l108.77-62.79L210 32v38.32c-106.7 7.25-191 96-191 204.57 0 111.59 89.12 202.29 200.06 205v.11h210.16V269.84z' }, child: [] }] })(props);
}

/**
 * @description Renders the `Scroll` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
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
  const hasRoll = pdf.some(([template, source]) => template === 'roll' && source === alias);
  const hasThangka = pdf.some(([template, source]) => template === 'thangka' && source === alias);
  const hasWheel = pdf.some(([template, source]) => template === 'wheel' && source === alias);
  const value = repetition || transliteration.repetition;
  if (!value && !hasRoll && !hasThangka && !hasWheel && !transliteration.speech) {
    return null;
  }
  return (
    <div className={styles.support}>
      <Repetition value={value} />
      {hasRoll && (
        <Link
          className={styles.icon}
          href={key(fileName(path, 'roll'), '/pdf', '/', 'pdf', '.')}
          rel="noopener noreferrer"
          target="_blank"
          title={`Open ${transliteration.title} prayer roll`}
        >
          <FaScroll />
        </Link>
      )}
      {hasWheel && (
        <Link
          className={styles.icon}
          href={key(fileName(path, 'wheel'), '/pdf', '/', 'pdf', '.')}
          rel="noopener noreferrer"
          target="_blank"
          title={`Open ${transliteration.title} prayer wheel`}
        >
          <FaRev />
        </Link>
      )}
      {hasThangka && (
        <Link
          className={styles.icon}
          href={key(fileName(path, 'thangka'), '/pdf', '/', 'pdf', '.')}
          rel="noopener noreferrer"
          target="_blank"
          title={`Open ${transliteration.title} paubhā/thangka prayer`}
        >
          <FaFileImage />
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
