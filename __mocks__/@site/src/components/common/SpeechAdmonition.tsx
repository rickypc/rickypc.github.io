/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

/**
 * Minimal mock common/SpeechAdmonition component that renders children.
 * @param {PropsWithChildren} props
 *   The component props.
 * @returns {ReactElement}
 *   The common/SpeechAdmonition component.
 */
export default function SpeechAdmonition({
  children,
  ...rest
}: PropsWithChildren): ReactElement {
  return <div data-testid="speech-admonition" {...rest}>{children}</div>;
}
