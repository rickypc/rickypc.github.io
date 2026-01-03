/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { layout, preamble, timelines } from '@site/src/data/timeline';

describe('data.timeline', () => {
  describe('exports', () => {
    test('exports layout, preamble, timelines', () => {
      expect(layout).toBeDefined();
      expect(preamble).toBeDefined();
      expect(timelines).toBeDefined();
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

  describe('preamble', () => {
    test('description', () => {
      expect(preamble.description).toBe(
        'A curated journey through key milestones in my career, education, and technical growth. Each moment reflects a step forward - building expertise, shaping ideas, and driving impact across industries and technologies.',
      );
    });

    test('title', () => {
      expect(preamble.title).toBe('Timeline');
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
