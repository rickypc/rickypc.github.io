/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Link from '@docusaurus/Link';
import MDXComponents from '@theme-original/MDXComponents';
import MultiLingual from '@site/src/components/common/MultiLingual';
import Phrase from '@site/src/components/common/Phrase';
import Welcome from '@site/src/components/common/Welcome';

export default {
  // Re-use the default mapping.
  ...MDXComponents,
  // Map majority of the custom components.
  Link,
  MultiLingual,
  Phrase,
  Welcome,
};
