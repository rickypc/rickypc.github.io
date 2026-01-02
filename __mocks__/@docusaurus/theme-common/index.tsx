/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
