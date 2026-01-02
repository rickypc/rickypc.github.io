/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type ReactElement } from 'react';

/**
 * Minimal mock stories/Content component that renders children.
 * @returns {ReactElement}
 *   The stories/Content component.
 */
export default function StoriesContent(props: {}): ReactElement {
  return <div data-testid="content" {...props}>stories.content</div>;
}
