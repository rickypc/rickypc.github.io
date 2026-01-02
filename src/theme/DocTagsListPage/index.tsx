/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { context } from '@site/src/data/common';
import DocTagsListPage from '@theme-original/DocTagsListPage';
import { memo, type ReactElement } from 'react';
import { PageMetadata, translateTagsPageTitle } from '@docusaurus/theme-common';
import { useWelcome } from '@site/src/hooks/observer';
import { type WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof DocTagsListPage>;

export default memo(function DocTagsListPageWrapper(props: Props): ReactElement {
  const metadata = {
    description: 'Practical notes on Buddhism, mindfulness, meditation, and mindful living, plus concise tech insights and innovation reflections for curious readers.',
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
