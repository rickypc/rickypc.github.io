/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { greeting } from '@site/src/data/home';
import Heading from '@theme/Heading';
import Heart from '@site/src/components/common/Heart';
import { memo } from 'react';
import styles from './styles.module.css';

export default memo(function Greeting() {
  return (
    <Heading as="h1" className={styles.greeting}>
      <span>{greeting}</span>
      <Heart className={styles.reaction} id="home-landing" />
    </Heading>
  );
});
