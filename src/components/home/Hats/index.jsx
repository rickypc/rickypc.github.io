/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { hats } from '@site/src/data/home';
import Heading from '@theme/Heading';
import { key } from '@site/src/data/common';
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Hat = memo(function Hat({ children, description, label }) {
  return (
    <article className={styles.hat}>
      <Heading as="h2">
        <span className={styles.reader}>
          {label}
          &nbsp;
        </span>
        {children}
      </Heading>
      <p>{description}</p>
    </article>
  );
});
Hat.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default memo(function Hats() {
  return (
    <div className={styles.hats}>
      {hats.map((hat) => (
        <Hat {...hat} key={key(hat.label, 'hat')} />
      ))}
    </div>
  );
});
