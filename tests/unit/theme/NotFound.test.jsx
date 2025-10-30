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
  it('calls translate with the correct id and message and passes result to PageMetadata', () => {
    render(<NotFound />);

    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith({
      id: 'theme.NotFound.title',
      message: 'Page Not Found',
    });

    const meta = screen.getByTestId('metadata');
    expect(meta).toBeInTheDocument();
    expect(meta).toHaveAttribute('title', 'translated:theme.NotFound.title:Page Not Found');
  });

  it('renders Layout and renders NotFoundContent inside it with navigation prop set to "true"', () => {
    render(<NotFound />);

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content.getAttribute('navigation')).toEqual('true');

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
