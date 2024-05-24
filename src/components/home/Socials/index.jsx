/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { key } from '@site/src/data/common';
import Link from '@site/src/components/common/Link';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { socials } from '@site/src/data/home';
import styles from './styles.module.css';

const Social = memo(function Social({ href, Icon, title }) {
  // We can't use a11y here because it will create SEO problem.
  return (
    <li>
      <Link href={href} title={title} whileTap={{ scale: 0.85 }}>
        <Icon {...{ 'aria-label': title, role: 'img' }} />
      </Link>
    </li>
  );
});
Social.propTypes = {
  href: PropTypes.string,
  Icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(function Socials() {
  return (
    <ul className={styles.social}>
      {socials.map((social) => (
        <Social key={key(social.title, 'social')} {...social} />
      ))}
    </ul>
  );
});
