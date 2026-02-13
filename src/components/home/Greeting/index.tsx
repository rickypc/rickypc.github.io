/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Heart from '@site/src/components/common/Heart';
import { identity } from '@site/src/data/home';
import { memo } from 'react';
import Playback from '@site/src/components/common/Playback';
import phrase from '#buddhism/practical-daily-practice/phrases/_ricky_huang';
import styles from './styles.module.css';

/**
 * Greeting module with audio playback.
 */
export default memo(function Greeting() {
  return (
    <div className={styles.greeting}>
      <span className={styles.identity}>{identity.children}</span>
      <div className={styles.pronunciation}>
        <span className={styles.ipa}>{identity.ipa}</span>
        <Playback {...phrase} />
        <Heart className={styles.reaction} id="home-landing" />
      </div>
    </div>
  );
});
