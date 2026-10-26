/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { basename, join } from 'node:path';
import type { LoadContext, Plugin, PluginContentLoadedActions } from '@docusaurus/types';
import { getFileCommitDate } from '@docusaurus/utils';
import { glob } from 'fast-glob';
import type { ArticleDates } from '#root/src/data/common';

type ArticleDatesContent = { dates: ArticleDates };

/**
 * Derives each routed page's publish and modify dates from git history.
 * @param {string[]} sources - Content file paths relative to the site directory.
 * @param {string} siteDir - Absolute site directory used to resolve each source on disk.
 * @returns {Promise<ArticleDates>} The dates map keyed by routed URL (see `urlFor`), falling back
 *   to `now` for untracked or git-unavailable files.
 */
async function articleDates(sources: string[], siteDir: string): Promise<ArticleDates> {
  const dates: ArticleDates = {};
  const routed = sources.flatMap((source) => {
    const url = urlFor(source);
    return url === undefined ? [] : [{ source, url }];
  });
  for (const { source, url } of routed) {
    const [published, modified] = await Promise.all([
      commitDate(join(siteDir, source), 'oldest'),
      commitDate(join(siteDir, source), 'newest'),
    ]);
    const now = new Date();
    dates[url as string] = {
      dateModified: (modified ?? published ?? now).toISOString(),
      datePublished: (published ?? modified ?? now).toISOString(),
    };
  }
  return dates;
}

/**
 * Fetches a file's oldest or newest git commit date.
 * @param {string} file - Absolute path of the file to inspect.
 * @param {'oldest' | 'newest'} age - 'oldest' selects the first commit (publish date), 'newest' the
 *   last (modify date).
 * @returns {Promise<Date | null>} The commit date, or null when the file is untracked or git is
 *   unavailable.
 */
async function commitDate(file: string, age: 'oldest' | 'newest'): Promise<Date | null> {
  try {
    return (await getFileCommitDate(file, { age, includeAuthor: false })).date;
  } catch {
    // Untracked file or git unavailable.
    return null;
  }
}

/**
 * Maps a content file path to its routed URL.
 * @param {string} source - File path relative to the site directory, such as
 *   `docs/buddhism/x/y.mdx` or `src/pages/about/index.tsx`.
 * @returns {string | undefined} The routed URL with a trailing slash (the home page maps to `/`),
 *   or undefined for non-routed sources.
 */
export function urlFor(source: string): string | undefined {
  const docs = source.match(/^docs\/(.+)\.(mdx|md)$/);
  const page = source.match(/^src\/pages\/(.+)\.(tsx|ts|mdx|md)$/);
  const route = docs?.[1] !== undefined ? `docs/${docs[1]}` : page?.[1];
  if (route === undefined) {
    return undefined;
  }
  const trimmed = route.replace(/(^|\/)index$/, '');
  return `/${trimmed}${trimmed === '' ? '' : '/'}`;
}

/**
 * Docusaurus plugin exposing per-page git publish and modify dates as global data. Collects every
 * routed docs and pages source (skipping `_`-prefixed partials), derives each file's oldest and
 * newest commit dates, and publishes them under the `dates` key so
 * `usePluginData('article-schema')` can drive `BlogPosting` schema emission at render time.
 * @param {LoadContext} siteDir - The absolute site directory from the Docusaurus load context.
 * @returns {Promise<Plugin<ArticleDatesContent>>} The plugin definition whose `loadContent`
 *   computes and `contentLoaded` publishes the dates map.
 */
export default async function articleSchema({ siteDir }: LoadContext) {
  return {
    async contentLoaded({
      actions,
      content,
    }: {
      actions: PluginContentLoadedActions;
      content: ArticleDatesContent;
    }): Promise<void> {
      actions.setGlobalData(content);
    },
    async loadContent(): Promise<ArticleDatesContent> {
      const sources = (
        await Promise.all([
          glob('docs/**/*.md', { cwd: siteDir }),
          glob('docs/**/*.mdx', { cwd: siteDir }),
          glob('src/pages/**/*.{md,mdx,ts,tsx}', { cwd: siteDir }),
        ])
      )
        .flat()
        .filter((source) => !basename(source).startsWith('_'));
      return { dates: await articleDates(sources, siteDir) };
    },
    name: 'article-schema',
  } satisfies Plugin<ArticleDatesContent>;
}
