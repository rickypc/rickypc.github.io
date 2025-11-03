/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default jest.fn(({
  children,
  description,
  keywords,
  title,
}) => (
  <div data-description={description} data-keywords={keywords?.join(',')} data-testid="layout" data-title={title}>
    {children}
  </div>
));
