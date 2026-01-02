/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type ReactElement } from 'react';

type PillsProps = {
  active: boolean;
  'aria-hidden': string;
  items: string[],
  // eslint-disable-next-line no-unused-vars
  onClick: (_: string) => void;
  prefix: string;
  translate: string;
};

/**
 * Minimal mock common/Pills component that renders children.
 * @param {PillsProps} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Pills component.
 */
export default function Pills({
  active,
  'aria-hidden': ariaHidden,
  items,
  onClick,
  prefix,
  translate,
}: PillsProps): ReactElement {
  return (
    <div
      data-active={active}
      data-aria-hidden={!!ariaHidden}
      data-prefix={prefix}
      data-testid="pills"
      data-translate={translate}
    >
      {items.map((item) => (
        <button key={item} onClick={() => onClick(item)} type="button">
          {item}
        </button>
      ))}
    </div>
  );
}
