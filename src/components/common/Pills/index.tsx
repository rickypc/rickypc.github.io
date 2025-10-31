/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, key } from '@site/src/data/common';
import { domMax, LazyMotion, m } from 'framer-motion';
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

type ItemProps = {
  active?: string;
  item: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (_: string) => void;
  prefix: string;
};

export type PillsProps = {
  active?: string;
  items: string[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: string) => void;
  prefix: string;
  translate?: 'no' | 'yes';
};

const Item = memo(function Item({
  active,
  item,
  onClick,
  prefix,
  ...rest
}: ItemProps): ReactElement {
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
        {current && (
          <m.span
            className={styles.indicator}
            layoutId={`pill-indicator-${prefix}`}
            {...rest}
          >
            {item}
          </m.span>
        )}
      </m.dt>
    </LazyMotion>
  );
});

export default memo(function Pills({
  active,
  items,
  onClick,
  prefix,
  ...rest
}: PillsProps): ReactElement {
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
});
