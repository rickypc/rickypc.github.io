/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { body, substance } from '#buddhism/_strip';
import { createElement } from 'react';

describe('docs.buddhism._strip', () => {
  describe('body()', () => {
    it('wraps a single phrase into the expected structure', () => {
      const result = body('-', 1, 'pre', 2, 'suf', 'X');

      expect(result.text).toEqual([
        { style: 'prefix', text: 'pre' },
        {
          text: [
            { style: 'roll', text: '-X- ' },
            { style: 'roll', text: '-X' },
          ],
        },
        { style: 'roll', text: 'suf' },
      ]);
    });

    it('handles multiple phrases and prefixes correctly', () => {
      const result = body('*', 0, 'p', 1, 'end', ['A', 'B']);

      expect(result.text).toEqual([
        { style: 'prefix', text: 'p' },
        { text: [{ style: 'roll', text: '*A' }] },
        { style: 'roll', text: 'end' },
        { style: 'prefix', text: ' p' },
        { text: [{ style: 'roll', text: '*B' }] },
        { style: 'roll', text: 'end' },
      ]);
    });
  });

  describe('substance()', () => {
    it('returns string children as-is', () => {
      expect(substance({ children: 'hello' })).toBe('hello');
    });

    it('returns array children as-is', () => {
      expect(substance({ children: ['a', 'b'] })).toEqual(['a', 'b']);
    });

    it('extracts nested children from a React element', () => {
      const element = createElement('div', null, ['x', 'y']);
      expect(substance({ children: element })).toEqual(['x', 'y']);
    });

    it('returns undefined if element has no children', () => {
      const element = createElement('div', null);
      expect(substance({ children: element })).toBeUndefined();
    });
  });
});
