/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { isValidElement } from 'react';
import {
  characteristic,
  headline,
  layout,
  paragraphs,
  preamble,
  types,
} from '@site/src/data/about';

describe('data.about', () => {
  describe('characteristic', () => {
    it('has an attributes array of strings and a title', () => {
      expect(Array.isArray(characteristic.attributes)).toBeTruthy();
      expect(characteristic.attributes.length).toBeGreaterThan(0);
      characteristic.attributes.forEach((attr) => {
        expect(typeof attr).toEqual('string');
        expect(attr.length).toBeGreaterThan(0);
      });
      expect(typeof characteristic.title).toEqual('string');
      expect(characteristic.title).toContain('defines my approach');
    });
  });

  describe('headline', () => {
    it('is a non-empty string', () => {
      expect(typeof headline).toEqual('string');
      expect(headline.length).toBeGreaterThan(0);
      expect(headline).toMatch(/People, Purpose, and Results/);
    });
  });

  describe('layout', () => {
    it('contains description, keywords array, and title', () => {
      expect(typeof layout.description).toEqual('string');
      expect(layout.description.length).toBeGreaterThan(0);

      expect(Array.isArray(layout.keywords)).toBeTruthy();
      expect(layout.keywords.length).toBeGreaterThan(0);
      layout.keywords.forEach((kw) => {
        expect(typeof kw).toEqual('string');
        expect(kw.length).toBeGreaterThan(0);
      });

      expect(typeof layout.title).toEqual('string');
      expect(layout.title).toMatch(/^About -/);
    });
  });

  describe('paragraphs', () => {
    it('is an array of two non-empty strings', () => {
      expect(Array.isArray(paragraphs)).toBeTruthy();
      expect(paragraphs.length).toEqual(2);
      paragraphs.forEach((p) => {
        expect(typeof p).toEqual('string');
        expect(p.length).toBeGreaterThan(0);
      });
    });
  });

  describe('preamble', () => {
    it('has description and title as non-empty strings', () => {
      expect(typeof preamble.description).toEqual('string');
      expect(preamble.description.length).toBeGreaterThan(0);

      expect(typeof preamble.title).toEqual('string');
      expect(preamble.title).toMatch(/^About Ricky Huang/);
    });
  });

  describe('types', () => {
    it('is an array of two items with alt and Image properties', () => {
      expect(Array.isArray(types)).toBeTruthy();
      expect(types.length).toEqual(2);

      const [first, second] = types;
      expect(typeof first.alt).toEqual('string');
      expect(first.alt).toMatch(/Transformer People Type/);
      expect(isValidElement(<first.Image />)).toBeTruthy();
      expect(first.Image).toEqual(expect.any(Function));

      expect(typeof second.alt).toEqual('string');
      expect(second.alt).toMatch(/Transactor Task Type/);
      expect(isValidElement(<second.Image />)).toBeTruthy();
      expect(second.Image).toEqual(expect.any(Function));
    });
  });
});
