/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { PageMetadata, translateTagsPageTitle } from '@docusaurus/theme-common';
import type { WrapperProps } from '@docusaurus/types';
import { context } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import DocTagsListPage from '@theme-original/DocTagsListPage';
import { memo, type ReactElement } from 'react';

type Props = WrapperProps<typeof DocTagsListPage>;

export default memo(function DocTagsListPageWrapper(props: Props): ReactElement {
  const metadata = {
    description:
      'Practical notes on Buddhism, mindfulness, meditation, and mindful living, plus concise tech insights and innovation reflections for curious readers.',
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
        <meta content={metadata.description} name="twitter:description" />
        <meta content={metadata.title} name="twitter:title" />
      </PageMetadata>
      <DocTagsListPage {...props} />
    </>
  );
});
