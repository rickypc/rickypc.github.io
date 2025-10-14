/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default ({ children, open, ...rest }) =>
  <div data-open={String(!!Object.keys(open || {}).length)} data-testid="zoom" {...rest}>{children}</div>;
