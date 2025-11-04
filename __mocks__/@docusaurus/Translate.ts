/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line import/prefer-default-export
export const translate = jest.fn(({ id, message }) => `translated:${id}:${message}`);
