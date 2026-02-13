/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import utterance from '#buddhism/media/audio/_utterance';

describe('docs.buddhism.media.audio._utterance', () => {
  describe('pronounces', () => {
    test.each([
      ['bha ', 'ba, '],
      ['om', 'om'],
      ['gga', 'ga'],
      ['hum', 'hom'],
      ['jjha', 'ja'],
      ['me', 'm-e'],
      ['phat', 'patt'],
      ['te', 't-e'],
    ])('pronounces(%p) -> %p', (input, expected) => {
      expect(utterance(input)).toBe(expected);
    });
  });

  describe('transliterations', () => {
    test.each([
      ['ā', 'a'],
      ['ḥ', 'h'],
      ['ī', 'i'],
      ['ṁ', 'm'],
      ['ṃ', 'm'],
      ['ñ', 'n'],
      ['ṅ', 'n'],
      ['ṇ', 'n'],
      ['ṣ', 's'],
      ['ṭ', 't'],
      ['ū', 'u'],
      ['v', 'w'],
      [' ।', ','],
      ['।', ','],
      ['\n', ' '],
    ])('transliterates(%p) -> %p', (input, expected) => {
      expect(utterance(input)).toBe(expected);
    });
  });

  describe('integration', () => {
    test.each([
      ['Oṃ āḥ hum', 'om ah hom'],
      ['bha te phat', 'ba, t-e patt'],
      ['me ṅa jjha', 'm-e na ja'],
    ])('full utterance %p -> %p', (input, expected) => {
      expect(utterance(input)).toBe(expected);
    });
  });
});
