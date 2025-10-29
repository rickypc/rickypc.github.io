/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { type PropsWithChildren, type ReactElement } from 'react';

type MetadataProps = {
  code: string;
  title: string;
};

export const CodeBlockContextProvider = function Provider({
  children,
}: PropsWithChildren<{}>): ReactElement {
  return <div data-testid="codeblock-context">{children}</div>;
};

export const createCodeBlockMetadata = jest.fn((meta: MetadataProps) => ({
  code: meta.code,
  title: meta.title,
}));

export const useCodeWordWrap = () => ({ codeBlockRef: { current: null } });
