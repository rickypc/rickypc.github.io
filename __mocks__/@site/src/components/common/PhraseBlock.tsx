/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type PhraseBlockProps = {
  infix?: string;
  phrase: PropsWithChildren<PhraseProps>;
  prefix?: string;
  suffix?: string;
};

type PhraseProps = {
  className?: string;
  testId?: string;
  unify?: boolean;
};

/**
 * Minimal mock common/PhraseBlock component that renders children.
 * @param {PhraseBlockProps} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/PhraseBlock component.
 */
export default function PhraseBlock({
  infix,
  phrase,
  prefix,
  suffix,
}: PhraseBlockProps): ReactElement {
  return (
    <div
      className={phrase.className}
      data-infix={infix}
      data-prefix={prefix}
      data-suffix={suffix}
      data-testid={`phrase-block-${phrase.testId}`}
      data-unify={String(!!phrase?.unify)}
    >
      {phrase.children}
    </div>
  );
}
