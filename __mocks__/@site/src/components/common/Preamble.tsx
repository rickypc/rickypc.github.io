/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PreambleProps } from '@site/src/components/common/Preamble';
import { type PropsWithChildren, type ReactElement } from 'react';
import { textContent } from '@site/src/data/common';

/**
 * Minimal mock common/Intro component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Intro component.
 */
export function Intro({ children, ...rest }: PropsWithChildren): ReactElement {
  return (
    <div data-testid="intro" {...rest}>
      {children}
    </div>
  );
}

/**
 * Minimal mock common/Preamble component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Preamble component.
 */
export default function Preamble({
  children,
  intro,
  ...rest
}: PropsWithChildren<PreambleProps>): ReactElement {
  return (
    <div
      data-intro={JSON.stringify({
        description: textContent(intro.description),
        title: textContent(intro.title),
      })}
      data-testid="preamble"
      {...rest}
    >
      {intro.before}
      {children}
      {intro.after}
    </div>
  );
}
