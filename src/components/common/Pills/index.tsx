/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { clsx, key } from '@site/src/data/common';
import { AnimatePresence, domMax, LayoutGroup, LazyMotion, motion } from 'motion/react';
import { memo, type ReactElement } from 'react';
import styles from './styles.module.css';

type ItemProps = {
  active?: string;
  item: string;
  onClick: (_: string) => void;
  prefix: string;
};

export type PillsProps = {
  active?: string;
  items: string[];
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
      onKeyDown={(evt) => {
        if ([' ', 'Enter'].includes(evt.key)) {
          evt.preventDefault();
          onClick(item);
        }
      }}
      role="button"
      whileTap={{ scale: 0.85 }}
      {...rest}
    >
      <span {...rest}>{item}</span>
      {current && (
        <motion.span className={styles.indicator} layoutId={`pill-indicator-${prefix}`} {...rest}>
          {item}
        </motion.span>
      )}
    </motion.dt>
  );
});

/**
 * Tag filter pills on the portfolio page: one clickable, keyboard-operable pill per tag, the
 * selected one covered by a gradient highlight that slides across the row. LazyMotion and a shared
 * layout id animate that highlight as the selection changes.
 * @param {PillsProps} props - The tag labels, the selected label, the click handler, the shared
 *   layout id prefix, and an optional translation flag.
 * @returns {ReactElement} The definition list of pills.
 */
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
