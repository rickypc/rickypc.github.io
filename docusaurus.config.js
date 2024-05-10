/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * -----------------------------------------------------------------------------
 * @ts-check
 */

/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: '/',
  deploymentBranch: 'gh-pages',
  favicon: 'img/favicon.ico',
  headTags: [
    {
      attributes: {
        href: 'https://counterapi.com',
        rel: 'preconnect',
      },
      tagName: 'link',
    },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'rickypc',
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
        max: 2160,
        min: 256,
        quality: 70,
        steps: 16,
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        gtag: {
          trackingID: ['G-5G7P214N03', 'G-657RY80FJE', 'G-JYD543XZTH'],
        },
        sitemap: {
          ignorePatterns: ['/tags/**'],
          lastmod: 'date',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  projectName: 'rickypc.github.io',
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      footer: {
        copyright: `Copyright © 2015-${new Date().getFullYear()} Ricky Huang. All Rights Reserved.`,
        style: 'dark',
      },
      metadata: [
        { name: 'author', content: 'Ricky Huang' },
        { property: 'og:image', content: 'https://ricky.one/img/home/self.png' },
        { property: 'og:site_name', content: 'Ricky Huang Leadership, Full Stack Development, Innovation, Characteristic' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: 'https://ricky.one/img/home/self.png' },
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
          height: 'auto',
          src: '/img/home/self.webp',
          width: 'auto',
        },
        title: 'Ricky Huang',
      },
    }),
  title: 'Engineering Leader, Full Stack Developer, Smart Creative, Innovator',
  trailingSlash: true,
  url: 'https://ricky.one',
};

export default config;
