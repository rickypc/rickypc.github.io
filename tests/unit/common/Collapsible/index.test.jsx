/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapsible from '../../../../src/components/common/Collapsible';

describe('Collapsible', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const onClick = jest.fn();

  it('renders active item as button label', () => {
    const { getByRole } = render((
      <Collapsible active="Item 2" items={items} onClick={onClick} />
    ));
    expect(getByRole('button')).toHaveTextContent('Item 2');
  });

  it('toggles expanded class on button click', () => {
    const { getByRole, container } = render((
      <Collapsible active="Item 1" items={items} onClick={onClick} />
    ));
    const button = getByRole('button');
    fireEvent.click(button);
    expect(container.firstChild).toHaveClass('expanded');
  });

  it('calls onClick when item is clicked', () => {
    const { getByRole } = render((
      <Collapsible active="Item 1" items={items} onClick={onClick} />
    ));
    const span = getByRole('menuitem', { name: 'Item 2' });
    fireEvent.click(span);
    expect(onClick).toHaveBeenCalledWith('Item 2');
  });

  it('calls onClick when item is activated via key press', () => {
    const { getByRole } = render((
      <Collapsible active="Item 1" items={items} onClick={onClick} />
    ));
    const span = getByRole('menuitem', { name: 'Item 2' });
    fireEvent.keyPress(span, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onClick).toHaveBeenCalledWith('Item 2');
  });

  it('applies active class to both button and span', () => {
    const { getByRole } = render((
      <Collapsible active="Item 3" items={items} onClick={onClick} />
    ));

    // Button should display the active label
    const button = getByRole('button');
    expect(button).toHaveTextContent('Item 3');

    // The span with role="menuitem" for Item 3 should have the active TOC class
    const activeSpan = getByRole('menuitem', { name: 'Item 3' });
    expect(activeSpan).toHaveClass('table-of-contents__link--active');
  });

  it('spreads extra props to button and items', () => {
    const { getByRole } = render((
      <Collapsible
        active="Item 1"
        items={items}
        onClick={onClick}
        data-testid="collapsible"
      />
    ));
    expect(getByRole('button')).toHaveAttribute('data-testid', 'collapsible');

    const span = getByRole('menuitem', { name: 'Item 2' });
    expect(span).toHaveAttribute('data-testid', 'collapsible');
  });
});
