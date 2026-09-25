/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

const defaultMock = mock(({ children, groupId }) => (
  <div data-group-id={groupId} data-testid="tabs">
    {children}
  </div>
));

export default defaultMock;
