/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '@theme/Layout';
import NotFound from '@theme/NotFound';
import NotFoundContent from '@theme/NotFound/Content';
import { translate } from '@docusaurus/Translate';

describe('theme.NotFound', () => {
  it('calls translate, passes result to Layout, and renders content', () => {
    render(<NotFound />);

    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith({
      id: 'theme.NotFound.title',
      message: 'Page Not Found',
    });

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
    expect(layout).toHaveAttribute('data-description', expect.stringContaining('Page not found'));
    expect(layout).toHaveAttribute('data-keywords', expect.stringContaining('404'));
    expect(layout).toHaveAttribute('data-title', 'translated:theme.NotFound.title:Page Not Found');

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content.getAttribute('navigation')).toBe('true');

    expect(layout).toContainElement(content);
  });

  it('is stable across multiple renders (memo prevents duplicate renders)', () => {
    const { rerender } = render(<NotFound />);

    expect(translate).toHaveBeenCalledTimes(1);
    expect(Layout).toHaveBeenCalledTimes(1);
    expect(NotFoundContent).toHaveBeenCalledTimes(1);

    // Rerendering the same element does not re-run memoized component.
    rerender(<NotFound />);

    expect(translate).toHaveBeenCalledTimes(1);
    expect(Layout).toHaveBeenCalledTimes(1);
    expect(NotFoundContent).toHaveBeenCalledTimes(1);
  });
});
