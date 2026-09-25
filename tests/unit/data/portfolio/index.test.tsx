/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { textContent } from '@site/src/data/common';
import { catalog, faqItems, intro, layout, schema } from '@site/src/data/portfolio';

describe('portfolio.index', () => {
  // Verify container and capture first item once.
  test('catalog is a non-empty array and exposes a first item object', () => {
    expect(Array.isArray(catalog)).toBeTruthy();
    expect(catalog.length).toBeGreaterThan(0);
    expect(typeof catalog[0]).toBe('object');
  });

  describe('faqItems', () => {
    test('has at least ten non-empty Q/A pairs', () => {
      expect(Array.isArray(faqItems)).toBe(true);
      expect(faqItems.length).toBeGreaterThanOrEqual(10);
      faqItems.forEach((entry) => {
        expect(textContent(entry.question).length).toBeGreaterThan(0);
        expect(textContent(entry.answer).length).toBeGreaterThan(0);
      });
    });

    test('uses CollectionPage schema for portfolio', () => {
      expect(schema).toBe('CollectionPage');
    });

    test('preserves the canonical facts threaded through the rewritten narrative pitch', () => {
      const pitch = textContent(intro.description);
      expect(pitch).toMatch(/15 production systems/);
      expect(pitch).toMatch(/technology stack that brought it to/);
      expect(pitch).toMatch(/impact it delivered/);
      expect(pitch).toMatch(/billion emails a day/);
      expect(pitch).toMatch(/50 ms p99/);
      expect(pitch).toMatch(/5% of what a licensed replacement/);
      expect(pitch).toMatch(/under \$100K a year to hundreds of millions/);
    });
  });

  // Validate first item's primitive/top-level fields.
  test('first catalog item has required primitive fields with sensible values', () => {
    const first = catalog[0];

    const requiredPrimitives = ['description', 'href', 'images', 'prefix', 'tags', 'title'];
    expect(Object.keys(first)).toEqual(expect.arrayContaining(requiredPrimitives));

    expect(typeof first.title).toBe('string');
    expect(first.title.length).toBeGreaterThan(0);

    expect(typeof first.description).toBe('string');
    expect(first.description.length).toBeGreaterThan(0);

    expect(typeof first.prefix).toBe('string');
    expect(first.prefix.length).toBeGreaterThan(0);

    expect(first.href === undefined || typeof first.href === 'string').toBeTruthy();

    expect(Array.isArray(first.tags)).toBeTruthy();
    expect(first.tags.length).toBeGreaterThan(0);
    first.tags.forEach((t) => {
      expect(typeof t).toBe('string');
      expect(t.length).toBeGreaterThan(0);
    });
  });

  // Validate images structure only.
  test('first catalog item images array contains objects with alt and picture keys of expected shape', () => {
    const first = catalog[0];

    expect(Array.isArray(first.images)).toBeTruthy();
    expect(first.images.length).toBeGreaterThan(0);

    first.images.forEach((img) => {
      expect(typeof img).toBe('object');

      expect(typeof img.alt).toBe('string');
      expect(img.alt.length).toBeGreaterThan(0);

      expect(typeof img.picture).toBe('object');
      const { picture } = img;
      const expectedPicKeys: ('avif' | 'fallback' | 'webp')[] = ['avif', 'fallback', 'webp'];
      expect(Object.keys(picture)).toEqual(expect.arrayContaining(expectedPicKeys));

      expectedPicKeys.forEach((k) => {
        // eslint-disable-next-line security/detect-object-injection
        const entry = picture[k];
        const isModuleLike = entry && typeof entry === 'object' && 'default' in entry;
        const isPrimitiveLike = typeof entry === 'string' || typeof entry === 'number';
        expect(isModuleLike || isPrimitiveLike).toBeTruthy();
      });
    });
  });

  test('intro export has description and title', () => {
    expect(typeof intro).toBe('object');

    expect(typeof intro.description).toBe('object');
    expect((intro.description as any).props.children).toHaveLength(7);

    expect(intro.title).toBe('Portfolio');
  });

  test('layout export has title, description, and non-empty keywords array', () => {
    expect(typeof layout).toBe('object');

    expect(typeof layout.title).toBe('string');
    expect(layout.title?.length).toBeGreaterThan(0);

    expect(typeof layout.description).toBe('string');
    expect(layout.description?.length).toBeGreaterThan(0);

    expect(Array.isArray(layout.keywords)).toBeTruthy();
    expect(layout.keywords?.length).toBeGreaterThan(0);
    layout.keywords?.forEach((kw) => {
      expect(typeof kw).toBe('string');
      expect(kw.length).toBeGreaterThan(0);
    });
  });
});
