/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  a11y,
  admonitions,
  clsx,
  context,
  fileName,
  key,
  oneLine,
  tail,
  textContent,
} from '@site/src/data/common';

describe('data.common', () => {
  describe('a11y()', () => {
    it('returns aria-label and title props, merging additional attributes', () => {
      const result = a11y('Label', { role: 'img', id: 'elem' });
      expect(result).toEqual({
        'aria-label': 'Label',
        title: 'Label',
        role: 'img',
        id: 'elem',
      });
    });

    it('works without the second argument', () => {
      const result = a11y('OnlyLabel');
      expect(result).toEqual({
        'aria-label': 'OnlyLabel',
        title: 'OnlyLabel',
      });
    });
  });

  describe('admonitions', () => {
    it('defines print and speech warnings with text and type', () => {
      expect(admonitions).toHaveProperty('print');
      expect(admonitions.print).toEqual({
        text: 'The print content is not ready. Scroll to the bottom to load all images, then try again.',
        type: 'warning',
      });

      expect(admonitions).toHaveProperty('speech');
      expect(admonitions.speech).toEqual({
        text: 'Speech synthesis may not work properly. Change or update your browser for a better experience.',
        type: 'warning',
      });
    });
  });

  describe('clsx()', () => {
    it('concatenates valid string class names', () => {
      expect(clsx('a', 'b', 'c')).toBe('a b c');
    });

    it('ignores falsey and non-string values', () => {
      expect(clsx('foo', null, undefined, 0, '', 'bar')).toBe('foo bar');
    });
  });

  describe('context()', () => {
    it('returns a JSON string containing default schema.org ProfilePage', () => {
      const json = JSON.parse(context());
      expect(json['@context']).toBe('https://schema.org/');
      expect(json['@type']).toBe('ProfilePage');
      expect(json.description).toContain('Engineering Leader');
      expect(typeof json.keywords).toBe('string');
      expect(json.mainEntity['@type']).toBe('Person');
      expect(Array.isArray(json.mainEntity.alumniOf)).toBeTruthy();
      expect(json.url).toBe('https://ricky.one');
    });

    it('accepts overrides for description, keywords, and title', () => {
      const overrides = {
        description: 'CustomDesc',
        keywords: ['x', 'y', 'z'],
        title: 'MyTitle',
      };
      const parsed = JSON.parse(context(overrides));
      expect(parsed.description).toBe('CustomDesc');
      expect(parsed.keywords).toBe('x,y,z');
      expect(parsed.name).toBe('MyTitle');
    });
  });

  describe('fileName()', () => {
    it('derives base name from path, hyphenating underscores and removing extensions', () => {
      expect(fileName('/path/to_file.txt')).toBe('to-file');
      expect(fileName('folder/name.ext', '')).toBe('name');
    });

    it('appends valid template suffixes when provided', () => {
      expect(fileName('dir/name', 'condensed')).toBe('name-condensed');
      expect(fileName('dir/name', 'thangka')).toBe('name-thangka');
      expect(fileName('dir/name', 'wheel')).toBe('name-wheel');
    });

    it('ignores unknown template values', () => {
      expect(fileName('dir/name', 'unknown')).toBe('name');
    });

    it('removes leading hyphens after replacement', () => {
      expect(fileName('_hello_world', 'condensed')).toBe('hello-world-condensed');
    });
  });

  describe('key()', () => {
    it('lowercases and hyphenates spaces, strips file extensions', () => {
      expect(key('Hello World')).toBe('hello-world');
      expect(key('File.Name.TXT')).toBe('file.name');
    });

    it('applies default prefix and suffix separators', () => {
      expect(key('Value', 'pre')).toBe('pre-value');
      expect(key('Value', '', '-', 'end')).toBe('valueend');
    });

    it('respects custom prefix and suffix separators', () => {
      expect(key('Test Me', 'P', '_', 'S', '_')).toBe('P_test-me_S');
    });

    it('handles empty prefix or suffix correctly', () => {
      expect(key('Solo', '', '', 'end', '_')).toBe('solo_end');
    });
  });

  describe('oneLine', () => {
    it.each([
      {
        name: 'removes newlines and indentation',
        input: `
        hello
          world
      `,
        expected: ' hello world ',
      },
      {
        name: 'handles strings with no newlines',
        input: 'hello world',
        expected: 'hello world',
      },
      {
        name: 'handles empty string',
        input: '',
        expected: '',
      },
      {
        name: 'handles multiple consecutive newlines',
        input: 'hello\n\n\nworld',
        expected: 'hello world',
      },
      {
        name: 'preserves internal spaces',
        input: 'hello   world',
        expected: 'hello   world',
      },
    ])('$name', ({ input, expected }) => {
      expect(oneLine(input)).toBe(expected);
    });
  });

  describe('tail()', () => {
    it('returns substring after the last occurrence of keyword', () => {
      expect(tail('/a/b/c', '/')).toBe('c');
      expect(tail('one#two#three', '#')).toBe('three');
    });

    it('returns the full string if keyword not found', () => {
      expect(tail('abcdef', '?')).toBe('abcdef');
    });

    it('returns empty string when path is undefined or null', () => {
      expect(tail(undefined as any, '/')).toBe('');
      expect(tail(null as any, '/')).toBe('');
    });

    it('returns the entire path when keyword is at index 0', () => {
      expect(tail('/hello', '/')).toBe('/hello');
      expect(tail('abc', 'a')).toBe('abc');
    });
  });

  describe('textContent()', () => {
    it('returns empty string for null/undefined/boolean', () => {
      expect(textContent(null)).toBe('');
      expect(textContent(undefined)).toBe('');
      expect(textContent(false)).toBe('');
      expect(textContent(true)).toBe('');
    });

    it('returns string for primitive text nodes', () => {
      expect(textContent('hello')).toBe('hello');
      expect(textContent(123)).toBe('123');
    });

    it('extracts text from a simple React element', () => {
      const node = <span>Hello</span>;
      expect(textContent(node)).toBe('Hello');
    });

    it('extracts text from nested React elements', () => {
      const node = (
        <div>
          Hello
          <span>world</span>
        </div>
      );
      expect(textContent(node)).toBe('Hello world');
    });

    it('extracts text from deeply nested structures', () => {
      const node = (
        <>
          Hello
          <span>world</span>
          huh?
          <div>
            <span>can</span>
            <p>confused</p>
            <ul><li>people</li></ul>
          </div>
        </>
      );
      expect(textContent(node)).toBe('Hello world huh? can confused people');
    });

    it('extracts text from arrays of nodes', () => {
      const node = ['one', <span key="a">two</span>, 'three'];
      expect(textContent(node)).toBe('one two three');
    });

    it('ignores non-text nodes gracefully', () => {
      const node = (
        <div>
          {null}
          {false}
          <span>ok</span>
          {undefined}
        </div>
      );
      expect(textContent(node)).toBe('  ok ');
    });

    it('handles fragments correctly', () => {
      const node = (
        <>
          A
          <span>B</span>
          C
        </>
      );
      expect(textContent(node)).toBe('A B C');
    });
  });
});
