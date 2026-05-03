/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { getFileCommitDate } from '@docusaurus/utils';
import { type PluginOptions } from '@docusaurus/plugin-sitemap';

type CreateSitemapItemsFn = NonNullable<PluginOptions['createSitemapItems']>;
type SitemapItems = Awaited<ReturnType<CreateSitemapItemsFn>>;
// After SitemapItems assignment.
type SitemapItem = SitemapItems[number];

jest.mock('#buddhism/media/audio/_index', () => [
  ['id_ID-news_tts-medium', '#lib/path/one.md'],
  ['en_US-hfc_male-medium', '#lib/path/_ricky_huang.md'],
  ['id_ID-news_tts-medium', '#lib/path/three.md'],
]);
jest.mock('#buddhism/media/pdf/_index', () => [
  ['base', '#lib/path/one.md'],
  ['book', '#lib/path/_ricky_huang.md'],
]);
jest.mock('#lib/path/one.md', () => ({
  transliteration: {
    children: 'One',
    title: 'One',
  },
}), { virtual: true });
jest.mock('#lib/path/_ricky_huang.md', () => ({
  transliteration: {
    children: 'Two',
    title: 'Two',
  },
}), { virtual: true });
jest.mock('#lib/path/three.md', () => ({
  transliteration: {
    children: 'Three',
    title: 'Three',
  },
}), { virtual: true });

// Sync.
const audio = require('#buddhism/media/audio/_index');
const pdf = require('#buddhism/media/pdf/_index');
const Plugin = require('@site/src/plugins/sitemap');

describe('plugins.sitemap', () => {
  describe('createSitemapItems', () => {
    test('appends pdf entries using git lastmod when available', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

      const defaultItems = [{ url: '/a' }];
      const defaultCreateSitemapItems = jest.fn(async () => defaultItems);
      (getFileCommitDate as jest.Mock).mockResolvedValue({
        date: new Date('2025-10-01T07:00:00.000Z'),
      });

      const result = await Plugin.createSitemapItems({
        defaultCreateSitemapItems,
        siteConfig: { url: 'https://mysite.test' },
      });

      expect(spy).not.toHaveBeenCalled();

      const audioStart = defaultItems.length;
      // After audioStart assignment.
      const audioEnd = audioStart + audio.length;
      const audios = result.slice(audioStart, audioEnd);
      const pdfs = result.slice(audioEnd);

      expect(audios).toHaveLength(audio.length);
      expect(pdfs).toHaveLength(pdf.length);

      audios.forEach((item: SitemapItem) => {
        const normalized = item.url.replace(/^(https?:)\/+/, '$1//');
        expect(normalized.startsWith('https://mysite.test/audio/')).toBeTruthy();
        expect(normalized.endsWith('.m4a')).toBeTruthy();
        expect(item.lastmod).toBe('2025-10-01');
        expect(item).toMatchObject({ changefreq: 'weekly', priority: 0.5 });
      });

      pdfs.forEach((item: SitemapItem) => {
        const normalized = item.url.replace(/^(https?:)\/+/, '$1//');
        expect(normalized.startsWith('https://mysite.test/pdf/')).toBeTruthy();
        expect(normalized.endsWith('.pdf')).toBeTruthy();
        expect(item.lastmod).toBe('2025-10-01');
        expect(item).toMatchObject({ changefreq: 'weekly', priority: 0.5 });
      });

      spy.mockRestore();
    });

    test('falls back to today and prints summary when git throws', async () => {
      const defaultCreateSitemapItems = jest.fn(async () => []);
      (getFileCommitDate as jest.Mock).mockRejectedValue(new Error('no commit'));
      const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

      const result = await Plugin.createSitemapItems({
        defaultCreateSitemapItems,
        siteConfig: { url: 'https://x.y' },
      });

      const today = new Date().toISOString().split('T')[0];
      expect(result.length).toBeGreaterThan(0);
      result.forEach((item: SitemapItem) => expect(item.lastmod).toBe(today));

      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(1, '\x1B[31mPlease commit these files so lastmod dates can be generated correctly:');
      expect(spy).toHaveBeenNthCalledWith(2, '- audio: #lib/path/one.md\n- audio: #lib/path/_ricky_huang.md\n- audio: #lib/path/three.md\n- pdf: #lib/path/one.md\n- pdf: #lib/path/_ricky_huang.md');
      expect(spy).toHaveBeenNthCalledWith(3, '');

      spy.mockRestore();
    });

    test('does not print summary when git commit exists', async () => {
      (getFileCommitDate as jest.Mock).mockResolvedValue({
        date: new Date('2025-10-01T07:00:00.000Z'),
      });

      const defaultCreateSitemapItems = jest.fn(async () => []);
      const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

      const result = await Plugin.createSitemapItems({
        defaultCreateSitemapItems,
        siteConfig: { url: 'https://mysite.test' },
      });

      expect(spy).not.toHaveBeenCalled();

      result.forEach((item: SitemapItem) => {
        expect(item.lastmod).toBe('2025-10-01');
      });

      spy.mockRestore();
    });
  });

  describe('other exports', () => {
    test('ignorePatterns should contain the expected pattern', () => {
      expect(Plugin.ignorePatterns).toEqual(['/search/**']);
    });

    test('lastmod should be "date"', () => {
      expect(Plugin.lastmod).toBe('date');
    });
  });
});
