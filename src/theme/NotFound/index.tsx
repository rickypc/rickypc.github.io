/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { translate } from '@docusaurus/Translate';
import type { WrapperProps } from '@docusaurus/types';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';
import type NotFound from '@theme-original/NotFound';
import { memo, type ReactElement } from 'react';

type Props = WrapperProps<typeof NotFound>;

/**
 * Wraps the theme's `NotFound`, replacing its markup with the site `Layout` around
 * `NotFoundContent` so the error route shares the site chrome. The `Layout` injects the 404 title,
 * description, keywords, and JSON-LD graph in place of the theme defaults.
 * @param {Props} props - The wrapper props handed over by Docusaurus, spread onto the 404 content.
 * @returns {ReactElement} The layout-wrapped 404 page.
 */
export default memo(function NotFoundWrapper(props: Props): ReactElement {
  const layout = {
    description:
      "Page not found - the resource you requested doesn't exist. Try searching the site, visit the homepage, or browse the tags and sitemap to find what you need.",
    keywords: [
      '404',
      'page not found',
      'site search',
      'sitemap',
      'help',
      'error page',
      'missing page',
      'not found',
      'return home',
      'documentation',
    ],
    title: translate({
      id: 'theme.NotFound.title',
      message: 'Page Not Found',
    }),
  };
  return (
    <Layout {...layout}>
      <NotFoundContent {...props} navigation="true" />
    </Layout>
  );
});
