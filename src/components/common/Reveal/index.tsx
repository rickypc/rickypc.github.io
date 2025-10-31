/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, key } from '@site/src/data/common';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type JSX,
  memo,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

type NestedElement<P = {}> = ReactElement<P & { children?: JSX.Element[] | string }>;

type PhraseProps = RevealProps & {
  delays?: string[];
};

export type RevealProps = {
  children: ReactNode;
  coeff?: number;
};

type WordProps = {
  children: string;
  delay: number;
};

const Character = memo(function Character({ children }: PropsWithChildren): ReactElement {
  return (
    <LazyMotion features={domAnimation}>
      <m.span
        aria-hidden
        className={styles.character}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
      >
        {children}
      </m.span>
    </LazyMotion>
  );
});

const Word = memo(function Word({ children, delay }: WordProps): ReactElement {
  return (
    <LazyMotion features={domAnimation}>
      <m.span
        animate="show"
        aria-hidden
        className={styles.word}
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              delayChildren: delay * 0.25,
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {children.split('').map((character, pos) => (
          <Character key={key(`${children}-${character}-${pos}`)}>{character}</Character>
        ))}
      </m.span>
    </LazyMotion>
  );
});

// After Word assignment.
const Phrase = memo(function Phrase({ children, coeff = 0, delays }: PhraseProps): ReactNode {
  const prefix = delays?.join(' ');

  const words = (text: string) => text.split(' ').filter((word) => word).map((word) => (
    <Word delay={coeff + (delays?.indexOf(word) || 0)} key={key(`${prefix}-${word}`)}>{word}</Word>
  ));

  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      const element = child as NestedElement;
      const text = element.props.children as string;
      return cloneElement(element, {
        ...element.props,
        children: words(text),
        key: key(`${prefix}-${text}`),
      });
    }
    return words(child as string);
  });
});

export default memo(function Reveal({ children, coeff }: RevealProps): ReactElement {
  const label: ReactNode[] = [];
  const phrases = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === Fragment) {
      const fragment = child as NestedElement;
      if (Array.isArray(fragment.props.children)) {
        return fragment.props.children.map((grand, index) => {
          const text = typeof (grand) === 'string' ? grand : grand.props.children;
          label.push(text);
          return <Phrase coeff={coeff} key={key(text, String(index))}>{grand}</Phrase>;
        });
      }
      const text = fragment.props.children;
      label.push(text);
      return <Phrase coeff={coeff} key={key(text, '0')}>{text}</Phrase>;
    }
    const text = child;
    label.push(text);
    return <Phrase coeff={coeff} key={key(text, '0')}>{text}</Phrase>;
  }) as NestedElement<{ delays: string[] }>[];
  // After processing above completed.
  const delays = label.join('').split(' ');
  const { ref, visible } = useVisibility<HTMLSpanElement | null>();

  return (
    <span aria-hidden className={clsx(styles.phrases, visible && styles.play)} ref={ref} translate="no">
      {phrases.map((phrase) => cloneElement(phrase, { ...phrase.props, delays }))}
    </span>
  );
});
