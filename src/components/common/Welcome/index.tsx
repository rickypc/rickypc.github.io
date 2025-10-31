/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { memo, type ReactElement } from 'react';
import PrintAdmonition from '@site/src/components/common/PrintAdmonition';
import SpeechAdmonition from '@site/src/components/common/SpeechAdmonition';
import { useWelcome } from '@site/src/hooks/observer';

export type WelcomeProps = {
  navigation?: boolean;
};

export default memo(function Welcome({ navigation = false }: WelcomeProps): ReactElement {
  useWelcome({ navigation });
  return (
    <>
      <PrintAdmonition />
      <SpeechAdmonition />
    </>
  );
});
