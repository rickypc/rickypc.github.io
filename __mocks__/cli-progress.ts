/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const barUpdate = jest.fn();

export const barsUpdate = jest.fn();

export const increment = jest.fn();

export const setTotal = jest.fn();

export const stop = jest.fn();

// After the above assignments.
export const create = jest.fn(() => ({
  increment,
  options: {},
  setTotal,
  stop,
  update: barUpdate,
}));

export const MultiBar = jest.fn(() => ({ create, stop, update: barsUpdate }));
