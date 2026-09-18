/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { useSafeLayoutEffect } from '@site/src/hooks/observer';
import { useEffect } from 'react';

jest.unmock('@site/src/hooks/observer');

describe('useSafeLayoutEffect (SSR)', () => {
  test('uses useEffect internally', () => {
    expect(typeof useSafeLayoutEffect).toBe('function');
    expect(useSafeLayoutEffect).toEqual(useEffect);
  });
});
