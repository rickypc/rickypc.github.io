/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Layout from '@theme/Layout';
import { memo, type ReactElement } from 'react';
import NotFoundContent from '@theme/NotFound/Content';
import { type NotFoundType } from '@theme-original/NotFound';
import { translate } from '@docusaurus/Translate';
import { type WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof NotFoundType>;

export default memo(function NotFoundWrapper(props: Props): ReactElement {
  const layout = {
    description: 'Page not found — the resource you requested doesn\'t exist. Try searching the site, visit the homepage, or browse the tags and sitemap to find what you need.',
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
