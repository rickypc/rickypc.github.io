/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import {
  access,
  mkdir,
  readdir,
  readFile,
  stat,
  writeFile,
} from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import Beasties from 'beasties';
import concurrent from 'timeable-promise/concurrent';
import { createHash } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import {
  DEFAULT_BUILD_DIR_NAME,
  DEFAULT_CONFIG_FILE_NAME,
  getFileCommitDate,
  loadFreshModule,
} from '@docusaurus/utils';
import { type DocusaurusConfig, type LoadContext, type Plugin } from '@docusaurus/types';
import { FontaineTransform } from 'fontaine';
import { dependencies, imports } from '#root/package.json';
import { minimatch } from 'minimatch';
import { MultiBar } from 'cli-progress';
import PdfMake from 'pdfmake';
import { type PluginOptions } from '@docusaurus/plugin-sitemap';
import sharpAdapter from '@docusaurus/responsive-loader/sharp';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';
// Templates & definitions.
import base from '#buddhism/_base';
import book from '#buddhism/_book';
import condensed from '#buddhism/_condensed';
import { fileName } from '#root/src/data/common';
import pdf from '#buddhism/_pdf';
import roll from '#buddhism/_roll';
import thangka from '#buddhism/_thangka';
import wheel from '#buddhism/_wheel';

type CreateSitemapItemsFn = NonNullable<PluginOptions['createSitemapItems']>;
type CreateSitemapItemsParams = Parameters<CreateSitemapItemsFn>[0];
type SitemapItems = Awaited<ReturnType<CreateSitemapItemsFn>>;
// After SitemapItems assignment.
type SitemapItem = SitemapItems[number];

type StaleProps = {
  data: string;
  maxAgeDays?: number;
  siteDir: string;
  template: string;
  target: string;
};

type Templates = {
  base: typeof base;
  book: typeof book;
  condensed: typeof condensed;
  roll: typeof roll;
  thangka: typeof thangka;
  wheel: typeof wheel;
};

// 24 * 60 * 60 * 1000.
export const MS_PER_DAY = 86400000;
const templates: Templates = {
  base,
  book,
  condensed,
  roll,
  thangka,
  wheel,
};

// ----------------------------------------------------------------------------
// Generic supporting methods.
// ----------------------------------------------------------------------------

/**
 * Extends sitemap items with generated PDFs.
 * @param {object} options - Configuration options.
 * @param {(...args: object[]) => object[]} options.defaultCreateSitemapItems - Sitemap generator.
 * @returns {Array} Combined array of default items and PDF entries.
 */
