/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

const defaultMock = {
  pause: mock(),
  play: mock(() => Promise.resolve()),
  volume: 1,
};

export default defaultMock;
