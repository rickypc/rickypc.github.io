/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

export default {
  pause: jest.fn(),
  play: jest.fn(() => Promise.resolve()),
  volume: 1,
};
