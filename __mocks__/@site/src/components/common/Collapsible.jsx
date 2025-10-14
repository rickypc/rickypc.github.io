/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export default ({ active, items, onClick, translate }) => (
  <div data-active={active} data-testid="collapsible" data-translate={translate}>
    {items.map((item) => (
      <button key={item} onClick={() => onClick(item)}>
        {item}
      </button>
    ))}
  </div>
);
