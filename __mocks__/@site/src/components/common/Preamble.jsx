/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default ({ children, printAdmonition, ...rest }) =>
  <div data-print-admonition={String(!!printAdmonition)} data-testid="preamble" {...rest}>{children}</div>;
