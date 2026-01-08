/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { intro, layout, stories } from '@site/src/data/stories';
import { textContent } from '@site/src/data/common';

describe('data.stories', () => {
  describe('exports', () => {
    test('has layout, intro, stories', () => {
      expect(layout).toBeDefined();
      expect(intro).toBeDefined();
      expect(stories).toBeDefined();
    });
  });

  describe('intro', () => {
    test('has description and title', () => {
      expect(typeof intro).toBe('object');

      expect(typeof intro.description).toBe('string');
      expect(textContent(intro.description).length).toBeGreaterThan(0);

      expect(intro.title).toBe('Stories');
    });
  });

  describe('layout', () => {
    test('description', () => {
      expect(layout.description).toMatch(/^Stories and lessons from Ricky Huang's journey/);
    });

    test('title', () => {
      expect(layout.title).toBe('Stories, Testimonials & Lessons from the Journey');
    });

    test('keywords', () => {
      expect(Array.isArray(layout.keywords)).toBeTruthy();
      expect(layout.keywords).toHaveLength(15);
      expect(layout.keywords).toContain('ricky huang');
    });

    test('no metadatas', () => {
      expect(layout.metadatas).toBeUndefined();
    });
  });

  describe('stories', () => {
    test('length', () => {
      expect(Array.isArray(stories)).toBeTruthy();
      expect(stories).toHaveLength(4);
    });

    stories.forEach((s, i) => {
      describe(`item ${i}`, () => {
        test('content', () => {
          expect(s.content).toEqual(expect.any(String));
          expect(s.content.length).toBeGreaterThan(0);
        });

        test('affiliation', () => {
          expect(s.affiliation.children).toEqual(expect.any(String));
          expect(s.affiliation.href).toMatch(/^https:\/\/.+\.com.*$/);
          expect(s.affiliation.translate).toBe('no');
        });

        test('author', () => {
          expect(s.author.children).toEqual(expect.any(String));
          expect(s.author.href).toMatch(/^https:\/\/.+\.com.+$/);
          expect(s.author.translate).toBe('no');
        });

        if (s.header.href === undefined) {
          test('header href undefined', () => {
            expect(s.header.href).toBeUndefined();
          });
        } else {
          test('header href URL', () => {
            expect(s.header.href).toMatch(/^https?:\/\//);
          });
        }

        test('header children', () => {
          expect(s.header.children).toEqual(expect.any(String));
        });

        if (s.title.href === undefined) {
          test('title href undefined', () => {
            expect(s.title.href).toBeUndefined();
          });
        } else {
          test('title href URL', () => {
            expect(s.title.href).toMatch(/^https?:\/\//);
          });
        }

        test('title children', () => {
          expect(s.title.children).toEqual(expect.any(String));
        });
      });
    });

    test('unique affiliations', () => {
      const names = stories.map((s) => s.affiliation.children);
      expect(new Set(names).size).toEqual(names.length);
    });

    test('unique authors', () => {
      const names = stories.map((s) => s.author.children);
      expect(new Set(names).size).toEqual(names.length);
    });
  });
});
