/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Admonition from '@theme/Admonition';
import { admonitions, clsx } from '@site/src/data/common';
import { memo } from 'react';
import { useSpeech } from '@site/src/hooks/observer';
import styles from './styles.module.css';

export default memo(function SpeechAdmonition() {
  const [ready] = useSpeech();
  return ready === false && (
    <aside aria-hidden="true" className={clsx(styles.admonition, 'row')}>
      <div className="col">
        <Admonition type={admonitions.speech.type}>
          <p>{admonitions.speech.text}</p>
        </Admonition>
      </div>
    </aside>
  );
});
