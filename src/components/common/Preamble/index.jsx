/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx } from '@site/src/data/common';
import Heading from '@theme/Heading';
import { memo } from 'react';
import PrintAdmonition from '@site/src/components/common/PrintAdmonition';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default memo(Object.assign(function Preamble({ description, printAdmonition, title }) {
  return (
    <>
      {printAdmonition && <PrintAdmonition />}
      <header className="row">
        <div className={clsx('col', 'col--8', 'col--offset-2', styles.preamble)}>
          <Heading as="h1">{title}</Heading>
          <p>{description}</p>
        </div>
      </header>
    </>
  );
}, {
  propTypes: {
    description: PropTypes.string.isRequired,
    printAdmonition: PropTypes.bool,
    title: PropTypes.string.isRequired,
  },
}));
