/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Layout from '@theme/Layout';
import { memo } from 'react';
import NotFoundContent from '@theme/NotFound/Content';
import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';

export default memo(function NotFound() {
  const title = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
  });
  return (
    <>
      <PageMetadata title={title} />
      <Layout>
        <NotFoundContent navigation="true" />
      </Layout>
    </>
  );
});
