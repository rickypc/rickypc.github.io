/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type SpeechProps = {
  names: string[];
};

/**
 * Minimal mock common/Speech component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/Speech component.
 */
export default function Speech({
  children,
  names,
  ...rest
}: PropsWithChildren<SpeechProps>): ReactElement {
  return <div data-names={names?.join('|')} data-testid="speech" {...rest}>{children}</div>;
}
