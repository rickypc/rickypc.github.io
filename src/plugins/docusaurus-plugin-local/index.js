/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { Bar } from 'cli-progress';
import { createWriteStream, mkdirSync } from 'node:fs';
import {
  DEFAULT_BUILD_DIR_NAME,
  DEFAULT_CONFIG_FILE_NAME,
  loadFreshModule,
} from '@docusaurus/utils';
import { FontaineTransform } from 'fontaine';
import { join, resolve } from 'node:path';
import PdfMake from 'pdfmake';
import { simpleGit } from 'simple-git';
/* eslint-disable import/extensions */
import base from '#buddhism/_base.js';
import book from '#buddhism/_book.js';
import condensed from '#buddhism/_condensed.js';
import { fileName } from '#root/src/data/common.js';
import pdf from '#buddhism/_pdf.js';
import roll from '#buddhism/_roll.js';
import thangka from '#buddhism/_thangka.js';
import wheel from '#buddhism/_wheel.js';

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
 * Generates PDFs on Docusaurus postBuild, with progress bar.
 * @param {object} options - Post-build configuration.
 * @param {string} options.outDir - Directory to output generated PDFs.
 * @param {object} options.siteConfig - Docusaurus site configuration object.
 */
export async function postBuild({ outDir, siteConfig }) {
  const bar = new Bar({}, {
    barCompleteChar: '█',
    barIncompleteChar: '░',
    format: '\x1B[34m● Pdf {bar}\x1B[0m {percentage}% | ETA: {eta}s | {value}/{total}',
    // It doesn't support pdf.length === 0.
    // stopOnComplete: true,
  });
  bar.start(pdf.length, 0);

  const devanagari = new URL('./font/noto/NotoSerifDevanagari-Regular.ttf', import.meta.url).pathname;
  const devanagariBold = new URL('./font/noto/NotoSerifDevanagari-Bold.ttf', import.meta.url).pathname;
  const kokonor = new URL('./font/kokonor/Kokonor-Regular.ttf', import.meta.url).pathname;
  const printer = new PdfMake({
    Kokonor: {
      bold: kokonor,
      bolditalics: kokonor,
      italics: kokonor,
      normal: kokonor,
    },
    NotoSans: {
      bold: new URL('./font/noto/NotoSans-Bold.ttf', import.meta.url).pathname,
      bolditalics: new URL('./font/noto/NotoSans-BoldItalic.ttf', import.meta.url).pathname,
      italics: new URL('./font/noto/NotoSans-Italic.ttf', import.meta.url).pathname,
      normal: new URL('./font/noto/NotoSans-Regular.ttf', import.meta.url).pathname,
    },
    NotoSerifDevanagari: {
      bold: devanagariBold,
      bolditalics: devanagariBold,
      italics: devanagari,
      normal: devanagari,
    },
  });

  // Ensure the folder exist.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  mkdirSync(join(outDir, 'pdf'), { recursive: true });

  await Promise.all(pdf.map(async ([template, path]) => {
    await new Promise((settle) => {
      setImmediate(settle);
    });
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
      document.pipe(createWriteStream(join(outDir, 'pdf', `${fileName(path, template)}.pdf`)));
      document.end();
    });
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
export default function pluginLocal(context) {
  return {
    configureWebpack(_, isServer) {
      return {
        devServer: {
          compress: true,
          static: [
            {
              directory: new URL('../../../build/pdf', import.meta.url).pathname,
              publicPath: '/pdf',
            },
          ],
        },
        mergeStrategy: {
          'module.rules': 'prepend',
        },
        module: {
          rules: [
            {
              test: /\.(?:png|jpe?g)$/i,
              use: [
                require.resolve('@docusaurus/lqip-loader'),
                {
                  loader: require.resolve('@docusaurus/responsive-loader'),
                  options: {
                    // eslint-disable-next-line global-require
                    adapter: require('@docusaurus/responsive-loader/sharp'),
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
        .command('local:pdf [siteDir]')
        .description('Generate PDF files on local installation for development only.')
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
          await postBuild({ outDir, siteConfig });
        }, { hidden: false });
    },
    name: 'docusaurus-plugin-local',
    postBuild,
  };
}
