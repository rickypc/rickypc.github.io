/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { basename } from 'node:path';

export const pools: Record<string, any> = {};

const defaultMock = mock((opts) => {
  const pool = { destroy: mock(), opts, run: mock() };
  pools[basename(opts.filename)] = pool;
  return pool;
});

export default defaultMock;
