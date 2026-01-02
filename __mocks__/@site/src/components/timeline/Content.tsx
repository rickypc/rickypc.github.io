/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
