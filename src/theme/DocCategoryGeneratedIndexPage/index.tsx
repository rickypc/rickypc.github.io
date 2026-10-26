/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { PageMetadata } from '@docusaurus/theme-common';
import type { WrapperProps } from '@docusaurus/types';
import { graphFor, PERSON_NODE, profilePageNode } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import DocCategoryGeneratedIndexPage from '@theme-original/DocCategoryGeneratedIndexPage';
import { memo, type ReactElement } from 'react';

type Props = WrapperProps<typeof DocCategoryGeneratedIndexPage>;

export default memo(function DocCategoryGeneratedIndexPageWrapper(props: Props): ReactElement {
  useWelcome({ navigation: false });
  return (
    <>
      <PageMetadata {...props.categoryGeneratedIndex}>
        <script type="application/ld+json">
          {graphFor([profilePageNode(props.categoryGeneratedIndex), PERSON_NODE])}
        </script>
        <meta content={props.categoryGeneratedIndex.description} name="twitter:description" />
        <meta content={props.categoryGeneratedIndex.title} name="twitter:title" />
      </PageMetadata>
      <DocCategoryGeneratedIndexPage {...props} />
    </>
  );
});
