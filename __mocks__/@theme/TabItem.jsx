/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export default jest.fn(({ children, label, value }) => (
  <div data-label={label} data-testid="tab-item" data-value={value}>
    {children}
  </div>
));
