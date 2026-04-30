/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export default jest.fn(({ children, groupId }) => (
  <div data-group-id={groupId} data-testid="tabs">
    {children}
  </div>
));
