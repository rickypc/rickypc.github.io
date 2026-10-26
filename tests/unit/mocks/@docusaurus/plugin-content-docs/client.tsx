/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import type { ReactNode } from 'react';

let docContent: unknown = {};

export const DocProvider = mock(
  ({ children, content }: { children?: ReactNode; content?: unknown }) => {
    docContent = content;
    return children as ReactNode;
  },
);

export const useDoc = mock(() => docContent);

export const useSidebarBreadcrumbs = mock();
