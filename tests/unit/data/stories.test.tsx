/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { layout, preamble, stories } from '@site/src/data/stories';

describe('data.stories', () => {
  describe('exports', () => {
    it('has layout, preamble, stories', () => {
      expect(layout).toBeDefined();
      expect(preamble).toBeDefined();
      expect(stories).toBeDefined();
    });
  });

  describe('layout', () => {
    it('description', () => {
      expect(layout.description).toMatch(/^Stories and lessons from Ricky Huang's journey/);
    });

    it('title', () => {
      expect(layout.title).toBe('Stories, Testimonials & Lessons from the Journey');
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
      expect(preamble.description).toBe(
        'Real-world experiences, lessons learned, and reflections from my journey as a modern multidisciplinary technologist. These stories highlight how I\'ve helped teams and projects thrive - through technology, mentorship, personal growth, and the trust formed along the way.',
      );
    });

    it('title', () => {
      expect(preamble.title).toBe('Stories');
    });
  });

  describe('stories', () => {
    it('length', () => {
      expect(Array.isArray(stories)).toBeTruthy();
      expect(stories).toHaveLength(4);
    });

    stories.forEach((s, i) => {
      describe(`item ${i}`, () => {
        it('content', () => {
          expect(s.content).toEqual(expect.any(String));
          expect(s.content.length).toBeGreaterThan(0);
        });

        it('affiliation', () => {
          expect(s.affiliation.children).toEqual(expect.any(String));
          expect(s.affiliation.href).toMatch(/^https:\/\/.+\.com.*$/);
          expect(s.affiliation.translate).toBe('no');
        });

        it('author', () => {
          expect(s.author.children).toEqual(expect.any(String));
          expect(s.author.href).toMatch(/^https:\/\/.+\.com.+$/);
          expect(s.author.translate).toBe('no');
        });

        if (s.header.href === undefined) {
          it('header href undefined', () => {
            expect(s.header.href).toBeUndefined();
          });
        } else {
          it('header href URL', () => {
            expect(s.header.href).toMatch(/^https?:\/\//);
          });
        }

        it('header children', () => {
          expect(s.header.children).toEqual(expect.any(String));
        });

        if (s.title.href === undefined) {
          it('title href undefined', () => {
            expect(s.title.href).toBeUndefined();
          });
        } else {
          it('title href URL', () => {
            expect(s.title.href).toMatch(/^https?:\/\//);
          });
        }

        it('title children', () => {
          expect(s.title.children).toEqual(expect.any(String));
        });
      });
    });

    it('unique affiliations', () => {
      const names = stories.map((s) => s.affiliation.children);
      expect(new Set(names).size).toEqual(names.length);
    });

    it('unique authors', () => {
      const names = stories.map((s) => s.author.children);
      expect(new Set(names).size).toEqual(names.length);
    });
  });
});
