/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';

export const PageMetadata = mock(({ children, ...rest }) => (
  <div data-testid="metadata" {...rest}>
    {children}
  </div>
));

export const translateTagsPageTitle = mock(() => 'Tags');

export const usePluralForm = mock(() => ({
  selectMessage: mock((count: number, message: string) => {
    const actual = message.replace(/^translated:[^:]+:?/, '');
    const parts = actual.split('|');
    return count > 1 ? parts[1].replace('{count}', String(count)) : parts[0];
  }),
}));
