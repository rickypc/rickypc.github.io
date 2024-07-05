/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import Container from '@theme/CodeBlock/Container';
import CopyButton from '@theme/CodeBlock/CopyButton';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useCodeWordWrap } from '@docusaurus/theme-common/internal';
import WordWrapButton from '@theme/CodeBlock/WordWrapButton';
import styles from './styles.module.css';

const body = (phrase, prefix, suffix) => (
  <span className={phrase.className}>
    {
      (Array.isArray(phrase.children) ? phrase.children : [phrase.children])
        .map((words, _, array) => {
          const multi = array.length > 1;
          return (
            <>
              {multi && prefix}
              {words}
              {suffix}
              {multi && '\n'}
            </>
          );
        })
    }
  </span>
);

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
  phrase,
  prefix,
  suffix,
}) {
  const content = body(phrase, prefix, suffix);
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
          <code className={styles.lines}>{content}</code>
        </pre>
        <div className={styles.buttons}>
          {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
            <WordWrapButton
              isEnabled={wordWrap.isEnabled}
              onClick={() => wordWrap.toggle()}
            />
          )}
          <CopyButton code={text(content)} />
        </div>
      </div>
    </Container>
  );
}, {
  propTypes: {
    className: PropTypes.string,
    phrase: PropTypes.shape(),
    prefix: PropTypes.string,
    suffix: PropTypes.string,
  },
}));
