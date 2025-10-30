/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapsible from '@site/src/components/common/Collapsible';

jest.unmock('@site/src/components/common/Collapsible');

describe('Collapsible', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  let onClick;

  const renderComponent = (active, extraProps = {}) => {
    onClick = jest.fn();
    render((
      <Collapsible
        active={active}
        items={items}
        onClick={onClick}
        {...extraProps}
      />
    ));
  };

  describe('rendering', () => {
    it('displays the active item label on the button', () => {
      renderComponent('Item 2');
      expect(screen.getByRole('button')).toHaveTextContent('Item 2');
    });

    it('applies active class to the corresponding menuitem', () => {
      renderComponent('Item 3');
      const span = screen.getByRole('menuitem', { name: 'Item 3' });
      expect(span).toHaveClass('table-of-contents__link--active');
    });
  });

  describe('interaction', () => {
    it('toggles expanded class on the root when button is clicked', () => {
      renderComponent('Item 1');
      const button = screen.getByTestId('button-btn');
      fireEvent.click(button);
      // eslint-disable-next-line testing-library/no-node-access
      expect(button.parentNode).toHaveClass('expanded');
    });

    it.each([
      ['clicking an item', (span) => fireEvent.click(span)],
      ['pressing Enter on an item', (span) => fireEvent.keyPress(span, {
        charCode: 13,
        code: 'Enter',
        key: 'Enter',
      })],
    ])('calls onClick when %s', (_desc, action) => {
      renderComponent('Item 1');
      const span = screen.getByRole('menuitem', { name: 'Item 2' });
      action(span);
      expect(onClick).toHaveBeenCalledWith('Item 2');
    });
  });

  describe('prop spreading', () => {
    it('spreads extra props to the button and each menuitem', () => {
      renderComponent('Item 1', { 'data-testid': 'collapsible' });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'collapsible');

      const spans = screen.getAllByRole('menuitem');
      spans.forEach((span) => expect(span).toHaveAttribute('data-testid', 'collapsible'));
    });
  });
});
