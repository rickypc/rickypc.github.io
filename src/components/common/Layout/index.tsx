/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import {
  Children,
  memo,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { context } from '@site/src/data/common';
import { PageMetadata } from '@docusaurus/theme-common';
import ThemeLayout from '@theme/Layout';
import { useWelcome } from '@site/src/hooks/observer';

export type LayoutProps = {
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
}: PropsWithChildren<LayoutProps>): ReactElement {
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
