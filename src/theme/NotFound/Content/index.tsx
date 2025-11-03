/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Content, { type ContentType } from '@theme-original/NotFound/Content';
import { memo, type ReactElement } from 'react';
import { useWelcome } from '@site/src/hooks/observer';
import { type WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof ContentType>;

export default memo(function ContentWrapper({ navigation = false, ...props }: Props): ReactElement {
  useWelcome({ navigation });
  return <Content {...props} />;
});
