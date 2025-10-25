/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @ts-check
 */

// eslint-disable-next-line import/extensions
import { createSitemapItems } from '#root/src/plugins/docusaurus-plugin-local/index.js';

/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: '/',
  deploymentBranch: 'gh-pages',
  favicon: 'img/favicon.ico',
  future: {
    experimental_faster: true,
    v4: true,
  },
  /*
  headTags: [
    {
      attributes: {
        href: 'https://counterapi.com',
        rel: 'preconnect',
      },
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
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  onBrokenAnchors: 'throw',
  onBrokenLinks: 'throw',
  onDuplicateRoutes: 'throw',
  organizationName: 'rickypc',
  plugins: ['./src/plugins/docusaurus-plugin-local'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {},
        gtag: {
          trackingID: ['G-5G7P214N03', 'G-657RY80FJE', 'G-JYD543XZTH'],
        },
        sitemap: {
          createSitemapItems,
          ignorePatterns: ['/docs/tags/**', '/search/**'],
          lastmod: 'date',
        },
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],
  projectName: 'rickypc.github.io',
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      footer: {
        copyright: `Copyright © 2015-${new Date().getFullYear()} Ricky Huang. All Rights Reserved.`,
        style: 'dark',
      },
      metadata: [
        { name: 'author', content: 'Ricky Huang' },
        { property: 'og:image', content: 'https://ricky.one/img/self.png' },
        { property: 'og:site_name', content: 'Ricky Huang - Engineering Leadership & Full Stack Innovation' },
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
            to: 'https://bit.ly/3VRIDFo',
          },
          {
            'aria-label': 'Linkedin',
            className: 'navbar__item--linkedin',
            label: ' ',
            position: 'right',
            title: 'Linkedin',
            to: 'https://bit.ly/3VUUrqb',
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
    }),
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        hideSearchBarWithNoSearchContext: true,
        indexBlog: false,
        indexPages: true,
        searchContextByPaths: [{ label: 'Notes', path: 'docs' }],
      }),
    ],
  ],
  title: 'Ricky Huang',
  trailingSlash: process.env.NODE_ENV === 'production',
  url: 'https://ricky.one',
};

export default config;
