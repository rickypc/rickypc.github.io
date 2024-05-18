/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { memo } from 'react';
import NotFoundContent from '@theme-original/NotFound/Content';
import PropTypes from 'prop-types';
import { useWelcome } from '@site/src/hooks/observer';

export default memo(Object.assign(function NotFoundContentWrapper({
  navigation = false,
  ...props
}) {
  useWelcome({ navigation });
  return <NotFoundContent {...props} />;
}, {
  propTypes: {
    navigation: PropTypes.bool,
  },
}));
