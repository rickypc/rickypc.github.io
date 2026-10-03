/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Image from '@site/src/components/common/Image';
import Link from '@site/src/components/common/Link';
import Metadata from '@site/src/components/common/Metadata';
import MultiLingual from '@site/src/components/common/MultiLingual';
import Phrase, { Instruction, Words } from '@site/src/components/common/Phrase';
import MDXComponents from '@theme-original/MDXComponents';

// Use the default mapping and register all other necessary custom component.
export default {
  ...MDXComponents,
  Image,
  Instruction,
  Link,
  Metadata,
  MultiLingual,
  Phrase,
  Words,
};
