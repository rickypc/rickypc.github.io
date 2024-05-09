/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import Button from '@site/src/components/common/Button';
import { clsx, key } from '@site/src/data/common';
import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Item = memo(function Item({
  current,
  item,
  onClick,
  ...rest
}) {
  return (
    <dt>
      <span
        className={clsx('table-of-contents__link', current && `${styles.active} table-of-contents__link--active`)}
        onClick={() => onClick(item)}
        onKeyPress={() => onClick(item)}
        role="menuitem"
        tabIndex={0}
        {...rest}
      >
        {item}
      </span>
    </dt>
  );
});
Item.propTypes = {
  current: PropTypes.bool,
  item: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default memo(Object.assign(function Collapsible({
  active,
  items,
  onClick,
  ...rest
}) {
  const [expanded, setExpanded] = useState(false);

  const onItemClick = useCallback((value) => {
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
        <dl className="table-of-contents">
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
}, {
  propTypes: {
    active: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string.isRequired),
    onClick: PropTypes.func,
  },
}));
