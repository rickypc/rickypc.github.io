/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const increment = jest.fn();

export const start = jest.fn();

export const stop = jest.fn();

// After the above assignments.
export const Bar = jest.fn(() => ({ increment, start, stop }));
