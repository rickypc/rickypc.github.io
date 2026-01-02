/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
