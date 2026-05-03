/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import audio from '#buddhism/media/audio/_index';
import { fileName } from '#root/src/data/common';
import { getFileCommitDate } from '@docusaurus/utils';
import { join } from 'node:path';
import pdf from '#buddhism/media/pdf/_index';
import { type PluginOptions } from '@docusaurus/plugin-sitemap';

type CreateSitemapItemsFn = NonNullable<PluginOptions['createSitemapItems']>;
type CreateSitemapItemsParams = Parameters<CreateSitemapItemsFn>[0];
type SitemapItems = Awaited<ReturnType<CreateSitemapItemsFn>>;
// After SitemapItems assignment.
type SitemapItem = SitemapItems[number];

/**
 * Extends sitemap items with generated PDFs.
 * @param {object} options - Configuration options.
 * @param {(...args: object[]) => object[]} options.defaultCreateSitemapItems - Sitemap generator.
 * @returns {Array} Combined array of default items and PDF entries.
 */
export async function createSitemapItems({
  defaultCreateSitemapItems, ...rest
}: CreateSitemapItemsParams): Promise<SitemapItems> {
  const items = await defaultCreateSitemapItems(rest);
  const today = new Date().toISOString().split('T')[0];
  const uncommitted: string[] = [];
  const audios = await Promise.all(audio.map(async ([/* ignore */, path]) => {
    const commit = await getFileCommitDate(
      path.replace(/^#/, 'docs/'),
      { age: 'newest', includeAuthor: false },
    ).catch(() => {
      uncommitted.push(`- audio: ${path}`);
      return null;
    });
    return {
      changefreq: 'weekly',
      // YYYY-MM-DD via en-CA.
      lastmod: commit?.date ? commit.date.toLocaleDateString('en-CA') : today,
      priority: 0.5,
      url: join(rest.siteConfig.url, 'audio', `${fileName(path)}.m4a`),
    } as SitemapItem;
  }));
  const pdfs = await Promise.all(pdf.map(async ([template, path]) => {
    const commit = await getFileCommitDate(
      path.replace(/^#/, 'docs/'),
      { age: 'newest', includeAuthor: false },
    ).catch(() => {
      uncommitted.push(`- pdf: ${path}`);
      return null;
    });
    return {
      changefreq: 'weekly',
      // YYYY-MM-DD via en-CA.
      lastmod: commit?.date ? commit.date.toLocaleDateString('en-CA') : today,
      priority: 0.5,
      url: join(rest.siteConfig.url, 'pdf', `${fileName(path, template)}.pdf`),
    } as SitemapItem;
  }));
  if (uncommitted.length) {
    // eslint-disable-next-line no-console
    console.error('\x1B[31mPlease commit these files so lastmod dates can be generated correctly:');
    // eslint-disable-next-line no-console
    console.error(uncommitted.join('\n'));
    // eslint-disable-next-line no-console
    console.error('');
  }
  return [...items, ...audios, ...pdfs];
}

export const ignorePatterns = ['/search/**'];

export const lastmod = 'date';
