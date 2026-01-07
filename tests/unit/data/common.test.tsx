/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  a11y,
  admonitions,
  chunkToWords,
  clsx,
  context,
  fileName,
  humanizeYears,
  key,
  numberToWords,
  oneLine,
  tail,
  textContent,
} from '@site/src/data/common';

describe('data.common', () => {
  describe('a11y()', () => {
    test('returns aria-label and title props, merging additional attributes', () => {
      const result = a11y('Label', { role: 'img', id: 'elem' });
      expect(result).toEqual({
        'aria-label': 'Label',
        title: 'Label',
        role: 'img',
        id: 'elem',
      });
    });

    test('works without the second argument', () => {
      const result = a11y('OnlyLabel');
      expect(result).toEqual({
        'aria-label': 'OnlyLabel',
        title: 'OnlyLabel',
      });
    });
  });

  describe('admonitions', () => {
    test('defines print and speech warnings with text and type', () => {
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

  describe('chunkToWords', () => {
    test.each([
      // 1–19 (below20 cases).
      [1, 'one'],
      [7, 'seven'],
      [10, 'ten'],
      [13, 'thirteen'],
      [19, 'nineteen'],

      // 20–99 (tens only).
      [20, 'twenty'],
      [30, 'thirty'],
      [40, 'forty'],
      [90, 'ninety'],

      // 21–99 (tens + hyphen + ones).
      [21, 'twenty-one'],
      [34, 'thirty-four'],
      [58, 'fifty-eight'],
      [99, 'ninety-nine'],

      // 100–999 (hundreds only).
      [100, 'one hundred'],
      [300, 'three hundred'],
      [900, 'nine hundred'],

      // 101–199 (hundreds + space + ones).
      [101, 'one hundred one'],
      [115, 'one hundred fifteen'],

      // 120–199 (hundreds + space + tens).
      [120, 'one hundred twenty'],
      [180, 'one hundred eighty'],

      // 121–999 (hundreds + space + tens + hyphen + ones).
      [121, 'one hundred twenty-one'],
      [342, 'three hundred forty-two'],
      [519, 'five hundred nineteen'],
      [987, 'nine hundred eighty-seven'],
    ])('chunkToWords(%i) -> %s', (input, expected) => {
      expect(chunkToWords(input)).toBe(expected);
    });
  });

  describe('clsx()', () => {
    test('concatenates valid string class names', () => {
      expect(clsx('a', 'b', 'c')).toBe('a b c');
    });

    test('ignores falsey and non-string values', () => {
      expect(clsx('foo', null, undefined, 0, '', 'bar')).toBe('foo bar');
    });
  });

  describe('context()', () => {
    test('returns a JSON string containing default schema.org ProfilePage', () => {
      const json = JSON.parse(context());
      expect(json['@context']).toBe('https://schema.org/');
      expect(json['@type']).toBe('ProfilePage');
      expect(json.description).toContain('Engineering Leader');
      expect(typeof json.keywords).toBe('string');
      expect(json.mainEntity['@type']).toBe('Person');
      expect(Array.isArray(json.mainEntity.alumniOf)).toBeTruthy();
      expect(json.url).toBe('https://ricky.one');
    });

    test('accepts overrides for description, keywords, and title', () => {
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
    test('derives base name from path, hyphenating underscores and removing extensions', () => {
      expect(fileName('/path/to_file.txt')).toBe('to-file');
      expect(fileName('folder/name.ext', '')).toBe('name');
    });

    test('appends valid template suffixes when provided', () => {
      expect(fileName('dir/name', 'condensed')).toBe('name-condensed');
      expect(fileName('dir/name', 'thangka')).toBe('name-thangka');
      expect(fileName('dir/name', 'wheel')).toBe('name-wheel');
    });

    test('ignores unknown template values', () => {
      expect(fileName('dir/name', 'unknown')).toBe('name');
    });

    test('removes leading hyphens after replacement', () => {
      expect(fileName('_hello_world', 'condensed')).toBe('hello-world-condensed');
    });
  });

  describe('humanizeYears', () => {
    test.each([
      // Decades format.
      [10, 'decades', 'one decades'],
      [20, 'decades', 'two decades'],
      [25, 'decades', 'more than two decades'],
      [37, 'decades', 'more than three decades'],
      [99, 'decades', 'more than nine decades'],

      // Over format.
      [5, 'over', '5 years'],
      [11, 'over', 'over 10 years'],
      [29, 'over', 'over 20 years'],
      [30, 'over', '30 years'],

      // Plus format.
      [4, 'plus', '4 years'],
      [12, 'plus', '10+ years'],
      [27, 'plus', '20+ years'],
      [40, 'plus', '40 years'],

      // Default: exact format.
      [1, 'exact', '1 year'],
      [2, 'exact', '2 years'],
      [9, 'exact', '9 years'],
      [10, 'exact', '10 years'],
      [21, 'exact', '21 years'],

      // Default fallback when format is unknown.
      [3, undefined, '3 years'],
      [1, 'unknown', '1 year'],
    ])('humanizeYears(%i, %s) -> %s', (num, format, expected) => {
      expect(humanizeYears(num, format)).toBe(expected);
    });
  });

  describe('key()', () => {
    test('lowercases and hyphenates spaces, strips file extensions', () => {
      expect(key('Hello World')).toBe('hello-world');
      expect(key('File.Name.TXT')).toBe('file.name');
    });

    test('applies default prefix and suffix separators', () => {
      expect(key('Value', 'pre')).toBe('pre-value');
      expect(key('Value', '', '-', 'end')).toBe('valueend');
    });

    test('respects custom prefix and suffix separators', () => {
      expect(key('Test Me', 'P', '_', 'S', '_')).toBe('P_test-me_S');
    });

    test('handles empty prefix or suffix correctly', () => {
      expect(key('Solo', '', '', 'end', '_')).toBe('solo_end');
    });
  });

  describe('numberToWords', () => {
    test.each([
      // Zero.
      [0, 'zero'],

      // 1–999 (single chunk, relies on chunkToWords correctness).
      [1, 'one'],
      [19, 'nineteen'],
      [105, 'one hundred five'],
      [999, 'nine hundred ninety-nine'],

      // Thousands.
      [1000, 'one thousand'],
      [1001, 'one thousand one'],
      [1234, 'one thousand two hundred thirty-four'],
      [900000, 'nine hundred thousand'],

      // Millions.
      [1_000_000, 'one million'],
      [1_000_001, 'one million one'],
      [1_234_567, 'one million two hundred thirty-four thousand five hundred sixty-seven'],

      // Billions.
      [1_000_000_000, 'one billion'],
      [1_000_000_001, 'one billion one'],
      [2_147_483_647, 'two billion one hundred forty-seven million four hundred eighty-three thousand six hundred forty-seven'],

      // Mixed multi-chunk with zeros in the middle.
      [1_000_020, 'one million twenty'],
      [1_005_000, 'one million five thousand'],
      [10_000_010, 'ten million ten'],

      // Large but within safe integer range.
      [999_999_999_999, 'nine hundred ninety-nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine'],
    ])('numberToWords(%i) -> %s', (input, expected) => {
      expect(numberToWords(input)).toBe(expected);
    });
  });

  describe('oneLine', () => {
    test.each([
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
    test('returns substring after the last occurrence of keyword', () => {
      expect(tail('/a/b/c', '/')).toBe('c');
      expect(tail('one#two#three', '#')).toBe('three');
    });

    test('returns the full string if keyword not found', () => {
      expect(tail('abcdef', '?')).toBe('abcdef');
    });

    test('returns empty string when path is undefined or null', () => {
      expect(tail(undefined as any, '/')).toBe('');
      expect(tail(null as any, '/')).toBe('');
    });

    test('returns the entire path when keyword is at index 0', () => {
      expect(tail('/hello', '/')).toBe('/hello');
      expect(tail('abc', 'a')).toBe('abc');
    });
  });

  describe('textContent()', () => {
    test('returns empty string for null/undefined/boolean', () => {
      expect(textContent(null)).toBe('');
      expect(textContent(undefined)).toBe('');
      expect(textContent(false)).toBe('');
      expect(textContent(true)).toBe('');
    });

    test('returns string for primitive text nodes', () => {
      expect(textContent('hello')).toBe('hello');
      expect(textContent(123)).toBe('123');
    });

    test('extracts text from a simple React element', () => {
      const node = <span>Hello</span>;
      expect(textContent(node)).toBe('Hello');
    });

    test('extracts text from nested React elements', () => {
      const node = (
        <div>
          Hello
          <span>world</span>
        </div>
      );
      expect(textContent(node)).toBe('Hello world');
    });

    test('extracts text from deeply nested structures', () => {
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

    test('extracts text from arrays of nodes', () => {
      const node = ['one', <span key="a">two</span>, 'three'];
      expect(textContent(node)).toBe('one two three');
    });

    test('ignores non-text nodes gracefully', () => {
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

    test('handles fragments correctly', () => {
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
