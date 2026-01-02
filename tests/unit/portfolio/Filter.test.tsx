/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '@site/src/components/portfolio/Filter';
import { useMedia } from '@site/src/hooks/observer';

const useMediaMock = jest.mocked(useMedia);

jest.unmock('@site/src/components/portfolio/Filter');

jest.mock('@site/src/data/portfolio', () => ({
  catalog: [
    { tags: ['beta', 'alpha'] },
    { tags: ['gamma', 'alpha'] },
  ],
}));

describe('portfolio.Filter', () => {
  const expectedTags = ['All', 'alpha', 'beta', 'gamma'];

  it('renders Collapsible with correct tags when viewport is narrow', () => {
    const onClickMock = jest.fn();
    useMediaMock.mockReturnValue([true]);

    render(<Filter current="All" onClick={onClickMock} />);

    // Collapsible branch.
    const coll = screen.getByTestId('collapsible');
    expect(coll).toHaveAttribute('data-active', 'All');
    expect(coll).toHaveAttribute('data-translate', 'no');

    // Items in sorted order, with unique tags.
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(expectedTags.length);
    // eslint-disable-next-line security/detect-object-injection
    buttons.forEach((btn, i) => expect(btn).toHaveTextContent(expectedTags[i]));

    // Clicking a tag invokes onClick with that tag.
    fireEvent.click(screen.getByText('beta'));
    expect(onClickMock).toHaveBeenCalledWith('beta');
  });

  it('renders Pills with correct props when viewport is wide', () => {
    const onClickMock = jest.fn();
    useMediaMock.mockReturnValue([false]);

    render(<Filter current="alpha" onClick={onClickMock} />);

    // Pills branch.
    const pills = screen.getByTestId('pills');
    expect(pills).toHaveAttribute('data-active', 'alpha');
    expect(pills).toHaveAttribute('data-prefix', 'portfolio');
    expect(pills).toHaveAttribute('data-translate', 'no');
    expect(pills).toHaveAttribute('data-aria-hidden', 'false');

    // Items rendered in same sorted order.
    const buttons = within(pills).getAllByRole('button');
    expect(buttons).toHaveLength(expectedTags.length);
    expectedTags.forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument());

    // Clicking the 'gamma' pill invokes onClick.
    fireEvent.click(screen.getByText('gamma'));
    expect(onClickMock).toHaveBeenCalledWith('gamma');
  });
});
