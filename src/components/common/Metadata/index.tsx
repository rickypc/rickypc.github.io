/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { useDoc, useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { PageMetadata } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import {
  type ArticleDates,
  articleDatesFor,
  articleUrl,
  blogPostingNode,
  breadcrumbListNode,
  graphFor,
  PERSON_NODE,
} from '@site/src/data/common';
import { usePrint, useReadingTime, useWelcome } from '@site/src/hooks/observer';
import { memo, type ReactElement, useEffect, useRef } from 'react';
import styles from './styles.module.css';

type Props = {
  navigation?: boolean;
};

const ReadingTime = memo(function ReadingTime(): ReactElement | null {
  const [readingTime] = useReadingTime('.theme-doc-markdown');
  const minutes = Math.floor(readingTime);
  const seconds = Math.round((readingTime - minutes) * 60);
  const text = minutes
    ? `🕒 ${minutes}:${seconds.toString().padStart(2, '0')} min read`
    : `🕒 ${seconds} sec read`;
  return minutes || seconds ? <span className={styles.readingTime}>{text}</span> : null;
});

export default memo(function Metadata({ navigation = false }: Props): ReactElement {
  const [printing] = usePrint();
  const doc = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const { dates } = (usePluginData('article-schema') ?? {}) as { dates?: ArticleDates };
  const snapshots = useRef<boolean[]>([]);
  useWelcome({ navigation });

  useEffect(() => {
    const details = Array.from(document.querySelectorAll('details'));
    if (printing) {
      snapshots.current = details.map((el) => el.open);
      details.forEach((el) => {
        el.dataset.collapsed = 'false';
        el.open = true;
        Object.assign((el.querySelector(':scope > div') as HTMLElement).style, {
          display: 'block',
          height: 'auto',
          overflow: 'visible',
        });
      });
    } else {
      details.forEach((el, index) => {
        if (!snapshots.current[index as number]) {
          el.dataset.collapsed = 'true';
          el.open = false;
          Object.assign((el.querySelector(':scope > div') as HTMLElement).style, {
            display: 'none',
            height: '0',
            overflow: 'hidden',
          });
        }
      });
      snapshots.current = [];
    }
  }, [printing]);

  const article = articleDatesFor(dates, doc.metadata.permalink);
  const breadcrumbs = useSidebarBreadcrumbs();
  const graph = graphFor([
    ...(breadcrumbs ? [breadcrumbListNode(breadcrumbs, siteConfig.url)] : []),
    ...(article
      ? [
          blogPostingNode({
            dateModified: article.dateModified,
            datePublished: article.datePublished,
            description: doc.metadata.description,
            keywords: doc.frontMatter?.keywords,
            title: doc.metadata.title,
            url: articleUrl(siteConfig.url, doc.metadata.permalink),
          }),
        ]
      : []),
    PERSON_NODE,
  ]);

  return (
    <>
      <PageMetadata>
        <script type="application/ld+json">{graph}</script>
      </PageMetadata>
      {navigation ? null : (
        <small className={styles.metadata}>
          <ReadingTime />
        </small>
      )}
    </>
  );
});
