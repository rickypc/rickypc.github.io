/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { context } from '@site/src/data/common';
import Head from '@docusaurus/Head';
import { memo } from 'react';
import PropTypes from 'prop-types';
import ThemeLayout from '@theme/Layout';
import { useWelcome } from '@site/src/hooks/observer';

export default memo(Object.assign(function Layout({
  children,
  className,
  description,
  keywords,
  metadatas,
  title,
}) {
  useWelcome();
  return (
    <ThemeLayout description={description} title={title}>
      <Head>
        <meta name="keyword" content={keywords.join(',')} />
        {metadatas?.map((metadata) => metadata)}
        <script type="application/ld+json">{context({ description, keywords, title })}</script>
        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={title} />
      </Head>
      <main className={className}>
        <div className="container">
          {children}
        </div>
      </main>
    </ThemeLayout>
  );
}, {
  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    metadatas: PropTypes.arrayOf(PropTypes.shape()),
    title: PropTypes.string,
  },
}));
