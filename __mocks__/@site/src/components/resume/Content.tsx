/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { type ReactElement } from 'react';

/**
 * Minimal mock resume/Content component that renders children.
 * @returns {ReactElement}
 *   The resume/Content component.
 */
export default function ResumeContent(props: {}): ReactElement {
  return <div data-testid="content" {...props}>resume.content</div>;
}
