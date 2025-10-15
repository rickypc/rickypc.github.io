/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { layout, preamble, timelines } from '@site/src/data/timeline';

describe('data.timeline', () => {
  describe('exports', () => {
    it('exports layout, preamble, timelines', () => {
      expect(layout).toBeDefined();
      expect(preamble).toBeDefined();
      expect(timelines).toBeDefined();
    });
  });

  describe('layout', () => {
    it('description', () => {
      expect(layout.description).toMatch(/^Milestones in Ricky Huang's journey/);
    });

    it('title', () => {
      expect(layout.title).toEqual('Timeline - Career, Education & Technical Milestones');
    });

    it('keywords', () => {
      expect(Array.isArray(layout.keywords)).toBeTruthy();
      expect(layout.keywords).toHaveLength(15);
      expect(layout.keywords).toContain('ricky huang');
    });

    it('no metadatas', () => {
      expect(layout.metadatas).toBeUndefined();
    });
  });

  describe('preamble', () => {
    it('description', () => {
      expect(preamble.description).toEqual(
        'A curated journey through key milestones in my career, education, and technical growth. Each moment reflects a step forward - building expertise, shaping ideas, and driving impact across industries and technologies.',
      );
    });

    it('title', () => {
      expect(preamble.title).toEqual('Timeline');
    });

    it('printAdmonition is true', () => {
      expect(preamble.printAdmonition).toBeTruthy();
    });
  });

  describe('timelines', () => {
    it('is array of 8 items', () => {
      expect(Array.isArray(timelines)).toBeTruthy();
      expect(timelines).toHaveLength(8);
    });

    timelines.forEach((item, index) => {
      describe(`entry ${index}`, () => {
        it('affiliation children and href', () => {
          expect(item.affiliation.children).toEqual(expect.any(String));
          expect(item.affiliation.href).toMatch(/(?:^https?:\/\/|^\/$)/);
        });

        if (index < timelines.length - 1) {
          it('affiliation translate is "no"', () => {
            expect(item.affiliation.translate).toEqual('no');
          });
        } else {
          it('affiliation translate undefined', () => {
            expect(item.affiliation.translate).toBeUndefined();
          });
        }

        it('description non-empty string', () => {
          expect(item.description).toEqual(expect.any(String));
          expect(item.description.length).toBeGreaterThan(0);
        });

        it('title children and href', () => {
          expect(item.title.children).toEqual(expect.any(String));
          expect(item.title.href).toMatch(/^https?:\/\//);
        });

        it('year is string', () => {
          expect(item.year).toEqual(expect.any(String));
          expect(item.year).toMatch(/^\d{4}/);
        });

        it('picture keys', () => {
          expect(item.picture).toHaveProperty('avif');
          expect(item.picture).toHaveProperty('webp');
          expect(item.picture).toHaveProperty('fallback');
        });

        it('picture values are strings', () => {
          expect(item.picture.avif).toEqual(expect.any(String));
          expect(item.picture.fallback).toEqual(expect.any(String));
          expect(item.picture.webp).toEqual(expect.any(String));
        });
      });
    });
  });
});
