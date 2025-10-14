/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '@site/src/components/portfolio/Filter';
import { useMedia } from '@site/src/hooks/observer';

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
    useMedia.mockReturnValue([true]);

    const { getAllByRole, getByTestId, getByText } = render(<Filter current="All" onClick={onClickMock} />);

    // Collapsible branch.
    const coll = getByTestId('collapsible');
    expect(coll).toHaveAttribute('data-active', 'All');
    expect(coll).toHaveAttribute('data-translate', 'no');

    // Items in sorted order, with unique tags.
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(expectedTags.length);
    // eslint-disable-next-line security/detect-object-injection
    buttons.forEach((btn, i) => expect(btn).toHaveTextContent(expectedTags[i]));

    // Clicking a tag invokes onClick with that tag.
    fireEvent.click(getByText('beta'));
    expect(onClickMock).toHaveBeenCalledWith('beta');
  });

  it('renders Pills with correct props when viewport is wide', () => {
    const onClickMock = jest.fn();
    useMedia.mockReturnValue([false]);

    const { getByTestId, getByText } = render(<Filter current="alpha" onClick={onClickMock} />);

    // Pills branch.
    const pills = getByTestId('pills');
    expect(pills).toHaveAttribute('data-active', 'alpha');
    expect(pills).toHaveAttribute('data-prefix', 'portfolio');
    expect(pills).toHaveAttribute('data-translate', 'no');
    expect(pills).toHaveAttribute('data-aria-hidden', 'true');

    // Items rendered in same sorted order.
    const buttons = within(pills).getAllByRole('button');
    expect(buttons).toHaveLength(expectedTags.length);
    expectedTags.forEach((tag) => expect(getByText(tag)).toBeInTheDocument());

    // Clicking the 'gamma' pill invokes onClick.
    fireEvent.click(getByText('gamma'));
    expect(onClickMock).toHaveBeenCalledWith('gamma');
  });
});