export async function createSitemapItems({
  defaultCreateSitemapItems,
  ...rest
}: CreateSitemapItemsParams): Promise<SitemapItems> {
  const items = await defaultCreateSitemapItems(rest);
  const today = new Date().toISOString().split('T')[0];
  const pdfs = await Promise.all(pdf.map(async ([template, path]) => {
    const commit = await getFileCommitDate(
      path.replace(/^#/, 'docs/'),
      { age: 'newest', includeAuthor: false },
    );
    return {
      changefreq: 'weekly',
      // YYYY-MM-DD via en-CA.
      lastmod: commit?.date ? commit.date.toLocaleDateString('en-CA') : today,
      priority: 0.5,
      url: join(rest.siteConfig.url, 'pdf', `${fileName(path, template)}.pdf`),
    } as SitemapItem;
  }));
  return [...items, ...pdfs];
}

/**
 * Resolve a file path relative to the site directory, applying custom import
 * mappings if the path matches a configured prefix.
 * @param {string} path - The original file path to resolve.
 * @param {string} siteDir - The root directory of the site.
 * @returns {string} The resolved absolute file path.
 * @example
 * // Given imports = { 'alias/*': 'src/*' }
 * // fileResolve('alias/utils.js', '/root')
 * // -> '/root/src/utils.js'
 */
export function fileResolve(path: string, siteDir: string): string {
  let response = path;
  Object.entries(imports).some(([key, value]) => {
    const prefix = key.replace('*', '');
    if (path.includes(prefix)) {
      response = value.replace('*', path.replace(prefix, ''));
      return true;
    }
    return false;
  });
  return resolve(join(siteDir, response));
}

/**
 * Get the last modified time of a file in milliseconds.
 * @param {string} path - The file system path to check.
 * @returns {Promise<number>} A promise that resolves to the file's last modified
 * time in milliseconds since the UNIX epoch. If the file does not exist or an
 * error occurs, the promise resolves to `0`.
 */
export async function lastModified(path: string): Promise<number> {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return stat(path).then((sts) => sts.mtimeMs).catch(() => 0);
}

/**
 * Recursively collects file paths from a given output directory and filters them
 * using a glob pattern.
 * @param {string} outDir - The root output directory to search within.
 * @param {string} pattern - A glob pattern used to filter files.
 * @returns { Promise<string[]>} An array of matching file paths.
 */
export async function outputPaths(outDir: string, pattern: string): Promise<string[]> {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return minimatch.match(await readdir(outDir, { recursive: true }), pattern, { matchBase: true })
    .map((file) => join(outDir, file));
}

/**
 * Determine whether a target file is considered stale based on its existence,
 * modification times of related files, and a maximum age threshold.
 * @param {object} options - Options for staleness check.
 * @param {string} options.data - Path to the data file.
 * @param {number} options.maxAgeDays - Maximum allowed age in days before the target is stale.
 * @param {string} options.siteDir - Root directory of the site.
 * @param {string} options.template - Template name used to build the target.
 * @param {string} options.target - Path to the target file.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the target
 * is stale, otherwise `false`.
 * @example
 * const isStale = await stale({
 *   data: 'content/articles.json',
 *   maxAgeDays: 3,
 *   siteDir: '/root',
 *   template: 'article',
 *   target: '/root/build/articles.html',
 * });
 * // -> true if target is missing, older than data/template, or past cutoff.
 */
export async function stale({
  data,
  maxAgeDays = 7,
  siteDir,
  template,
  target,
}: StaleProps): Promise<boolean> {
  // Target does not exist.
  if (await access(target).then(() => false).catch(() => true)) {
    return true;
  }
  const dataModified = await lastModified(fileResolve(data, siteDir));
  const targetModified = await lastModified(target);
  // Data recently modified.
  if (dataModified >= targetModified) {
    return true;
  }
  const templateModified = await lastModified(fileResolve(`#buddhism/_${template}.ts`, siteDir));
  // Template recently modified.
  if (templateModified >= targetModified) {
    return true;
  }
  // Stale due to age cutoff.
  const cutoff = Date.now() - maxAgeDays * MS_PER_DAY;
  if (cutoff >= targetModified) {
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------------
// postBuild supporting methods.
// ----------------------------------------------------------------------------

/**
 * Generate PDF files.
 * @param {object} context - The Docusaurus load context.
 * @param {string} context.outDir - The output directory where generated files are located.
 * @param {object} context.siteConfig - The site configuration object.
 * @param {string} context.siteDir - The root directory of the site.
 * @param {MultiBar} bars - A MultiBar instance used to render progress bars.
 * @returns {Promise<void>} Resolves when all PDFs have been generated.
 */
export async function generatePdf(
  { outDir, siteConfig, siteDir }: LoadContext,
  bars: MultiBar,
): Promise<void> {
  const algorithm = 'sha256';
  const bar = bars.create(pdf.length, 0, { color: '\x1B[34m', task: 'Create PDF' });
  bars.update();
  const devanagari = join(__dirname, 'font', 'noto', 'NotoSerifDevanagari-Regular.ttf');
  const devanagariBold = join(__dirname, 'font', 'noto', 'NotoSerifDevanagari-Bold.ttf');
  const generator = `pdfmake:${dependencies.pdfmake}`;
  const kokonor = join(__dirname, 'font', 'kokonor', 'Kokonor-Regular.ttf');
  const printer = new PdfMake({
    Kokonor: {
      bold: kokonor,
      bolditalics: kokonor,
      italics: kokonor,
      normal: kokonor,
    },
    NotoSans: {
      bold: join(__dirname, 'font', 'noto', 'NotoSans-Bold.ttf'),
      bolditalics: join(__dirname, 'font', 'noto', 'NotoSans-BoldItalic.ttf'),
      italics: join(__dirname, 'font', 'noto', 'NotoSans-Italic.ttf'),
      normal: join(__dirname, 'font', 'noto', 'NotoSans-Regular.ttf'),
    },
    NotoSerifDevanagari: {
      bold: devanagariBold,
      bolditalics: devanagariBold,
      italics: devanagari,
      normal: devanagari,
    },
  });

  // Ensure the folder exist.
  const pdfDir = join(outDir, 'pdf');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await mkdir(pdfDir, { recursive: true });

  await concurrent(pdf, async (batch, index) => {
    // Workload arbritary weight numbers.
    const weight = index * 75;
    // Tiny stagger to smooth progress bar display.
    await new Promise((settle) => {
      setTimeout(settle, weight);
    });
    await Promise.all(batch.map(async ([template, path]) => {
      const target = join(pdfDir, `${fileName(path, template)}.pdf`);
      if (await stale({
        data: path,
        siteDir,
        template,
        target,
      })) {
        const { definition, options } = await templates[template as keyof Templates](path);
        await new Promise<void>((settle, reject) => {
          const date = new Date();
          const document = printer.createPdfKitDocument({
            ...definition,
            displayTitle: true,
            info: {
              ...definition.info,
              author: siteConfig.title,
              creationDate: date,
              creator: siteConfig.url,
              modDate: date,
              producer: siteConfig.url,
              stamp: `${algorithm}:${createHash(algorithm).update(JSON.stringify({
                date, definition, generator, options,
              })).digest('hex')}`,
            },
            watermark: {
              bold: true,
              color: 'red',
              font: 'NotoSans',
              fontSize: 90,
              opacity: 0,
              text: siteConfig.url,
            },
          }, options);
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          const stream = createWriteStream(target);
          document.on('end', settle);
          document.on('error', reject);
          stream.on('error', reject);
          document.pipe(stream);
          document.end();
        });
        // Tiny stagger to unblock progress bar display.
        await new Promise((settle) => {
          // Scaled by workload weight.
          setTimeout(settle, weight);
        });
      }
      bar.increment();
      bars.update();
    }));
  }, 5);
  (bar as any).options.format = '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m';
  bars.update();
  bar.stop();
}

/**
 * Inline above-the-fold CSS into generated HTML files.
 * @param {string} outDir - The output directory containing built HTML files.
 * @param {MultiBar} bars - A MultiBar instance used to render progress bars.
 * @returns {Promise<void>} Resolves when all HTML files have been processed.
 */
export async function inlineAboveFold(outDir: string, bars:MultiBar): Promise<void> {
  const bar = bars.create(
    1,
    0,
    { color: '\x1B[36m', task: 'Find HTML ' },
    { format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m' },
  );
  bars.update();
  const beasties = new Beasties({ logLevel: 'warn', path: outDir, preload: 'swap' });
  const paths = await outputPaths(outDir, '*.html');
  bar.increment();
  bars.update();
  bar.setTotal(paths.length);
  (bar as any).options.format = '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total} | ETA: {eta}s\x1B[0m';
  bar.update(0, { task: 'Inline CSS' });
  await concurrent(paths, async (batch, index) => {
    // Tiny stagger to smooth progress bar display.
    await new Promise((settle) => {
      setTimeout(settle, index);
    });
    await Promise.all(batch.map(async (path) => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const html = await readFile(path, 'utf8');
      if (!html.includes('data-beasties-container')) {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        await writeFile(path, await beasties.process(html), 'utf8');
      }
      bar.increment();
      bars.update();
    }));
  }, 5);
  (bar as any).options.format = '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total}\x1B[0m';
  bars.update();
  bar.stop();
}

/**
 * Generates PDFs and inline above-the-fold CSS, with progress bar.
 * @param {object} options - Post-build configuration.
 * @param {string} options.outDir - Directory to output generated PDFs.
 * @param {object} options.siteConfig - Docusaurus site configuration object.
 * @param {string} options.siteDir - Docusaurus site directory.
 */
export async function postBuild({ outDir, siteConfig, siteDir }: LoadContext): Promise<void> {
  const bars = new MultiBar({
    barCompleteChar: '█',
    barIncompleteChar: '░',
    emptyOnZero: true,
    format: '{color}● {task} {bar}\x1B[0m ({percentage}%) \x1B[2m{value}/{total} | ETA: {eta}s\x1B[0m',
    hideCursor: true,
    // It doesn't support length === 0.
    stopOnComplete: true,
  });
  await Promise.all([
    generatePdf({ outDir, siteConfig, siteDir } as LoadContext, bars),
    siteConfig.trailingSlash ? inlineAboveFold(outDir, bars) : Promise.resolve(),
  ]);
  bars.stop();
}

/**
 * Main entry for custom Docusaurus plugin.
 * @param {object} context - Docusaurus build context (e.g. webpack, CLI).
 * @returns {{
 *   configureWebpack: (object, boolean) => void,
 *   extendCli: (object) => void,
 *   name: string,
 *   postBuild: (object) => void,
 * }} Plugin interface with lifecycle methods and name.
 */
export default function plugin(context: LoadContext): Plugin {
  return {
    configureWebpack(_: any, isServer: boolean) {
      return {
        devServer: {
          compress: true,
          static: [{ directory: join(context.outDir, 'pdf'), publicPath: '/pdf' }],
        },
        mergeStrategy: { 'module.rules': 'prepend' },
        module: {
          rules: [
            {
              test: /\.(?:jpe?g|png)$/i,
              use: [
                require.resolve('@docusaurus/lqip-loader'),
                {
                  loader: require.resolve('@docusaurus/responsive-loader'),
                  options: {
                    adapter: sharpAdapter,
                    // Don't emit for server-side rendering
                    emitFile: !isServer,
                    name: 'assets/images/[name].[hash:hex:7].[width].[ext]',
                    quality: 70,
                    sizes: [320, 480, 640, 768, 1024, 1366, 1600, 1920],
                  },
                },
              ],
            },
          ],
        },
        plugins: [
          FontaineTransform.webpack({
            fallbacks: [
              'system-ui',
              '-apple-system',
              'BlinkMacSystemFont',
              'Segoe UI',
              'Roboto',
              'Oxygen',
              'Ubuntu',
              'Cantarell',
              'Open Sans',
              'Helvetica Neue',
              'sans-serif',
            ],
          }),
          new TsCheckerRspackPlugin() as any,
        ],
      };
    },
    extendCli(cli) {
      cli
        .command('build:pdf [siteDir]')
        .description('Generate PDF files.')
        .option(
          '--config <config>',
          'The path to docusaurus config file (default: `[siteDir]/docusaurus.config.js`)',
        )
        .option(
          '--out-dir <dir>',
          'The full path for the new output directory, relative to the current workspace (default: build)',
        )
        .action(async (cliSiteDir = '.', options = {}) => {
          const siteDir = cliSiteDir ? resolve(cliSiteDir) : context.siteDir;
          // After siteDir assignment.
          const outDir = join(siteDir, options.outDir || DEFAULT_BUILD_DIR_NAME);
          const siteConfigPath = join(siteDir, options.config || DEFAULT_CONFIG_FILE_NAME);
          // After siteConfigPath assignment.
          const siteConfig = await loadFreshModule(siteConfigPath) as DocusaurusConfig;
          await postBuild({ outDir, siteConfig, siteDir } as LoadContext);
        });
    },
    name: basename(__dirname),
    postBuild,
  };
}
