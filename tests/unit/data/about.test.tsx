/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import {
  characteristic, faqItems, headline, intro, layout,
  paragraphs, quadrants, schema,
} from '@site/src/data/about';
import { textContent } from '@site/src/data/common';

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

  describe('faqItems', () => {
    test('has at least six non-empty Q/A pairs', () => {
      expect(Array.isArray(faqItems)).toBe(true);
      expect(faqItems.length).toBeGreaterThanOrEqual(6);
      faqItems.forEach((entry) => {
        expect(textContent(entry.question).length).toBeGreaterThan(0);
        expect(textContent(entry.answer).length).toBeGreaterThan(0);
      });
    });

    test('includes a personal-differentiator question', () => {
      const questions = faqItems.map((entry) => textContent(entry.question));
      expect(questions.some((q) => q.match(/doesn't show up on a resume/i))).toBe(true);
    });

    test('losslessly preserves the original intro facts in the rewritten pitch', () => {
      const pitch = textContent(intro.description);
      expect(pitch).toMatch(/beyond titles and roles/);
      expect(pitch).toMatch(/teams, projects, and outcomes improve/);
      expect(pitch).toMatch(/how I read people/);
      expect(pitch).toMatch(/how I deliver on direction/);
      expect(pitch).toMatch(/attributes that make both click/);
    });
  });

  describe('headline', () => {
    test('is a non-empty string', () => {
      expect(typeof headline).toBe('string');
      expect(headline.length).toBeGreaterThan(0);
      expect(headline).toMatch(/People, Purpose, and Results/);
    });
  });

  describe('intro', () => {
    test('has description and title', () => {
      expect(typeof intro).toBe('object');

      expect(typeof intro.description).toBe('string');
      expect(textContent(intro.description).length).toBeGreaterThan(0);

      expect(typeof intro.title).toBe('string');
      expect(intro.title).toMatch(/^About Ricky Huang/);
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

  describe('schema', () => {
    test('is a valid SchemaType string', () => {
      expect(typeof schema).toBe('string');
      expect(schema.length).toBeGreaterThan(0);
    });
  });
});
