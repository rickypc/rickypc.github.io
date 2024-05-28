/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { createWriteStream, mkdirSync } from 'node:fs';
import { FontaineTransform } from 'fontaine';
import { join } from 'node:path';
import PdfMake from 'pdfmake';
import { simpleGit } from 'simple-git';
// eslint-disable-next-line import/extensions
import pdf from '../../../docs/buddhism/_pdf.js';

export const createSitemapItems = async ({ defaultCreateSitemapItems, ...rest }) => {
  const git = simpleGit();
  const items = await defaultCreateSitemapItems(rest);
  const pdfs = await Promise.all(Object.entries(pdf).map(async ([key, { path }]) => {
    const lastmod = (await git.log({
      '--date': 'format:%Y-%m-%d',
      file: join('docs', 'buddhism', `${path}.js`),
      format: { date: '%cd' },
      maxCount: 1,
    }))?.latest?.date || new Date().toISOString().split('T')[0];
    return {
      changefreq: 'weekly',
      lastmod,
      priority: 0.5,
      url: join(rest.siteConfig.url, 'pdf', `${key}.pdf`),
    };
  }));
  return [...items, ...pdfs];
};

export default function pluginLocal() {
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
                    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
                    adapter: require('@docusaurus/responsive-loader/sharp'),
                    // Don't emit for server-side rendering
                    emitFile: !isServer,
                    max: 2160,
                    min: 256,
                    name: 'assets/images/[name].[hash:hex:7].[width].[ext]',
                    quality: 70,
                    steps: 16,
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
    async postBuild({ outDir, siteConfig }) {
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
      mkdirSync(join(outDir, 'pdf'), { recursive: true });

      await Promise.all(Object.entries(pdf).map(async ([key, { definition, options }]) => {
        await new Promise((resolve) => {
          const document = printer.createPdfKitDocument({
            ...definition,
            info: {
              ...definition.info,
              author: siteConfig.title,
              creator: siteConfig.url,
              producer: siteConfig.url,
            },
          }, options);
          document.on('end', resolve);
          document.pipe(createWriteStream(join(outDir, 'pdf', `${key}.pdf`)));
          document.end();
        });
      }));
    },
    name: 'docusaurus-plugin-local',
  };
}
