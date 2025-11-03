/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const PageMetadata = jest.fn(({
  children,
  ...rest
}) => <div data-testid="metadata" {...rest}>{children}</div>);

export const translateTagsPageTitle = jest.fn(() => 'Tags');

export const usePluralForm = jest.fn(() => ({
  selectMessage: jest.fn((count: number, message: string) => {
    const actual = message.replace(/^translated:[^:]+:?/, '');
    const parts = actual.split('|');
    return count > 1 ? parts[1].replace('{count}', String(count)) : parts[0];
  }),
}));
