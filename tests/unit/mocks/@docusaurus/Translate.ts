/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

export const translate = mock(({ id, message }) => `translated:${id}:${message}`);
