/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default ({ active, 'aria-hidden': ariaHidden, items, onClick, prefix, translate }) => (
  <div
    data-active={active}
    data-aria-hidden={!!ariaHidden}
    data-prefix={prefix}
    data-testid="pills"
    data-translate={translate}
  >
    {items.map((item) => (
      <button key={item} onClick={() => onClick(item)}>
        {item}
      </button>
    ))}
  </div>
);
