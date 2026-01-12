/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { GenIcon } from 'react-icons/lib';
import { type IconBaseProps } from 'react-icons';
import Image, { type ImageSource } from '@site/src/components/common/Image';
import {
  clsx,
  fileName,
  key,
  tail,
} from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import MDXDetails from '@theme-original/MDXComponents/Details';
import { memo, type ReactElement, type ReactNode } from 'react';
import pdf from '#buddhism/pdf/_index';
import PhraseBlock from '@site/src/components/common/PhraseBlock';
import Speech from '@site/src/components/common/Speech';
import { type Transliteration } from '@site/src/components/common/MultiLingual';
import styles from './styles.module.css';

type InstructionProps = {
  image?: ImageSource;
  text?: ReactNode;
  transliteration: Transliteration;
};

export type PhraseProps = {
  image?: ImageSource;
  instruction?: ReactNode;
  repetition?: number;
  path: string;
  transliteration?: Transliteration;
};

type RepetitionProps = {
  value?: number;
};

type SupportProps = {
  path: string;
  repetition?: number;
  transliteration: Transliteration;
};

/**
 * Renders the `prayer wheel` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrCycle(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M13,20 C19,19 21,14 21,10 M14,16 L12,20 L16,23 M0,9 L4,6 L7,10 M9.00000008,20 C3,17 2.00000006,12 3.99999998,6 M20,6.99999999 C16,0.99999995 10,1 6,4.00609254 M20,2 L20,7 L15,7' }, child: [] }] })(props);
}

/**
 * Renders the `thangka backside mantra` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrDocumentImage(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M4.99787498,6.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L19.9999998,23 M18,1 L18,6 L23,6 M3,11 L16,11 L16,23 L3,23 L3,11 Z M7,16 C7.55228475,16 8,15.5522847 8,15 C8,14.4477153 7.55228475,14 7,14 C6.44771525,14 6,14.4477153 6,15 C6,15.5522847 6.44771525,16 7,16 Z M5,23 L7,20 L9,22 L13,16 L16,20' }, child: [] }] })(props);
}

/**
 * Renders the `condensed prayer roll` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrDocumentStore(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M4.99787498,6.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L17,23 M18,1 L18,6 L23,6 M3,12 C3,12 4,10 9,10 C14,10 15,12 15,12 L15,21 C15,21 14,23 9,23 C4,23 3,21 3,21 L3,12 Z M3,17 C3,17 5,19 9,19 C13,19 15,17 15,17 M3,13 C3,13 5,15 9,15 C13,15 15,13 15,13' }, child: [] }] })(props);
}

/**
 * Renders the `prayer roll` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
function GrDocumentText(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M6,16 L16,16 L6,16 L6,16 Z M6,12 L18,12 L6,12 L6,12 Z M6,8 L11,8 L6,8 L6,8 Z M14,1 L14,8 L21,8 M3,23 L3,1 L15,1 L21,7 L21,23 L3,23 Z' }, child: [] }] })(props);
}

/**
 * Renders the `print` icon.
 * @param {object} props - React props passed to the icon component.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {object} [props.style] - Optional inline styles.
 * @param {string} [props.title] - Optional title for accessibility.
 * @returns {object} The icon.
 */
export function GrPrint(props: IconBaseProps): ReactElement {
  return GenIcon({ tag: 'svg', attr: { viewBox: '0 0 24 24' }, child: [{ tag: 'path', attr: { fill: 'none', strokeWidth: '2', d: 'M6,19 L1,19 L1,7 L23,7 L23,19 L18,19 M3,16 L21,16 M6,16 L6,23 L6,23 L18,23 L18,16 M18,7 L18,1 L6,1 L6,7 L6,7 M17,12 L19,12 L19,11 L17,11 L17,12 Z' }, child: [] }] })(props);
}

export const Instruction = memo(function Instruction({
  image,
  text,
  transliteration,
}: InstructionProps): ReactElement | undefined {
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

const Repetition = memo(function Repetition({
  value = 1,
}: RepetitionProps): ReactElement | null {
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
});

// istanbul ignore next
const Support = memo(function Support({
  path,
  repetition = 0,
  transliteration,
}: SupportProps): ReactElement | null {
  const alias = `#${tail(path, '/buddhism')}`;
  const hasCondensed = pdf.some(([template, source]) => template === 'condensed' && source === alias);
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
          <GrDocumentText />
        </Link>
      )}
      {hasCondensed && (
        <Link
          className={styles.icon}
          href={key(fileName(path, 'condensed'), '/pdf', '/', 'pdf', '.')}
          rel="noopener noreferrer"
          target="_blank"
          title={`Open ${transliteration.title} condensed prayer roll`}
        >
          <GrDocumentStore />
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
          <GrCycle />
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
          <GrDocumentImage />
        </Link>
      )}
      <Speech>{transliteration.speech}</Speech>
    </div>
  );
});

export default memo(function Phrase({
  image,
  instruction,
  path,
  repetition = 0,
  transliteration,
}: PhraseProps): ReactElement | null {
  if (!transliteration) {
    return null;
  }
  return (
    <>
      <Instruction {...{ image, text: instruction, transliteration }} />
      <PhraseBlock
        infix="।"
        phrase={{ ...transliteration, title: '' }}
        prefix="꣼ "
        suffix="॥"
      />
      <Support {...{ path, repetition, transliteration }} />
    </>
  );
});
