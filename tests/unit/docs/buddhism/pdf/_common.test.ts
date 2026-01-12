/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  body,
  header,
  instruction,
  main,
  phrase,
  phrases,
} from '#buddhism/pdf/_common';
import { createElement } from 'react';

jest.mock('#buddhism/mock-default', () => ({
  default: {
    sanskrit: { children: ['A', 'B'] },
    translation: { title: 'Eng' },
    transliteration: {
      title: 'Trans',
      repetition: 5,
      children: ['X', 'Y'],
    },
  },
}), { virtual: true });

jest.mock('#buddhism/mock-default-empty', () => ({
  default: {
    sanskrit: { children: ['A', 'B'] },
    translation: { title: '' },
    transliteration: {
      title: 'Trans',
      repetition: 5,
      children: ['X', 'Y'],
    },
  },
}), { virtual: true });

jest.mock('#buddhism/mock-split', () => ({
  default: {
    sanskrit: { children: ['A', '', 'B', 'C'] },
    translation: { title: 'Eng' },
    transliteration: {
      title: 'Trans',
      repetition: 2,
      children: ['X', '', 'Y', 'Z'],
    },
  },
}), { virtual: true });

jest.mock('#buddhism/mock-split-empty', () => ({
  default: {
    sanskrit: { children: ['A', '', 'B', 'C'] },
    translation: { title: '' },
    transliteration: {
      title: 'Trans',
      repetition: 2,
      children: ['X', '', 'Y', 'Z'],
    },
  },
}), { virtual: true });

describe('docs.buddhism.pdf._common', () => {
  describe('body()', () => {
    test('handles a single string child', () => {
      const result = body({ children: 'Hello' }, '|');

      expect(result).toBe('Hello');
    });

    test('joins multiple children with the infix and newline', () => {
      const result = body({ children: ['A', 'B', 'C'] }, '-');

      expect(result).toBe('A-\nB-\nC');
    });

    test('extracts nested React element children', () => {
      const result = body({
        children: [
          createElement('span', null, 'X'),
          createElement('span', null, 'Y'),
        ],
      }, '।');

      expect(result).toBe('X।\nY');
    });

    test('handles empty or falsy children gracefully', () => {
      const result = body({ children: ['', null, 'A'] }, '/');

      expect(result).toBe('\n\nA');
    });
  });

  describe('instruction()', () => {
    test('wraps a single string into an instruction object', () => {
      const result = instruction('Read this');

      expect(result).toEqual({
        text: [{ style: 'instruction', text: 'Read this' }],
      });
    });

    test('wraps multiple strings into instruction objects', () => {
      const result = instruction(['One', 'Two']);

      expect(result).toEqual({
        text: [
          { style: 'instruction', text: 'One' },
          { style: 'instruction', text: 'Two' },
        ],
      });
    });

    test('passes through objects unchanged', () => {
      const input = [{ style: 'instruction', text: 'Keep me' }];
      const result = instruction(input);

      expect(result).toEqual({ text: input });
    });

    test('mixes strings and objects correctly', () => {
      const input = [
        'Alpha',
        { style: 'instruction', text: 'Beta' },
        'Gamma',
      ];

      const result = instruction(input);

      expect(result).toEqual({
        text: [
          { style: 'instruction', text: 'Alpha' },
          { style: 'instruction', text: 'Beta' },
          { style: 'instruction', text: 'Gamma' },
        ],
      });
    });
  });

  describe('header()', () => {
    test('returns section-set when commentaries is non-empty', () => {
      const result = header('My Title', 'Some commentary');

      expect(result).toEqual({
        style: 'section-set',
        text: [
          { style: 'section', text: 'My Title' },
          instruction('Some commentary'),
        ],
      });
    });

    test('returns section + section-set styles when commentaries is empty', () => {
      const result = header('My Title');

      expect(result).toEqual({
        style: ['section', 'section-set'],
        text: 'My Title',
      });
    });

    test('handles array commentaries correctly', () => {
      const result = header('Title', ['A', 'B']);

      expect(result).toEqual({
        style: 'section-set',
        text: [
          { style: 'section', text: 'Title' },
          instruction(['A', 'B']),
        ],
      });
    });
  });

  describe('main()', () => {
    test('returns phrase-set with repetition when repetition > 0', () => {
      const result = main('Sanskrit text', 'Translit text', 3);

      expect(result).toEqual([
        { style: 'sanskrit', text: 'Sanskrit text' },
        {
          style: 'phrase-set',
          text: [
            { style: 'phrase', text: 'Translit text' },
            { style: 'repetition', text: ' [3x]' },
          ],
        },
      ]);
    });

    test('returns phrase + phrase-set styles when repetition = 0', () => {
      const result = main('Sanskrit', 'Translit');

      expect(result).toEqual([
        { style: 'sanskrit', text: 'Sanskrit' },
        { style: ['phrase', 'phrase-set'], text: 'Translit' },
      ]);
    });

    test('handles array commentaries for both fields', () => {
      const result = main(['A', 'B'], ['X', 'Y'], 0);

      expect(result).toEqual([
        { style: 'sanskrit', text: ['A', 'B'] },
        { style: ['phrase', 'phrase-set'], text: ['X', 'Y'] },
      ]);
    });
  });

  describe('phrase()', () => {
    test('builds a full phrase block with header + main', () => {
      const result = phrase('#buddhism/mock-default', 'Note', 3);

      expect(result).toEqual([
        header('Trans [Eng]', 'Note'),
        ...main(
          `${body({ children: ['A', 'B'] })}॥`,
          `${body({ children: ['X', 'Y'] })}॥`,
          3,
        ),
      ]);
    });

    test('uses transliteration.repetition when repetition arg is 0', () => {
      const result = phrase('#buddhism/mock-default-empty');

      expect(result).toEqual([
        header('Trans', ''),
        ...main(
          `${body({ children: ['A', 'B'] })}॥`,
          `${body({ children: ['X', 'Y'] })}॥`,
          5,
        ),
      ]);
    });

    test('uses explicit title when provided', () => {
      const result = phrase('#buddhism/mock-default', '', 0, 'Custom Title');

      expect(result[0]).toEqual(header('Custom Title', ''));
    });
  });

  describe('phrases()', () => {
    test('splits sanskrit/transliteration at empty string and builds two blocks', () => {
      const result = phrases('#buddhism/mock-split', 'Note');

      expect(result).toEqual([
        [
          header('Trans [Eng]', 'Note'),
          ...main(
            `${body({ children: ['A'] })}।`,
            `${body({ children: ['X'] })}।`,
          ),
        ],
        [
          header('Trans [Eng]', ' (continued)'),
          ...main(
            `${body({ children: ['B', 'C'] })}॥`,
            `${body({ children: ['Y', 'Z'] })}॥`,
            2,
          ),
        ],
      ]);
    });

    test('splits sanskrit/transliteration at empty string and builds two blocks (no title)', () => {
      const result = phrases('#buddhism/mock-split-empty', 'Note');

      expect(result).toEqual([
        [
          header('Trans', 'Note'),
          ...main(
            `${body({ children: ['A'] })}।`,
            `${body({ children: ['X'] })}।`,
          ),
        ],
        [
          header('Trans', ' (continued)'),
          ...main(
            `${body({ children: ['B', 'C'] })}॥`,
            `${body({ children: ['Y', 'Z'] })}॥`,
            2,
          ),
        ],
      ]);
    });

    test('uses explicit title when provided', () => {
      const result = phrases('#buddhism/mock-split', undefined, 0, 'Custom Title');

      expect(result[0][0]).toEqual(header('Custom Title', ''));
    });
  });
});
