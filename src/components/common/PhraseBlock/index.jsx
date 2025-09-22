/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Buttons from '@theme/CodeBlock/Buttons';
import { clsx, key } from '@site/src/data/common';
import { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { CodeBlockContextProvider, createCodeBlockMetadata, useCodeWordWrap } from '@docusaurus/theme-common/internal';
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

const useMetadata = (props) => createCodeBlockMetadata({
  className: props.className || '',
  code: props.code || '',
  defaultLanguage: props.defaultLanguange || 'plain',
  language: props.language || 'plain',
  magicComments: props.magicComments || [],
  metastring: props.metastring || '',
  showLineNumbers: props.showLineNumbers || false,
  title: props.title || '',
});

export default memo(Object.assign(function PhraseBlock({
  className = '',
  infix,
  phrase,
  prefix,
  suffix,
}) {
  const content = body(phrase, prefix, infix, suffix);
  const metadata = useMetadata({ className, code: text(content), title: phrase.title });
  const wordWrap = useCodeWordWrap();

  return (
    <CodeBlockContextProvider metadata={metadata} wordWrap={wordWrap}>
      <div className={clsx(className, styles.container, 'theme-code-block')}>
        {phrase.title && <div className={styles.title} translate="no">{phrase.title}</div>}
        <div className={styles.content}>
          <pre
            className={clsx(styles.standalone, 'thin-scrollbar')}
            ref={wordWrap.codeBlockRef}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
          >
            <code className={clsx(styles.lines, phrase.className)}>{content}</code>
          </pre>
          {metadata.code && <Buttons />}
        </div>
      </div>
    </CodeBlockContextProvider>
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
