/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Figure from '@site/src/components/about/Figure';

jest.mock('framer-motion', () => ({
  domAnimation: {},
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  m: {
    figure: ({
      children,
      className,
      whileInView,
      ...props
    }) => (
      <figure className={className} {...props}>
        {children}
      </figure>
    ),
  },
}));

jest.mock(
  '@site/src/components/about/Figure/styles.module.css',
  () => ({
    figure: 'figure-class',
    shape: 'shape-class',
  }),
);

jest.mock('@site/src/data/about', () => ({
  types: [
    {
      alt: 'First Alt',
      Image: (props) => {
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        const alt = props['aria-label'];
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        return <div aria-label={alt} data-testid={alt} role={props.role} />;
      },
    },
    {
      alt: 'Second Alt',
      Image: (props) => {
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        const alt = props['aria-label'];
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        return <span aria-label={alt} data-testid={alt} role={props.role} />;
      },
    },
  ],
}));

jest.mock('@site/src/data/common', () => ({
  key: (value, prefix) => `${prefix}-${value}`,
}));

describe('about.Figure', () => {
  it('renders a figure with shape container and img roles for each type', () => {
    const { container } = render(<Figure />);

    // The outer <figure> should have the CSS class
    const figure = container.querySelector('figure');
    expect(figure).toHaveClass('figure-class');

    // The inner shape <div> should have its CSS class
    const shape = figure.querySelector('div');
    expect(shape).toHaveClass('shape-class');

    // Each mock Image should render an element with role="img" and the correct aria-label
    const firstImg = screen.getByRole('img', { name: 'First Alt' });
    expect(firstImg).toBeInTheDocument();

    const secondImg = screen.getByRole('img', { name: 'Second Alt' });
    expect(secondImg).toBeInTheDocument();
  });
});
