/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { PageMetadata } from '@docusaurus/theme-common';
import { context, type Faq, faqContext, type SchemaType } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import ThemeLayout from '@theme/Layout';
import { Children, memo, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';

export type LayoutProps = {
  className?: string;
  description?: string;
  faq?: Faq;
  keywords?: string[];
  metadatas?: ReactNode;
  schema?: SchemaType;
  title?: string;
};

export default memo(function Layout({
  children,
  className,
  description,
  faq,
  keywords,
  metadatas,
  schema,
  title,
}: PropsWithChildren<LayoutProps>): ReactElement {
  useWelcome();
  const pageSchema =
    schema && schema !== 'ProfilePage'
      ? context({
          description,
          keywords,
          schema,
          title,
        })
      : null;
  return (
    <ThemeLayout>
      <PageMetadata description={description} keywords={keywords} title={title}>
        {Children.toArray(metadatas)}
        <script type="application/ld+json">{context({ description, keywords, title })}</script>
        {pageSchema && <script type="application/ld+json">{pageSchema}</script>}
        {faq?.items?.length && <script type="application/ld+json">{faqContext(faq)}</script>}
        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={title} />
      </PageMetadata>
      <main className={className}>
        <div className="container">{children}</div>
      </main>
    </ThemeLayout>
  );
});
