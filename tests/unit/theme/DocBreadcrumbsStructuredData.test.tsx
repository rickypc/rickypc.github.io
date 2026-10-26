/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { render } from '@testing-library/react';
import DocBreadcrumbsStructuredDataWrapper from '@theme/DocBreadcrumbs/StructuredData';

describe('theme.DocBreadcrumbsStructuredData', () => {
  test('renders nothing; the unified @graph carries the BreadcrumbList node', () => {
    const { container } = render(<DocBreadcrumbsStructuredDataWrapper breadcrumbs={[]} />);
    expect(container.innerHTML).toBe('');
  });
});
