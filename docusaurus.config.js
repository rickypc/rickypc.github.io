/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * -----------------------------------------------------------------------------
 * @ts-check
 */

import { themes as prismThemes } from 'prism-react-renderer';

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
    () => ({
      name: 'ricky-plugin-image',
      configureWebpack(_, isServer) {
        return {
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
        };
      },
    }),
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {},
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
        { property: 'og:site_name', content: 'Ricky Huang Leadership, Full Stack Development, Innovation, and Characteristic' },
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
          src: '/img/home/logo.webp',
          width: 'auto',
        },
        title: 'Ricky Huang',
      },
      prism: {
        darkTheme: prismThemes.dracula,
        theme: prismThemes.github,
      },
    }),
  title: 'Ricky Huang',
  trailingSlash: process.env.NODE_ENV === 'production',
  url: 'https://ricky.one',
};

export default config;
