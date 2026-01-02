/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

// eslint-disable-next-line import/prefer-default-export
export const translate = jest.fn(({ id, message }) => `translated:${id}:${message}`);
