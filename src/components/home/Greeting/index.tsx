/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { greeting, ipa } from '@site/src/data/home';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import { memo } from 'react';
import Speech from '@site/src/components/common/Speech';
import styles from './styles.module.css';

/**
 * Greeting module voice configuration.
 *
 * Defines prioritized lists of voice synthesis options for greeting users,
 * grouped by gender presentation. Voices are selected based on availability
 * across platforms (Apple, Microsoft, Google) and are ordered by preference,
 * with lower entries serving as fallbacks.
 *
 * Male voices (priority order):
 * - 'Microsoft Guy Online (Natural) - English (United States)' — Azure Neural TTS.
 * - 'Microsoft David - English (United States)' — Windows built-in voice.
 * - 'Reed (English (US))' — Apple macOS voice.
 * - 'Eddy (English (US))' — Apple macOS voice (higher pitch, faster).
 * - 'Google español' — Spanish male voice from Google TTS.
 *
 * Female voices (priority order):
 * - 'Microsoft Aria Online (Natural) - English (United States)' — Azure Neural TTS.
 * - 'Microsoft Zira - English (United States)' — Windows built-in voice.
 * - 'Damayanti' — Apple macOS voice.
 * - 'Kanya' — Apple macOS voice.
 * - 'Google US English' — American female voice from Google TTS.
 */
export default memo(function Greeting() {
  return (
    <Heading as="h1" className={styles.greeting}>
      <span>{greeting}</span>
      <div className={styles.pronunciation}>
        <span className={styles.ipa}>{ipa}</span>
        <Speech
          lang="en-US"
          names={[
            'Microsoft Guy Online (Natural) - English (United States)',
            'Microsoft David - English (United States)',
            // Opera.
            'Reed (English (United States))',
            'Eddy (English (United States))',
            // Firefox.
            'Reed (English (US))',
            'Eddy (English (US))',
            // We skipped Reed and Eddy in Safari.
            'Microsoft Aria Online (Natural) - English (United States)',
            'Microsoft Zira - English (United States)',
            'Damayanti',
            'Kanya',
            'Google español',
            'Google US English',
          ]}
        >
          , ricky huang
        </Speech>
        <Heart className={styles.reaction} id="home-landing" />
      </div>
    </Heading>
  );
});
