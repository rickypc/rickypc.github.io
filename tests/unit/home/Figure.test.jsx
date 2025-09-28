/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Figure from '@site/src/components/home/Figure';

jest.mock('framer-motion', () => ({
  domAnimation: {},
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  m: {
    figure: ({ children, whileInView, ...props }) => <figure {...props}>{children}</figure>,
  },
}));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Image', () => (props) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img data-testid="home-image" {...props} />
));

jest.mock(
  '@site/src/components/home/Figure/styles.module.css',
  () => ({ figure: 'figure-class' }),
);

jest.mock('@site/src/data/common', () => ({
  a11y: (alt) => ({ role: 'img', 'aria-label': alt }),
}));

jest.mock('@site/src/data/home', () => ({
  image: { src: 'test-src.png', alt: 'Test Alt' },
}));

describe('home.Figure', () => {
  it('renders a <figure> with correct accessibility attributes, CSS class, and nested Image', () => {
    const { container } = render(<Figure />);

    // Target the outer <figure> element directly
    const fig = container.querySelector('figure');
    expect(fig).toHaveClass('figure-class');
    expect(fig).toHaveAttribute('role', 'img');
    expect(fig).toHaveAttribute('aria-label', 'Test Alt');

    // Inner Image should render with correct src and alt
    const img = screen.getByTestId('home-image');
    expect(img).toHaveAttribute('src', 'test-src.png');
    expect(img).toHaveAttribute('alt', 'Test Alt');
  });
});
