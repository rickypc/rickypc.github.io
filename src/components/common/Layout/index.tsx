/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { useHistory, useLocation } from '@docusaurus/router';
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
  faqEntries,
  faqPageNode,
  graphFor,
  normalizeRoute,
  PERSON_NODE,
  profilePageNode,
  reviewNode,
  type SchemaType,
} from '@site/src/data/common';
import { navigateTool, registerTools, type ToolDescriptor } from '@site/src/data/model-context';
import { useWelcome } from '@site/src/hooks/observer';
import ThemeLayout from '@theme/Layout';
import {
  Children,
  memo,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

export type LayoutProps = {
  className?: string;
  description?: string;
  faq?: Faq;
  keywords?: string[];
  metadatas?: ReactNode;
  schema?: SchemaType;
  title?: string;
};

const faqQuestions = (faq: Faq) =>
  faqEntries(faq).map(({ acceptedAnswer, name }) => ({
    answer: acceptedAnswer.text,
    question: name,
  }));

const faqTool = (faq: Faq): ToolDescriptor => ({
  description: `Returns the FAQ questions and answers published on the ${faq.slug || 'home'} page.`,
  execute: (args) => {
    const topic = args?.topic;
    if (topic !== undefined && topic !== null && typeof topic !== 'string') {
      return { error: 'get-faq expects topic to be a string' };
    }
    const query = topic === undefined || topic === null ? '' : topic.toLowerCase();
    const items = faqQuestions(faq).filter(({ question }) =>
      question.toLowerCase().includes(query),
    );
    return { items, page: faq.slug, total: items.length };
  },
  inputSchema: {
    properties: { topic: { description: 'Case-insensitive question filter.', type: 'string' } },
    type: 'object',
  },
  name: 'get-faq',
});

const printResumeTool = (): ToolDescriptor => ({
  description:
    'Opens the browser print dialog for the resume page so the visitor can save it as a PDF.',
  execute: () => {
    window.print();
    return {};
  },
  name: 'print-resume',
});

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
  useEffect(() => {
    if (!faq?.items?.length) {
      return undefined;
    }
    const registration = registerTools([faqTool(faq)]);
    return () => {
      if (registration instanceof AbortController) {
        registration.abort();
      }
    };
  }, [faq]);
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();
  const history = useHistory();
  const navigate = useCallback((path: string) => history.push(path), [history]);
  const { dates } = (usePluginData('article-schema') ?? {}) as { dates?: ArticleDates };
  const pageRoutes = useMemo(
    () =>
      Object.keys(dates ?? {})
        .filter((route) => !route.startsWith('/docs'))
        .sort(),
    [dates],
  );
  useEffect(() => {
    if (pageRoutes.length === 0) {
      return undefined;
    }
    const registration = registerTools([
      navigateTool({ domain: 'page', navigate, routes: pageRoutes }),
    ]);
    return () => {
      if (registration instanceof AbortController) {
        registration.abort();
      }
    };
  }, [navigate, pageRoutes]);
  useEffect(() => {
    if (normalizeRoute(pathname) !== '/resume') {
      return undefined;
    }
    const registration = registerTools([printResumeTool()]);
    return () => {
      if (registration instanceof AbortController) {
        registration.abort();
      }
    };
  }, [pathname]);
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
