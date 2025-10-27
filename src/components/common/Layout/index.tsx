/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { context } from '@site/src/data/common';
import { Children, memo, type ReactElement, type ReactNode } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import ThemeLayout from '@theme/Layout';
import { useWelcome } from '@site/src/hooks/observer';

export type LayoutProps = {
  children?: ReactNode;
  className?: string;
  description?: string;
  keywords?: string[];
  metadatas?: ReactNode;
  title?: string;
};

export default memo(function Layout({
  children,
  className,
  description,
  keywords,
  metadatas,
  title,
}: LayoutProps): ReactElement {
  useWelcome();
  return (
    <ThemeLayout>
      <PageMetadata description={description} keywords={keywords} title={title}>
        {Children.toArray(metadatas)}
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
});
