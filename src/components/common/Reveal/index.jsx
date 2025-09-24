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
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { useVisibility } from '@site/src/hooks/observer';
import styles from './styles.module.css';

const Character = memo(function Character({ children }) {
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
Character.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const Word = memo(function Word({ children, delay }) {
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
Word.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  delay: PropTypes.number,
};

// After Word assignment.
const Phrase = memo(function Phrase({ children, coeff = 0, delays }) {
  const prefix = delays.join(' ');

  const words = (text) => text.split(' ').filter((word) => word).map((word) => (
    <Word delay={coeff + delays.indexOf(word)} key={key(`${prefix}-${word}`)}>{word}</Word>
  ));

  return Children.map(children, (child) => {
    const text = child?.type ? child.props.children : child;
    if (child?.type) {
      return cloneElement(child, {
        ...child.props,
        children: words(text),
        key: key(`${prefix}-${text}`),
      });
    }
    return words(text);
  });
});
Phrase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  coeff: PropTypes.number,
  delays: PropTypes.arrayOf(PropTypes.string),
};

export default memo(Object.assign(function Reveal({ children, coeff }) {
  const label = [];
  const phrases = Children.map(children, (child) => {
    if (child?.type === Fragment) {
      if (Array.isArray(child.props.children)) {
        return child.props.children.map((grand, index) => {
          const text = typeof (grand) === 'string' ? grand : grand.props.children;
          label.push(text);
          return <Phrase coeff={coeff} key={key(text, index)}>{grand}</Phrase>;
        });
      }
      const text = child.props.children;
      label.push(text);
      return <Phrase coeff={coeff} key={key(text, 0)}>{text}</Phrase>;
    }
    const text = child;
    label.push(text);
    return <Phrase coeff={coeff} key={key(text, 0)}>{text}</Phrase>;
  });
  // After processing above completed.
  const delays = label.join('').split(' ');
  const { ref, visible } = useVisibility();

  return (
    <span aria-hidden className={clsx(styles.phrases, visible && styles.play)} ref={ref} translate="no">
      {phrases.map((phrase) => cloneElement(phrase, { ...phrase.props, delays }))}
    </span>
  );
}, {
  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    coeff: PropTypes.number,
  },
}));
