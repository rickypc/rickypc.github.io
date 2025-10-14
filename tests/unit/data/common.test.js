/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  a11y,
  admonitions,
  clsx,
  context,
  fileName,
  key,
  tail,
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
        text: 'The print content is not ready. Please try again.',
        type: 'warning',
      });

      expect(admonitions).toHaveProperty('speech');
      expect(admonitions.speech).toEqual({
        text: 'Change or update your browser for a better experience.',
        type: 'warning',
      });
    });
  });

  describe('clsx()', () => {
    it('concatenates valid string class names', () => {
      expect(clsx('a', 'b', 'c')).toEqual('a b c');
    });

    it('ignores falsey and non-string values', () => {
      expect(clsx('foo', null, undefined, 0, '', 'bar')).toEqual('foo bar');
    });
  });

  describe('context()', () => {
    it('returns a JSON string containing default schema.org ProfilePage', () => {
      const json = JSON.parse(context());
      expect(json['@context']).toEqual('https://schema.org/');
      expect(json['@type']).toEqual('ProfilePage');
      expect(json.description).toContain('Engineering Leader');
      expect(typeof json.keywords).toEqual('string');
      expect(json.mainEntity['@type']).toEqual('Person');
      expect(Array.isArray(json.mainEntity.alumniOf)).toBeTruthy();
      expect(json.url).toEqual('https://ricky.one');
    });

    it('accepts overrides for description, keywords, and title', () => {
      const overrides = {
        description: 'CustomDesc',
        keywords: ['x', 'y', 'z'],
        title: 'MyTitle',
      };
      const parsed = JSON.parse(context(overrides));
      expect(parsed.description).toEqual('CustomDesc');
      expect(parsed.keywords).toEqual('x,y,z');
      expect(parsed.name).toEqual('MyTitle');
    });
  });

  describe('fileName()', () => {
    it('derives base name from path, hyphenating underscores and removing extensions', () => {
      expect(fileName('/path/to_file.txt')).toEqual('to-file');
      expect(fileName('folder/name.ext', '')).toEqual('name');
    });

    it('appends valid template suffixes when provided', () => {
      expect(fileName('dir/name', 'condensed')).toEqual('name-condensed');
      expect(fileName('dir/name', 'thangka')).toEqual('name-thangka');
      expect(fileName('dir/name', 'wheel')).toEqual('name-wheel');
    });

    it('ignores unknown template values', () => {
      expect(fileName('dir/name', 'unknown')).toEqual('name');
    });

    it('removes leading hyphens after replacement', () => {
      expect(fileName('_hello_world', 'condensed')).toEqual('hello-world-condensed');
    });
  });

  describe('key()', () => {
    it('lowercases and hyphenates spaces, strips file extensions', () => {
      expect(key('Hello World')).toEqual('hello-world');
      expect(key('File.Name.TXT')).toEqual('file.name');
    });

    it('applies default prefix and suffix separators', () => {
      expect(key('Value', 'pre')).toEqual('pre-value');
      expect(key('Value', '', '-', 'end')).toEqual('valueend');
    });

    it('respects custom prefix and suffix separators', () => {
      expect(key('Test Me', 'P', '_', 'S', '_')).toEqual('P_test-me_S');
    });

    it('handles empty prefix or suffix correctly', () => {
      expect(key('Solo', '', '', 'end', '_')).toEqual('solo_end');
    });
  });

  describe('tail()', () => {
    it('returns substring after the last occurrence of keyword', () => {
      expect(tail('/a/b/c', '/')).toEqual('c');
      expect(tail('one#two#three', '#')).toEqual('three');
    });

    it('returns the full string if keyword not found', () => {
      expect(tail('abcdef', '?')).toEqual('abcdef');
    });

    it('returns empty string when path is undefined or null', () => {
      expect(tail(undefined, '/')).toEqual('');
      expect(tail(null, '/')).toEqual('');
    });

    it('returns the entire path when keyword is at index 0', () => {
      expect(tail('/hello', '/')).toEqual('/hello');
      expect(tail('abc', 'a')).toEqual('abc');
    });
  });
});
