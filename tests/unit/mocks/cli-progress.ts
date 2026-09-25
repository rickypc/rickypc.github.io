/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

export const barUpdate = mock();

export const barsUpdate = mock();

export const increment = mock();

export const setTotal = mock();

export const stop = mock();

// After the above assignments.
export const create = mock(() => ({
  increment,
  options: {},
  setTotal,
  stop,
  update: barUpdate,
}));

export const MultiBar = mock(() => ({ create, stop, update: barsUpdate }));
