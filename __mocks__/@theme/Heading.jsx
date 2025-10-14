/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default ({ as: Tag = 'div', className, children }) => (
  <Tag className={className} data-testid="heading">{children}</Tag>
);
