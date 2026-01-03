/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type Config } from '@docusaurus/types';
import { createSitemapItems } from '#root/src/plugins/docusaurus-plugin-kit/index';
import { type Options, type ThemeConfig } from '@docusaurus/preset-classic';
import { type PluginOptions } from '@easyops-cn/docusaurus-search-local';

const config: Config = {
  baseUrl: '/',
  deploymentBranch: 'gh-pages',
  favicon: 'img/favicon.ico',
  future: { experimental_faster: true, v4: true },
  /*
  headTags: [
    {
      attributes: { href: 'https://counterapi.com', rel: 'preconnect' },
      tagName: 'link',
    },
  ],
  */
  i18n: {
    defaultLocale: 'en',
    localeConfigs: {
      en: {
        calendar: 'gregory',
        direction: 'ltr',
        htmlLang: 'en-US',
        label: 'English',
        path: 'en',
      },
    },
    locales: ['en'],
  },
  markdown: { hooks: { onBrokenMarkdownLinks: 'throw' } },
  onBrokenAnchors: 'throw',
  onBrokenLinks: 'throw',
  onDuplicateRoutes: 'throw',
  organizationName: 'rickypc',
  plugins: [require.resolve('#root/src/plugins/docusaurus-plugin-kit/index.ts')],
  presets: [
    [
      'classic',
      {
        docs: {},
        gtag: { trackingID: ['G-5G7P214N03', 'G-657RY80FJE', 'G-JYD543XZTH'] },
        sitemap: { createSitemapItems, ignorePatterns: ['/search/**'], lastmod: 'date' },
        theme: { customCss: require.resolve('#root/src/css/custom.css') },
      } satisfies Options,
    ],
  ],
  projectName: 'rickypc.github.io',
  themeConfig:
    {
      colorMode: { respectPrefersColorScheme: true },
      footer: {
        copyright: `Copyright © 2015-${new Date().getFullYear()} Ricky Huang. All Rights Reserved.`,
        style: 'dark',
      },
      metadata: [
        { name: 'author', content: 'Ricky Huang' },
        { property: 'og:image', content: 'https://ricky.one/img/self.png' },
        { property: 'og:site_name', content: 'Ricky Huang: Engineering Leadership & Full Stack Innovation' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: 'https://ricky.one/img/self.png' },
        { name: 'twitter:site', content: '@rickypc2000' },
      ],
      navbar: {
        items: [
          // Left.
          { label: 'About Me', position: 'left', to: 'about' },
          { label: 'Portfolio', position: 'left', to: 'portfolio' },
          { label: 'Timeline', position: 'left', to: 'timeline' },
          { label: 'Stories', position: 'left', to: 'stories' },
          { label: 'Resume', position: 'left', to: 'resume' },
          // Right.
          {
            'aria-label': 'Translate',
            className: 'navbar__item--translate',
            label: ' ',
            position: 'right',
            title: 'Translate',
            to: 'https://ricky-one.translate.goog/?_x_tr_sl=auto&_x_tr_tl=en',
          },
          {
            'aria-label': 'Github',
            className: 'navbar__item--github',
            label: ' ',
            position: 'right',
            title: 'Github',
            to: 'https://github.com/rickypc',
          },
          {
            'aria-label': 'Linkedin',
            className: 'navbar__item--linkedin',
            label: ' ',
            position: 'right',
            title: 'Linkedin',
            to: 'https://www.linkedin.com/in/rihuang',
          },
        ],
        logo: {
          alt: 'Logo',
          height: 'auto',
          src: '/img/logo.webp',
          width: 'auto',
        },
        title: 'Ricky Huang',
      },
    } satisfies ThemeConfig,
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        hideSearchBarWithNoSearchContext: true,
        indexBlog: false,
        indexPages: true,
        searchContextByPaths: [{ label: 'Notes', path: 'docs' }],
      } satisfies PluginOptions,
    ],
  ],
  title: 'Ricky Huang',
  trailingSlash: process.env.NODE_ENV === 'production',
  url: 'https://ricky.one',
};

export default config;
