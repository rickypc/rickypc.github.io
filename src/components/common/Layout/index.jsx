/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { context } from '@site/src/data/common';
import { memo } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
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
    <ThemeLayout>
      <PageMetadata description={description} keywords={keywords} title={title}>
        {metadatas?.map((metadata) => metadata)}
        <script type="application/ld+json">{context({ description, keywords, title })}</script>
        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={title} />
      </PageMetadata>
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
