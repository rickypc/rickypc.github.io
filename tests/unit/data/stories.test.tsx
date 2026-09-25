/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { textContent } from '@site/src/data/common';
import { faqItems, intro, layout, schema, stories, storyMap } from '@site/src/data/stories';

describe('data.stories.exports', () => {
  test('has layout, intro, stories', () => {
    expect(layout).toBeDefined();
    expect(intro).toBeDefined();
    expect(stories).toBeDefined();
  });
});

describe('data.stories.faqItems', () => {
  test('has at least five non-empty Q/A pairs', () => {
    expect(Array.isArray(faqItems)).toBe(true);
    expect(faqItems.length).toBeGreaterThanOrEqual(5);
    faqItems.forEach((entry) => {
      expect(textContent(entry.question).length).toBeGreaterThan(0);
      expect(textContent(entry.answer).length).toBeGreaterThan(0);
    });
  });

  test('preserves the canonical horizon facts threaded through the rewritten pitch', () => {
    const pitch = textContent(intro.description);
    expect(pitch).toMatch(/horizon/);
    expect(pitch).toMatch(/decades of engineering/);
    expect(pitch).toMatch(/trust/);
    expect(pitch).toMatch(/Tier-1 essential service/);
    expect(pitch).toMatch(/5\+ years of zero production defects/);
    expect(pitch).toMatch(/spec-driven development/);
  });
});

describe('data.stories.intro', () => {
  test('has description and title', () => {
    expect(typeof intro).toBe('object');

    expect(typeof intro.description).toBe('object');
    expect((intro.description as any).props.children).toHaveLength(15);

    expect(intro.title).toBe('Stories');
  });
});

describe('data.stories.layout', () => {
  test('description', () => {
    expect(layout.description).toMatch(/^Peer testimonials and hard-won lessons/);
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

describe('data.stories.schema', () => {
  test('is a valid SchemaType string', () => {
    expect(typeof schema).toBe('string');
    expect(schema.length).toBeGreaterThan(0);
  });
});

describe('data.stories.stories', () => {
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

  test('storyMap keys match story prefixes', () => {
    expect(typeof storyMap).toBe('object');
    expect(Object.keys(storyMap)).toHaveLength(stories.length);
    stories.forEach((s) => {
      expect(storyMap[s.prefix]).toBe(s);
    });
  });
});
