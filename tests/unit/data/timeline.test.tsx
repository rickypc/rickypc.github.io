/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import {
  faqItems, intro, layout, schema, timelines, timelineMap,
} from '@site/src/data/timeline';
import { textContent } from '@site/src/data/common';

describe('data.timeline', () => {
  describe('exports', () => {
    test('exports layout, intro, timelines', () => {
      expect(layout).toBeDefined();
      expect(intro).toBeDefined();
      expect(timelines).toBeDefined();
    });
  });

  describe('faqItems', () => {
    test('has exactly six non-empty Q/A pairs', () => {
      expect(Array.isArray(faqItems)).toBe(true);
      expect(faqItems).toHaveLength(6);
      faqItems.forEach((entry) => {
        expect(textContent(entry.question).length).toBeGreaterThan(0);
        expect(textContent(entry.answer).length).toBeGreaterThan(0);
      });
    });

    test('includes a why-leave-Experian question', () => {
      const questions = faqItems.map((entry) => textContent(entry.question));
      expect(questions.some((q) => q.match(/why would Ricky leave/i))).toBe(true);
    });

    test('losslessly preserves the original intro facts in the rewritten pitch', () => {
      const pitch = textContent(intro.description);
      expect(pitch).toMatch(/key milestones in my career/);
      expect(pitch).toMatch(/education, and technical growth/);
      expect(pitch).toMatch(/step forward/);
      expect(pitch).toMatch(/building expertise, shaping ideas/);
      expect(pitch).toMatch(/driving impact/);
    });
  });

  describe('intro', () => {
    test('has description and title', () => {
      expect(typeof intro).toBe('object');

      expect(typeof intro.description).toBe('string');
      expect(textContent(intro.description).length).toBeGreaterThan(0);

      expect(intro.title).toBe('Timeline');
    });
  });

  describe('layout', () => {
    test('description', () => {
      expect(layout.description).toMatch(/^Milestones in Ricky Huang's journey/);
    });

    test('title', () => {
      expect(layout.title).toBe('Timeline - Career, Education & Technical Milestones');
    });

    test('keywords', () => {
      expect(Array.isArray(layout.keywords)).toBeTruthy();
      expect(layout.keywords).toHaveLength(16);
      expect(layout.keywords).toContain('ricky huang');
    });

    test('no metadatas', () => {
      expect(layout.metadatas).toBeUndefined();
    });
  });

  describe('schema', () => {
    test('is ProfilePage for timeline', () => {
      expect(schema).toBe('ProfilePage');
    });
  });

  describe('timelineMap', () => {
    test('creates a map keyed by prefix', () => {
      expect(timelineMap).toBeDefined();
      expect(typeof timelineMap).toBe('object');

      timelines.forEach((item) => {
        expect(timelineMap[item.prefix]).toEqual(item);
      });
    });

    test('contains the same number of entries as timelines', () => {
      expect(Object.keys(timelineMap)).toHaveLength(timelines.length);
    });
  });

  describe('timelines', () => {
    test('is array of 9 items', () => {
      expect(Array.isArray(timelines)).toBeTruthy();
      expect(timelines).toHaveLength(9);
    });

    timelines.forEach((item, index) => {
      describe(`entry ${index}`, () => {
        test('affiliation children and href', () => {
          expect(item.affiliation.children).toEqual(expect.any(String));
          expect(item.affiliation.href).toMatch(/(?:^https?:\/\/|^\/$)/);
        });

        if (index < timelines.length - 1) {
          test('affiliation translate is "no"', () => {
            expect(item.affiliation.translate).toBe('no');
          });
        } else {
          test('affiliation translate undefined', () => {
            expect(item.affiliation.translate).toBeUndefined();
          });
        }

        test('description non-empty string', () => {
          expect(item.description).toEqual(expect.any(String));
          expect(item.description.length).toBeGreaterThan(0);
        });

        test('title children and href', () => {
          expect(item.title.children).toEqual(expect.any(String));
          expect(item.title.href).toMatch(/^https?:\/\//);
        });

        test('year is string', () => {
          expect(item.year).toEqual(expect.any(String));
          expect(item.year).toMatch(/^\d{4}/);
        });

        test('picture keys', () => {
          expect(item.picture).toHaveProperty('avif');
          expect(item.picture).toHaveProperty('webp');
          expect(item.picture).toHaveProperty('fallback');
        });

        test('picture values are strings', () => {
          expect(item.picture.avif).toEqual(expect.any(String));
          expect(item.picture.fallback).toEqual(expect.any(String));
          expect(item.picture.webp).toEqual(expect.any(String));
        });
      });
    });
  });
});
