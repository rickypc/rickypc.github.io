/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { type ReactElement } from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundContent from '@theme/NotFound/Content';
import { useWelcome } from '@site/src/hooks/observer';

type Props = {
  className?: string;
  navigation?: boolean;
};

const NotFoundContentMock = NotFoundContent as (_: Props) => ReactElement;

jest.unmock('@theme/NotFound/Content');

describe('theme.NotFound.Content', () => {
  test('calls useWelcome with navigation default false', () => {
    render(<NotFoundContentMock className="class" />);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    const main = screen.getByRole('main');
    const withinMain = within(main);
    expect(main).toHaveClass('class');
    expect(main).toHaveClass('container');
    expect(main).toHaveClass('margin-vert--xl');
    expect(
      withinMain.getByRole('heading', { name: /You have found a secret place./i }),
    ).toBeInTheDocument();
    expect(
      withinMain.getByText(/this is only a 404 page/i),
    ).toBeInTheDocument();
    const link = withinMain.getByRole('link', { name: /Take me back to home page/i });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('title', 'Back to home page');
    // eslint-disable-next-line testing-library/no-node-access
    const svg = main.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('when navigation prop true, useWelcome is called with navigation true and navigation is not forwarded', () => {
    render(<NotFoundContentMock navigation />);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: true });

    const main = screen.getByRole('main');
    const withinMain = within(main);
    expect(main).toHaveClass('container');
    expect(main).toHaveClass('margin-vert--xl');
    expect(
      withinMain.getByRole('heading', { name: /You have found a secret place./i }),
    ).toBeInTheDocument();
    expect(
      withinMain.getByText(/this is only a 404 page/i),
    ).toBeInTheDocument();
    const link = withinMain.getByRole('link', { name: /Take me back to home page/i });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('title', 'Back to home page');
    // eslint-disable-next-line testing-library/no-node-access
    const svg = main.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
