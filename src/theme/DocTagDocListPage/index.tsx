/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { translate } from '@docusaurus/Translate';
import { PageMetadata, usePluralForm } from '@docusaurus/theme-common';
import type { WrapperProps } from '@docusaurus/types';
import { graphFor, PERSON_NODE, profilePageNode } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import DocTagDocListPage from '@theme-original/DocTagDocListPage';
import { memo, type ReactElement } from 'react';

type Props = WrapperProps<typeof DocTagDocListPage>;

const useNDocsTaggedPlural = () => {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          description:
            'Pluralized label for "{count} docs tagged". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          id: 'theme.docs.tagDocListPageTitle.nDocsTagged',
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
      description: 'The title of the page for a docs tag',
      // biome-ignore lint/security/noSecrets: -
      id: 'theme.docs.tagDocListPageTitle',
      // biome-ignore lint/security/noSecrets: -
      message: '{nDocsTagged} with "{tagName}"',
    },
    { nDocsTagged: nDocsTaggedPlural(props.tag.count), tagName: props.tag.label },
  );
};

/**
 * Wraps the theme's `DocTagDocListPage` for one docs tag and injects a `PageMetadata` block with a
 * tag-specific description, keyword list, and Twitter tags. The same block emits the JSON-LD
 * `@graph` pairing the page node with the author's profile node.
 * @param {Props} props - The wrapper props handed over by Docusaurus, whose tag label and count
 *   feed the keywords and the pluralised translated page title.
 * @returns {ReactElement} The metadata block above the unmodified tag listing page.
 */
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
        <script type="application/ld+json">
          {graphFor([profilePageNode(metadata), PERSON_NODE])}
        </script>
        <meta content={metadata.description} name="twitter:description" />
        <meta content={metadata.title} name="twitter:title" />
      </PageMetadata>
      <DocTagDocListPage {...props} />
    </>
  );
});
