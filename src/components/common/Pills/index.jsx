/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, key } from '@site/src/data/common';
import { domMax, LazyMotion, m } from 'framer-motion';
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Item = memo(function Item({
  active,
  item,
  onClick,
  prefix,
  ...rest
}) {
  const current = active === item;
  return (
    <LazyMotion features={domMax}>
      <m.dt
        className={clsx(current && styles.active, styles.item)}
        onClick={() => onClick(item)}
        whileTap={{ scale: 0.85 }}
        {...rest}
      >
        <span {...rest}>{item}</span>
        {current ? (
          <m.span
            className={styles.indicator}
            layoutId={`pill-indicator-${prefix}`}
            {...rest}
          >
            {item}
          </m.span>
        ) : null}
      </m.dt>
    </LazyMotion>
  );
});
Item.propTypes = {
  active: PropTypes.string,
  item: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default memo(Object.assign(function Pills({
  active,
  items,
  onClick,
  prefix,
  ...rest
}) {
  return (
    <dl className={styles.pills} {...rest}>
      {items.map((item) => (
        <Item
          active={active}
          item={item}
          key={key(item, `pill-${prefix}`)}
          onClick={onClick}
          prefix={prefix}
          {...rest}
        />
      ))}
    </dl>
  );
}, {
  propTypes: {
    active: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
    prefix: PropTypes.string.isRequired,
  },
}));
