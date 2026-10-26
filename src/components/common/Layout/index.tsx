/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { useLocation } from '@docusaurus/router';
import { PageMetadata } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import {
  type ArticleDates,
  articleDatesFor,
  articleUrl,
  blogPostingNode,
  collectionPageNode,
  type Faq,
  faqPageNode,
  graphFor,
  PERSON_NODE,
  profilePageNode,
  reviewNode,
  type SchemaType,
} from '@site/src/data/common';
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
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();
  const { dates } = (usePluginData('article-schema') ?? {}) as { dates?: ArticleDates };
  const facts = { description, keywords, title };
  const nodes: object[] = [profilePageNode(facts)];
  switch (schema) {
    case 'CollectionPage':
      nodes.push(collectionPageNode(facts));
      break;
    case 'Review':
      nodes.push(reviewNode(facts));
      break;
    case 'ProfilePage':
    case undefined:
      break;
    default:
      throw new Error(`No graph node builder for schema type: ${schema}`);
  }
  if (faq?.items?.length) {
    nodes.push(faqPageNode(faq));
  }
  const article = articleDatesFor(dates, pathname);
  if (article) {
    nodes.push(
      blogPostingNode({
        ...facts,
        dateModified: article.dateModified,
        datePublished: article.datePublished,
        url: articleUrl(siteConfig.url, pathname),
      }),
    );
  }
  nodes.push(PERSON_NODE);
  return (
    <ThemeLayout>
      <PageMetadata description={description} keywords={keywords} title={title}>
        {Children.toArray(metadatas)}
        <script type="application/ld+json">{graphFor(nodes)}</script>
        <meta content={description} name="twitter:description" />
        <meta content={title} name="twitter:title" />
      </PageMetadata>
      <main className={className}>
        <div className="container">{children}</div>
      </main>
    </ThemeLayout>
  );
});
