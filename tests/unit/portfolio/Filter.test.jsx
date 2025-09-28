/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
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

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Collapsible', () => ({
  // eslint-disable-next-line react/prop-types
  active,
  // eslint-disable-next-line react/prop-types
  items,
  // eslint-disable-next-line react/prop-types
  onClick,
  // eslint-disable-next-line react/prop-types
  translate,
}) => (
  <div
    data-active={active}
    data-testid="collapsible"
    data-translate={translate}
  >
    {
      // eslint-disable-next-line react/prop-types
      items.map((item) => (
        // eslint-disable-next-line react/button-has-type
        <button
          key={item}
          onClick={() => onClick(item)}
        >
          {item}
        </button>
      ))
    }
  </div>
));

// eslint-disable-next-line react/display-name,react/function-component-definition
jest.mock('@site/src/components/common/Pills', () => ({
  // eslint-disable-next-line react/prop-types
  active,
  // eslint-disable-next-line react/prop-types
  'aria-hidden': ariaHidden,
  // eslint-disable-next-line react/prop-types
  items,
  // eslint-disable-next-line react/prop-types
  onClick,
  // eslint-disable-next-line react/prop-types
  prefix,
  // eslint-disable-next-line react/prop-types
  translate,
}) => (
  <div
    data-active={active}
    data-aria-hidden={ariaHidden ?? false}
    data-prefix={prefix}
    data-testid="pills"
    data-translate={translate}
  >
    {
      // eslint-disable-next-line react/prop-types
      items.map((item) => (
        // eslint-disable-next-line react/button-has-type
        <button
          key={item}
          onClick={() => onClick(item)}
        >
          {item}
        </button>
      ))
    }
  </div>
));

jest.mock('@site/src/data/portfolio', () => ({
  catalog: [
    { tags: ['beta', 'alpha'] },
    { tags: ['gamma', 'alpha'] },
  ],
}));

jest.mock('@site/src/hooks/observer', () => ({
  useMedia: jest.fn(),
}));

describe('portfolio.Filter', () => {
  const expectedTags = ['All', 'alpha', 'beta', 'gamma'];

  it('renders Collapsible with correct tags when viewport is narrow', () => {
    const onClickMock = jest.fn();
    useMedia.mockReturnValue([true]);

    render(<Filter current="All" onClick={onClickMock} />);

    // Collapsible branch
    const coll = screen.getByTestId('collapsible');
    expect(coll).toHaveAttribute('data-active', 'All');
    expect(coll).toHaveAttribute('data-translate', 'no');

    // Items in sorted order, with unique tags
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(expectedTags.length);
    // eslint-disable-next-line security/detect-object-injection
    buttons.forEach((btn, i) => expect(btn).toHaveTextContent(expectedTags[i]));

    // Clicking a tag invokes onClick with that tag
    fireEvent.click(screen.getByText('beta'));
    expect(onClickMock).toHaveBeenCalledWith('beta');
  });

  it('renders Pills with correct props when viewport is wide', () => {
    const onClickMock = jest.fn();
    useMedia.mockReturnValue([false]);

    render(<Filter current="alpha" onClick={onClickMock} />);

    // Pills branch
    const pills = screen.getByTestId('pills');
    expect(pills).toHaveAttribute('data-active', 'alpha');
    expect(pills).toHaveAttribute('data-prefix', 'portfolio');
    expect(pills).toHaveAttribute('data-translate', 'no');
    expect(pills).toHaveAttribute('data-aria-hidden', 'true');

    // Items rendered in same sorted order
    const buttons = within(pills).getAllByRole('button');
    expect(buttons).toHaveLength(expectedTags.length);
    expectedTags.forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument());

    // Clicking the 'gamma' pill invokes onClick
    fireEvent.click(screen.getByText('gamma'));
    expect(onClickMock).toHaveBeenCalledWith('gamma');
  });
});
