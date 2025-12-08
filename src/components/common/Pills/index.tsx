/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { clsx, key } from '@site/src/data/common';
import {
  AnimatePresence,
  domMax,
  LayoutGroup,
  LazyMotion,
  motion,
} from 'motion/react';
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
    <motion.dt
      className={clsx(current && styles.active, styles.item)}
      onClick={() => onClick(item)}
      whileTap={{ scale: 0.85 }}
      {...rest}
    >
      <span {...rest}>{item}</span>
      {current && (
        <motion.span
          className={styles.indicator}
          layoutId={`pill-indicator-${prefix}`}
          {...rest}
        >
          {item}
        </motion.span>
      )}
    </motion.dt>
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
    <LazyMotion features={domMax}>
      <LayoutGroup>
        <dl className={styles.pills} {...rest}>
          <AnimatePresence>
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
          </AnimatePresence>
        </dl>
      </LayoutGroup>
    </LazyMotion>
  );
});
