/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { PageMetadata } from '@docusaurus/theme-common';
import type { WrapperProps } from '@docusaurus/types';
import { context } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import DocCategoryGeneratedIndexPage from '@theme-original/DocCategoryGeneratedIndexPage';
import { memo, type ReactElement } from 'react';

type Props = WrapperProps<typeof DocCategoryGeneratedIndexPage>;

export default memo(function DocCategoryGeneratedIndexPageWrapper(props: Props): ReactElement {
  useWelcome({ navigation: false });
  return (
    <>
      <PageMetadata {...props.categoryGeneratedIndex}>
        <script type="application/ld+json">{context(props.categoryGeneratedIndex)}</script>
        <meta name="twitter:description" content={props.categoryGeneratedIndex.description} />
        <meta name="twitter:title" content={props.categoryGeneratedIndex.title} />
      </PageMetadata>
      <DocCategoryGeneratedIndexPage {...props} />
    </>
  );
});
