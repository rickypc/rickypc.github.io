/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { memo, type ReactElement } from 'react';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { type SocialProps, socials } from '@site/src/data/home';
import styles from './styles.module.css';

const Social = memo(function Social({ href, Icon, title }: SocialProps): ReactElement {
  // We can't use a11y here because it will create SEO problem.
  return (
    <li>
      <Link href={href} title={title} whileTap={{ scale: 0.85 }}>
        <Icon {...{ 'aria-label': title, role: 'img' }} />
      </Link>
    </li>
  );
});

export default memo(function Socials() {
  return (
    <ul className={styles.social}>
      {socials.map((social: SocialProps) => (
        <Social key={key(social.title, 'social')} {...social} />
      ))}
    </ul>
  );
});
