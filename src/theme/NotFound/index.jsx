/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { memo } from 'react';
import NotFound from '@theme-original/NotFound';
import { useWelcome } from '@site/src/hooks/observer';

export default memo(function NotFoundWrapper(props) {
  useWelcome();
  return <NotFound {...props} />;
});
