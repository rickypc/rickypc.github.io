/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { access, mkdir, stat } from 'node:fs/promises';
import { Bar } from 'cli-progress';
import { createWriteStream } from 'node:fs';
import {
  DEFAULT_BUILD_DIR_NAME,
  DEFAULT_CONFIG_FILE_NAME,
  loadFreshModule,
} from '@docusaurus/utils';
import { FontaineTransform } from 'fontaine';
import { imports } from '#root/package.json';
import { basename, join, resolve } from 'node:path';
import PdfMake from 'pdfmake';
import sharpAdapter from '@docusaurus/responsive-loader/sharp';
import { simpleGit } from 'simple-git';
// Templates & definitions.
import base from '#buddhism/_base';
import book from '#buddhism/_book';
import condensed from '#buddhism/_condensed';
import { fileName } from '#root/src/data/common';
import pdf from '#buddhism/_pdf';
import roll from '#buddhism/_roll';
import thangka from '#buddhism/_thangka';
import wheel from '#buddhism/_wheel';

// 24 * 60 * 60 * 1000.
export const MS_PER_DAY = 86400000;
const templates = {
  base,
  book,
  condensed,
  roll,
  thangka,
  wheel,
};

/**
 * Extends sitemap items with generated PDFs.
 * @param {object} options - Configuration options.
 * @param {(...args: object[]) => object[]} options.defaultCreateSitemapItems - Sitemap generator.
 * @returns {Array} Combined array of default items and PDF entries.
 */
export async function createSitemapItems({ defaultCreateSitemapItems, ...rest }) {
  const git = simpleGit();
  const items = await defaultCreateSitemapItems(rest);
  const today = new Date().toISOString().split('T')[0];
  const pdfs = await Promise.all(pdf.map(async ([template, path]) => {
    const lastmod = (await git.log({
      '--date': 'format:%Y-%m-%d',
      file: path.replace(/^#/, 'docs/'),
      format: { date: '%cd' },
      maxCount: 1,
    }))?.latest?.date || today;
    return {
      changefreq: 'weekly',
      lastmod,
      priority: 0.5,
      url: join(rest.siteConfig.url, 'pdf', `${fileName(path, template)}.pdf`),
    };
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
export function fileResolve(path, siteDir) {
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
export async function lastModified(path) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return stat(path).then((sts) => sts.mtimeMs).catch(() => 0);
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
}) {
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

/**
 * Generates PDFs on Docusaurus postBuild, with progress bar.
 * @param {object} options - Post-build configuration.
 * @param {string} options.outDir - Directory to output generated PDFs.
 * @param {object} options.siteConfig - Docusaurus site configuration object.
 * @param {string} options.siteDir - Docusaurus site directory.
 */
export async function postBuild({ outDir, siteConfig, siteDir }) {
  const bar = new Bar({}, {
    barCompleteChar: '█',
    barIncompleteChar: '░',
    format: '\x1B[34m● Pdf {bar}\x1B[0m {percentage}% | ETA: {eta}s | {value}/{total}',
    // It doesn't support pdf.length === 0.
    // stopOnComplete: true,
  });
  bar.start(pdf.length, 0);

  const devanagari = join(__dirname, 'font', 'noto', 'NotoSerifDevanagari-Regular.ttf');
  const devanagariBold = join(__dirname, 'font', 'noto', 'NotoSerifDevanagari-Bold.ttf');
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

  await Promise.all(pdf.map(async ([template, path]) => {
    const target = join(pdfDir, `${fileName(path, template)}.pdf`);
    if (await stale({
      data: path,
      siteDir,
      template,
      target,
    })) {
      // eslint-disable-next-line security/detect-object-injection
      const { definition, options } = await templates[template](path);
      await new Promise((settle) => {
        const document = printer.createPdfKitDocument({
          ...definition,
          info: {
            ...definition.info,
            author: siteConfig.title,
            creator: siteConfig.url,
            producer: siteConfig.url,
          },
        }, options);
        document.on('end', settle);
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        document.pipe(createWriteStream(target));
        document.end();
      });
    }
    bar.increment();
  }));
  bar.stop();
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
export default function plugin(context) {
  return {
    configureWebpack(_, isServer) {
      return {
        devServer: {
          compress: true,
          static: [{ directory: join(context.outDir, 'pdf'), publicPath: '/pdf' }],
        },
        mergeStrategy: { 'module.rules': 'prepend' },
        module: {
          rules: [
            {
              test: /\.(?:png|jpe?g)$/i,
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
        ],
      };
    },
    extendCli(cli) {
      cli
        .command('kit:pdf [siteDir]')
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
          const siteConfig = await loadFreshModule(siteConfigPath);
          await postBuild({ outDir, siteConfig, siteDir });
        }, { hidden: false });
    },
    name: basename(__dirname),
    postBuild,
  };
}
