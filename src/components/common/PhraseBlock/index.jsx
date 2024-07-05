/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, key } from '@site/src/data/common';
import Container from '@theme/CodeBlock/Container';
import CopyButton from '@theme/CodeBlock/CopyButton';
import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { useCodeWordWrap } from '@docusaurus/theme-common/internal';
import WordWrapButton from '@theme/CodeBlock/WordWrapButton';
import styles from './styles.module.css';

const body = (phrase, prefix, infix, suffix) => {
  const group = Array.isArray(phrase.children) ? phrase.children : [phrase.children];
  const last = group.length - 1;
  const multi = group.length > 1;
  return (
    <>
      {
        group.map((words, index) => (
          <Fragment key={key(`${index}`, `${last}`)}>
            {(words && !phrase.unify && multi) && prefix}
            {words}
            {(words && phrase.unify && index !== last) && infix}
            {(words && ((phrase.unify && index === last) || !phrase.unify)) && suffix}
            {multi && '\n'}
          </Fragment>
        ))
      }
    </>
  );
};

const text = (content) => {
  if (content?.$$typeof === Symbol.for('react.element') && content?.props?.children) {
    return text(content.props.children);
  }
  if (Array.isArray(content)) {
    return content.map((child) => text(child)).join('');
  }
  if (typeof (content) === 'string') {
    return content;
  }
  return '';
};

export default memo(Object.assign(function PhraseBlock({
  className = '',
  infix,
  phrase,
  prefix,
  suffix,
}) {
  const content = body(phrase, prefix, infix, suffix);
  const plain = text(content);
  const wordWrap = useCodeWordWrap();
  return (
    <Container as="div" className={className}>
      {phrase.title && <div className={styles.title}>{phrase.title}</div>}
      <div className={styles.content}>
        <pre
          className={clsx(styles.standalone, 'thin-scrollbar')}
          ref={wordWrap.codeBlockRef}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <code className={clsx(styles.lines, phrase.className)}>{content}</code>
        </pre>
        {plain && (
          <div className={styles.buttons}>
            {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
              <WordWrapButton
                isEnabled={wordWrap.isEnabled}
                onClick={() => wordWrap.toggle()}
              />
            )}
            <CopyButton code={plain} />
          </div>
        )}
      </div>
    </Container>
  );
}, {
  propTypes: {
    className: PropTypes.string,
    infix: PropTypes.string,
    phrase: PropTypes.shape(),
    prefix: PropTypes.string,
    suffix: PropTypes.string,
  },
}));
