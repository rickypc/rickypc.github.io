/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default ({ children, filtered, ...rest }) =>
(
  <div
    count={String(filtered?.length || 0)}
    data-testid="projects"
    filtered={JSON.stringify(filtered)}
    {...rest}
  >
    {children}
  </div>
);
