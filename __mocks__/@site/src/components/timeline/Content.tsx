/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type ReactElement } from 'react';

/**
 * Minimal mock timeline/Content component that renders children.
 * @returns {ReactElement}
 *   The timeline/Content component.
 */
export default function TimelineContent(props: {}): ReactElement {
  return <div data-testid="content" {...props}>timeline.content</div>;
}
