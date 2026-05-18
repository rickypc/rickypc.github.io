/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { basename } from 'node:path';

export const pools: Record<string, any> = {};

export default jest.fn((opts) => {
  const pool = { destroy: jest.fn(), opts, run: jest.fn() };
  pools[basename(opts.filename)] = pool;
  return pool;
});
