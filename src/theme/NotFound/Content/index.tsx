/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { memo, type ReactElement } from 'react';
import NotFoundContent from '@theme-original/NotFound/Content';
import { useWelcome } from '@site/src/hooks/observer';

export type NotFoundContentProps = {
  navigation?: boolean;
};

export default memo(function NotFoundContentWrapper({
  navigation = false,
  ...props
}: NotFoundContentProps): ReactElement {
  useWelcome({ navigation });
  return <NotFoundContent {...props} />;
});
