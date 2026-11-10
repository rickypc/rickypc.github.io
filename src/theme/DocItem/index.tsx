/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { useHistory } from '@docusaurus/router';
import type { WrapperProps } from '@docusaurus/types';
import { usePluginData } from '@docusaurus/useGlobalData';
import { type ArticleDates, fileName, key } from '@site/src/data/common';
import { navigateTool, registerTools, type ToolDescriptor } from '@site/src/data/model-context';
import OriginalDocItem from '@theme-original/DocItem';
import { memo, type ReactElement, useCallback, useEffect, useMemo } from 'react';
import audio from '#buddhism/media/audio/_index';
import pdf from '#buddhism/media/pdf/_index';

type MediaEntry = { title: string; url: string };

type Props = WrapperProps<typeof OriginalDocItem>;

const docAlias = (source: string) => {
  const marker = source.lastIndexOf('/buddhism/');
  return marker === -1 ? undefined : `#${source.slice(marker + 1).replace(/\.[^/.]+$/, '.ts')}`;
};

const scopedMedia = (index: readonly string[][], alias: string) =>
  index.filter(([, entry]) => entry === alias);

// After scopedMedia assignment.
const audioEntries = (alias: string): MediaEntry[] =>
  scopedMedia(audio, alias).map(([title, entry]) => ({
    title,
    url: key(fileName(entry), '/audio', '/', 'm4a', '.'),
  }));

const pdfEntries = (alias: string): MediaEntry[] =>
  scopedMedia(pdf, alias).map(([title, entry]) => ({
    title,
    url: key(fileName(entry, title), '/pdf', '/', 'pdf', '.'),
  }));

// After pdfEntries assignment.
const docMediaTool = (alias: string): ToolDescriptor => ({
  description:
    "Returns the current doc's downloadable audio and PDF entries for the topic in view.",
  execute: () => ({ audio: audioEntries(alias), pdf: pdfEntries(alias) }),
  name: 'get-doc-media',
});

/**
 * Wraps every doc content page (the MDX routes) so the docs domain registers its own
 * WebMCP tools: doc-route navigation plus the current topic's audio and PDF downloads.
 * Category, tag, and generated index pages keep rendering the original components
 * untouched, so the pages and docs domains stay isolated by construction.
 * @param {Props} props - The doc item props forwarded by Docusaurus.
 * @returns {ReactElement} The original doc item with the tools mounted around it.
 */
export default memo(function DocItemWrapper(props: Props): ReactElement {
  const { content } = props;
  const history = useHistory();
  const navigate = useCallback((path: string) => history.push(path), [history]);
  const { dates } = (usePluginData('article-schema') ?? {}) as { dates?: ArticleDates };
  const docRoutes = useMemo(
    () =>
      Object.keys(dates ?? {})
        .filter((route) => route.startsWith('/docs'))
        .sort(),
    [dates],
  );
  const source = typeof content.metadata.source === 'string' ? content.metadata.source : undefined;
  const alias = source === undefined ? undefined : docAlias(source);
  useEffect(() => {
    if (docRoutes.length === 0) {
      return undefined;
    }
    const registration = registerTools([
      navigateTool({ domain: 'doc', navigate, routes: docRoutes }),
    ]);
    return () => {
      if (registration instanceof AbortController) {
        registration.abort();
      }
    };
  }, [docRoutes, navigate]);
  useEffect(() => {
    if (source === undefined || alias === undefined) {
      return undefined;
    }
    const registration = registerTools([docMediaTool(alias)]);
    return () => {
      if (registration instanceof AbortController) {
        registration.abort();
      }
    };
  }, [alias, source]);
  return <OriginalDocItem {...props} />;
});
