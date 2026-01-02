/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { type ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundContent from '@theme/NotFound/Content';
import { useWelcome } from '@site/src/hooks/observer';

type Props = {
  className?: string;
  navigation?: boolean;
};

// eslint-disable-next-line no-unused-vars
const NotFoundContentMock = NotFoundContent as (_: Props) => ReactElement;

jest.unmock('@theme/NotFound/Content');

describe('theme.NotFound.Content', () => {
  it('calls useWelcome with navigation default false', () => {
    const { container } = render(<NotFoundContentMock className="class" />);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    const main = screen.getByRole('main');
    expect(main).toHaveClass('class');
    expect(main).toHaveClass('container');
    expect(main).toHaveClass('margin-vert--xl');
    expect(
      screen.getByRole('heading', { name: /You have found a secret place./i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/this is only a 404 page/i),
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Take me back to home page/i });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('title', 'Back to home page');
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('when navigation prop true, useWelcome is called with navigation true and navigation is not forwarded', () => {
    const { container } = render(<NotFoundContentMock navigation />);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: true });

    const main = screen.getByRole('main');
    expect(main).toHaveClass('container');
    expect(main).toHaveClass('margin-vert--xl');
    expect(
      screen.getByRole('heading', { name: /You have found a secret place./i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/this is only a 404 page/i),
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Take me back to home page/i });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('title', 'Back to home page');
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
