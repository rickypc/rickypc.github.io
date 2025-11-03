/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { context } from '@site/src/data/common';
import DocTagsListPage, { type DocTagsListPageType } from '@theme-original/DocTagsListPage';
import { memo, type ReactElement } from 'react';
import { PageMetadata, translateTagsPageTitle } from '@docusaurus/theme-common';
import { useWelcome } from '@site/src/hooks/observer';
import { type WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof DocTagsListPageType>;

export default memo(function DocTagsListPageWrapper(props: Props): ReactElement {
  const metadata = {
    description: 'Explore practical wisdom and personal notes on Buddhism, mindfulness, meditation, and mindful living, alongside tech insights and innovation-focused reflections.',
    keywords: [
      'buddhism',
      'mindfulness',
      'meditation',
      'dharma',
      'teachings',
      'spiritual practice',
      'personal growth',
      'mindful living',
      'technology',
      'innovation',
      'guides',
      'resources',
      'tibetan buddhism',
      'rituals',
      'mandala',
    ],
    title: translateTagsPageTitle(),
  };
  useWelcome({ navigation: false });
  return (
    <>
      <PageMetadata {...metadata}>
        <script type="application/ld+json">{context(metadata)}</script>
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:title" content={metadata.title} />
      </PageMetadata>
      <DocTagsListPage {...props} />
    </>
  );
});
