/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Image from '@site/src/components/common/Image';
import Link from '@site/src/components/common/Link';
import MDXComponents from '@theme-original/MDXComponents';
import MultiLingual from '@site/src/components/common/MultiLingual';
import Phrase, { Instruction } from '@site/src/components/common/Phrase';
import Welcome from '@site/src/components/common/Welcome';

export default {
  // Use the default mapping.
  ...MDXComponents,
  // Register all other necessary custom component.
  Image,
  Instruction,
  Link,
  MultiLingual,
  Phrase,
  Welcome,
};
