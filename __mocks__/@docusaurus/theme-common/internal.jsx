/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

// eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
export const CodeBlockContextProvider = ({ children }) => (
  <div data-testid="codeblock-context">{children}</div>
);

export const createCodeBlockMetadata = jest.fn((meta) => ({
  code: meta.code,
  title: meta.title,
}));

export const useCodeWordWrap = () => ({ codeBlockRef: { current: null } });
