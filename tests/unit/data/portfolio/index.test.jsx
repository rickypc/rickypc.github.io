/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { catalog, layout, preamble } from '@site/src/data/portfolio';

describe('portfolio.index', () => {
  // Verify container and capture first item once.
  it('catalog is a non-empty array and exposes a first item object', () => {
    expect(Array.isArray(catalog)).toBeTruthy();
    expect(catalog.length).toBeGreaterThan(0);
    expect(typeof catalog[0]).toBe('object');
  });

  // Validate first item's primitive/top-level fields (single responsibility).
  it('first catalog item has required primitive fields with sensible values', () => {
    const first = catalog[0];

    const requiredPrimitives = ['title', 'description', 'prefix', 'href', 'tags', 'images'];
    expect(Object.keys(first)).toEqual(expect.arrayContaining(requiredPrimitives));

    expect(typeof first.title).toBe('string');
    expect(first.title.length).toBeGreaterThan(0);

    expect(typeof first.description).toBe('string');
    expect(first.description.length).toBeGreaterThan(0);

    expect(typeof first.prefix).toBe('string');
    expect(first.prefix.length).toBeGreaterThan(0);

    expect(first.href === null || typeof first.href === 'string').toBeTruthy();

    expect(Array.isArray(first.tags)).toBeTruthy();
    expect(first.tags.length).toBeGreaterThan(0);
    first.tags.forEach((t) => {
      expect(typeof t).toBe('string');
      expect(t.length).toBeGreaterThan(0);
    });
  });

  // Validate images structure only (keeps concerns separated from primitives).
  it('first catalog item images array contains objects with alt and picture keys of expected shape', () => {
    const first = catalog[0];

    expect(Array.isArray(first.images)).toBeTruthy();
    expect(first.images.length).toBeGreaterThan(0);

    first.images.forEach((img) => {
      expect(typeof img).toBe('object');

      expect(typeof img.alt).toBe('string');
      expect(img.alt.length).toBeGreaterThan(0);

      expect(typeof img.picture).toBe('object');
      const { picture } = img;
      const expectedPicKeys = ['avif', 'fallback', 'webp'];
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

  // Validate layout once, focused checks.
  it('layout export has title, description, and non-empty keywords array', () => {
    expect(typeof layout).toBe('object');

    expect(typeof layout.title).toBe('string');
    expect(layout.title.length).toBeGreaterThan(0);

    expect(typeof layout.description).toBe('string');
    expect(layout.description.length).toBeGreaterThan(0);

    expect(Array.isArray(layout.keywords)).toBeTruthy();
    expect(layout.keywords.length).toBeGreaterThan(0);
    layout.keywords.forEach((kw) => {
      expect(typeof kw).toBe('string');
      expect(kw.length).toBeGreaterThan(0);
    });
  });

  // Validate preamble once, focused checks.
  it('preamble export has title, description, and boolean printAdmonition', () => {
    expect(typeof preamble).toBe('object');

    expect(typeof preamble.title).toBe('string');
    expect(preamble.title.length).toBeGreaterThan(0);

    expect(typeof preamble.description).toBe('string');
    expect(preamble.description.length).toBeGreaterThan(0);

    expect(typeof preamble.printAdmonition).toBe('boolean');
  });
});
