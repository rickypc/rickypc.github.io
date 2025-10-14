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
      expect(layout.description).toEqual(
        'Stories, experiences, and lessons from Ricky Huang\'s work as a full stack developer and engineering leader - capturing how technology, leadership, and personal growth have helped teams and projects succeed. These testimonials reflect the impact, collaboration, and trust built along the way.',
      );
    });

    it('title', () => {
      expect(layout.title).toEqual(
        'Stories - Testimonials, Experiences & Lessons from the Journey',
      );
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
        'Real-world experiences, lessons learned, and reflections from my journey as a full stack developer and engineering leader. These stories highlight how I\'ve helped teams and projects thrive - through technology, mentorship, and personal growth.',
      );
    });

    it('title', () => {
      expect(preamble.title).toEqual('Stories');
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
          expect(s.affiliation.href).toMatch(/^https:\/\/bit\.ly\//);
          expect(s.affiliation.translate).toEqual('no');
        });

        it('author', () => {
          expect(s.author.children).toEqual(expect.any(String));
          expect(s.author.href).toMatch(/^https:\/\/bit\.ly\//);
          expect(s.author.translate).toEqual('no');
        });

        if (s.header.href === null) {
          it('header href null', () => {
            expect(s.header.href).toBeNull();
          });
        } else {
          it('header href URL', () => {
            expect(s.header.href).toMatch(/^https?:\/\//);
          });
        }

        it('header children', () => {
          expect(s.header.children).toEqual(expect.any(String));
        });

        if (s.title.href === null) {
          it('title href null', () => {
            expect(s.title.href).toBeNull();
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
