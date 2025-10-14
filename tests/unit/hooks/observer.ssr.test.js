/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { useVisibility } from '@site/src/hooks/observer';

jest.unmock('@site/src/hooks/observer');

describe('useVisibility (Node.js)', () => {
  it('can be required under Node and exports useVisibility', () => {
    expect(typeof useVisibility).toEqual('function');
  });
});
