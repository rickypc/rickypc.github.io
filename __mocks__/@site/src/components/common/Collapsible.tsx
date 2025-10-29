/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type ReactElement } from 'react';

type CollapsibleProps = {
  active: boolean;
  items: string[],
  // eslint-disable-next-line no-unused-vars
  onClick: (_: string) => void;
  translate: string;
};

/**
 * Minimal mock common/Collapsible component that renders children.
 * @param {CollapsibleProps} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Collapsible component.
 */
export default function Collapsible({
  active,
  items,
  onClick,
  translate,
}: CollapsibleProps): ReactElement {
  return (
    <div data-active={active} data-testid="collapsible" data-translate={translate}>
      {items.map((item) => (
        <button key={item} onClick={() => onClick(item)} type="button">
          {item}
        </button>
      ))}
    </div>
  );
}
