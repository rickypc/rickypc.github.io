/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Button from '@site/src/components/common/Button';
import { clsx, key } from '@site/src/data/common';
import {
  memo,
  type ReactElement,
  useCallback,
  useState,
} from 'react';
import styles from './styles.module.css';

export type CollapsibleProps = {
  active?: string;
  items: string[];
  // eslint-disable-next-line no-unused-vars
  onClick: (_: string) => void;
  translate?: 'no' | 'yes';
};

type ItemProps = {
  current?: boolean;
  item: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (_: string) => void;
};

const Item = memo(function Item({
  current,
  item,
  onClick,
  ...rest
}: ItemProps): ReactElement {
  return (
    <dt>
      <span
        className={clsx('table-of-contents__link', current && `${styles.active} table-of-contents__link--active`)}
        onClick={() => onClick(item)}
        onKeyDown={() => onClick(item)}
        role="menuitem"
        tabIndex={0}
        {...rest}
      >
        {item}
      </span>
    </dt>
  );
});

export default memo(function Collapsible({
  active,
  items,
  onClick,
  ...rest
}: CollapsibleProps): ReactElement {
  const [expanded, setExpanded] = useState(false);

  const onItemClick = useCallback((value: string) => {
    setExpanded(false);
    onClick(value);
  }, [onClick]);

  return (
    <div className={clsx(styles.collapsible, expanded && styles.expanded)}>
      <Button
        onClick={() => setExpanded((previous) => !previous)}
        {...rest}
      >
        {active}
      </Button>
      <div className={styles.items}>
        <dl className="table-of-contents" {...rest}>
          {items.map((item) => (
            <Item
              current={active === item}
              key={key(item, 'collapsible')}
              item={item}
              onClick={onItemClick}
              {...rest}
            />
          ))}
        </dl>
      </div>
    </div>
  );
});
