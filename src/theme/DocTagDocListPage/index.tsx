/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { context } from '@site/src/data/common';
import DocTagDocListPage, { type DocTagDocListPageType } from '@theme-original/DocTagDocListPage';
import { memo, type ReactElement } from 'react';
import { PageMetadata, usePluralForm } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { useWelcome } from '@site/src/hooks/observer';
import { type WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof DocTagDocListPageType>;

const useNDocsTaggedPlural = () => {
  const { selectMessage } = usePluralForm();
  return (count: number) => selectMessage(
    count,
    translate(
      {
        id: 'theme.docs.tagDocListPageTitle.nDocsTagged',
        description:
          'Pluralized label for "{count} docs tagged". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
        message: 'One doc tagged|{count} docs tagged',
      },
      { count },
    ),
  );
};

const usePageTitle = (props: Props): string => {
  const nDocsTaggedPlural = useNDocsTaggedPlural();
  return translate(
    {
      id: 'theme.docs.tagDocListPageTitle',
      description: 'The title of the page for a docs tag',
      message: '{nDocsTagged} with "{tagName}"',
    },
    { nDocsTagged: nDocsTaggedPlural(props.tag.count), tagName: props.tag.label },
  );
};

export default memo(function DocTagDocListPageWrapper(props: Props): ReactElement {
  const { label } = props.tag;
  const metadata = {
    description: `Explore notes and curated content on ${label} - practical insights, guides, and resources focused on ${label}, mindful living, and tech where relevant.`,
    keywords: [
      label,
      `${label} guides`,
      `${label} resources`,
      `${label} articles`,
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
    title: usePageTitle(props),
  };
  useWelcome({ navigation: false });
  return (
    <>
      <PageMetadata {...metadata}>
        <script type="application/ld+json">{context(metadata)}</script>
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:title" content={metadata.title} />
      </PageMetadata>
      <DocTagDocListPage {...props} />
    </>
  );
});
