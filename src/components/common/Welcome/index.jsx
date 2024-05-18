/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { memo } from 'react';
import PrintAdmonition from '@site/src/components/common/PrintAdmonition';
import PropTypes from 'prop-types';
import SpeechAdmonition from '@site/src/components/common/SpeechAdmonition';
import { useWelcome } from '@site/src/hooks/observer';

export default memo(Object.assign(function Welcome({ navigation = false }) {
  useWelcome({ navigation });
  return (
    <>
      <PrintAdmonition />
      <SpeechAdmonition />
    </>
  );
}, {
  propTypes: {
    navigation: PropTypes.bool,
  },
}));
