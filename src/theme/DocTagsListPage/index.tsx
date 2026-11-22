/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { PageMetadata, translateTagsPageTitle } from '@docusaurus/theme-common';
import type { WrapperProps } from '@docusaurus/types';
import { graphFor, PERSON_NODE, profilePageNode } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import DocTagsListPage from '@theme-original/DocTagsListPage';
import { memo, type ReactElement } from 'react';

type Props = WrapperProps<typeof DocTagsListPage>;

/**
 * Wraps the theme's `DocTagsListPage`, the all-tags index, and injects a `PageMetadata` block with
 * a fixed SEO description, keyword list, and Twitter tags. The same block emits the JSON-LD
 * `@graph` pairing the page node with the author's profile node.
 * @param {Props} props - The wrapper props handed over by Docusaurus; the injected metadata is
 *   fixed copy, so they are only re-spread onto the original component.
 * @returns {ReactElement} The metadata block above the unmodified tags index.
 */
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
        <script type="application/ld+json">
          {graphFor([profilePageNode(metadata), PERSON_NODE])}
        </script>
        <meta content={metadata.description} name="twitter:description" />
        <meta content={metadata.title} name="twitter:title" />
      </PageMetadata>
      <DocTagsListPage {...props} />
    </>
  );
});
