/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Heart from '@site/src/components/common/Heart';
import Playback from '@site/src/components/common/Playback';
import { identity } from '@site/src/data/home';
import { memo, type ReactElement } from 'react';
import phrase from '#buddhism/practice-daily-life/phrases/_ricky_huang';
import styles from './styles.module.css';

/**
 * Identity line at the head of the home page: the name as written, its IPA pronunciation, the
 * pronunciation playback beside it, and the reaction heart for the landing page. The clip and its
 * metadata come from the phrase module.
 * @returns {ReactElement} The greeting block holding the name, pronunciation, and reaction row.
 */
export default memo(function Greeting(): ReactElement {
  return (
    <div className={styles.greeting}>
      <span className={styles.identity}>{identity.children}</span>
      <div className={styles.pronunciation}>
        <span className={styles.ipa}>{identity.ipa}</span>
        <Playback {...phrase} />
        {/* biome-ignore lint/correctness/useUniqueElementIds: - */}
        <Heart className={styles.reaction} id="home-landing" />
      </div>
    </div>
  );
});
