/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import {
  characteristic,
  headline,
  layout,
  paragraphs,
  preamble,
  quadrants,
} from '@site/src/data/about';

describe('data.about', () => {
  describe('characteristic', () => {
    test('has an attributes array of strings and a title', () => {
      expect(Array.isArray(characteristic.attributes)).toBeTruthy();
      expect(characteristic.attributes.length).toBeGreaterThan(0);
      characteristic.attributes.forEach((attr) => {
        expect(typeof attr).toBe('string');
        expect(attr.length).toBeGreaterThan(0);
      });
      expect(typeof characteristic.title).toBe('string');
      expect(characteristic.title).toContain('defines my approach');
    });
  });

  describe('headline', () => {
    test('is a non-empty string', () => {
      expect(typeof headline).toBe('string');
      expect(headline.length).toBeGreaterThan(0);
      expect(headline).toMatch(/People, Purpose, and Results/);
    });
  });

  describe('layout', () => {
    test('contains description, keywords array, and title', () => {
      expect(typeof layout.description).toBe('string');
      expect(layout.description?.length).toBeGreaterThan(0);

      expect(Array.isArray(layout.keywords)).toBeTruthy();
      expect(layout.keywords?.length).toBeGreaterThan(0);
      layout.keywords?.forEach((kw) => {
        expect(typeof kw).toBe('string');
        expect(kw.length).toBeGreaterThan(0);
      });

      expect(typeof layout.title).toBe('string');
      expect(layout.title).toMatch(/^About -/);
    });
  });

  describe('paragraphs', () => {
    test('is an array of two non-empty strings', () => {
      expect(Array.isArray(paragraphs)).toBeTruthy();
      expect(paragraphs).toHaveLength(2);
      paragraphs.forEach((p) => {
        expect(typeof p).toBe('string');
        expect(p.length).toBeGreaterThan(0);
      });
    });
  });

  describe('preamble', () => {
    test('has description and title as non-empty strings', () => {
      expect(typeof preamble.description).toBe('string');
      expect(preamble.description.length).toBeGreaterThan(0);

      expect(typeof preamble.title).toBe('string');
      expect(preamble.title).toMatch(/^About Ricky Huang/);
    });
  });

  describe('quadrants', () => {
    const quadrant = (name: keyof typeof quadrants) => {
      // eslint-disable-next-line security/detect-object-injection
      const q = quadrants[name];

      expect(typeof q.alt).toBe('string');

      expect(Array.isArray(q.axes)).toBeTruthy();
      expect(q.axes).toHaveLength(2);

      expect(typeof q.circle).toBe('object');
      expect(typeof q.circle.x).toBe('number');
      expect(typeof q.circle.y).toBe('number');

      expect(Array.isArray(q.labels)).toBeTruthy();
      expect(q.labels).toHaveLength(4);
    };

    test('contains the expected top-level keys', () => {
      expect(quadrants).toHaveProperty('people');
      expect(quadrants).toHaveProperty('task');
    });

    test('validates the structure of the "people" quadrant', () => {
      expect(() => quadrant('people')).not.toThrow();
    });

    test('validates the structure of the "task" quadrant', () => {
      expect(() => quadrant('task')).not.toThrow();
    });
  });
});
