/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import MDXComponents from '@theme-original/MDXComponents';
import Speech from '@site/src/components/common/Speech';
import Welcome from '@site/src/components/common/Welcome';

export default {
  // Re-use the default mapping.
  ...MDXComponents,
  // Map majority of the custom components.
  Speech,
  Welcome,
};
