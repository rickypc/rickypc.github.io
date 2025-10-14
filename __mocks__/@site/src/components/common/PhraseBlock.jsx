/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default ({ infix, phrase, prefix, suffix }) => (
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
