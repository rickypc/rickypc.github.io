/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type ComponentType, memo, type ReactElement } from 'react';
import { type IconBaseProps } from 'react-icons';
import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { socials } from '@site/src/data/home';
import styles from './styles.module.css';

export type SocialProps = {
  href?: string;
  Icon: ComponentType<IconBaseProps & { className?: string }>;
  title: string;
};

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
