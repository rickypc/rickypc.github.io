/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapsible from '@site/src/components/common/Collapsible';

describe('Collapsible', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  let onClick;
  let utils;
  let container;

  const renderComponent = (active, extraProps = {}) => {
    onClick = jest.fn();
    utils = render((
      <Collapsible
        active={active}
        items={items}
        onClick={onClick}
        {...extraProps}
      />
    ));
    container = utils.container;
    return utils;
  };

  describe('rendering', () => {
    it('displays the active item label on the button', () => {
      const { getByRole } = renderComponent('Item 2');
      expect(getByRole('button')).toHaveTextContent('Item 2');
    });

    it('applies active class to the corresponding menuitem', () => {
      const { getByRole } = renderComponent('Item 3');
      const span = getByRole('menuitem', { name: 'Item 3' });
      expect(span).toHaveClass('table-of-contents__link--active');
    });
  });

  describe('interaction', () => {
    it('toggles expanded class on the root when button is clicked', () => {
      renderComponent('Item 1');
      const button = container.querySelector('button');
      fireEvent.click(button);
      expect(container.firstChild).toHaveClass('expanded');
    });

    it.each([
      ['clicking an item', (span) => fireEvent.click(span)],
      ['pressing Enter on an item', (span) => fireEvent.keyPress(span, {
        charCode: 13,
        code: 'Enter',
        key: 'Enter',
      })],
    ])('calls onClick when %s', (_desc, action) => {
      const { getByRole } = renderComponent('Item 1');
      const span = getByRole('menuitem', { name: 'Item 2' });
      action(span);
      expect(onClick).toHaveBeenCalledWith('Item 2');
    });
  });

  describe('prop spreading', () => {
    it('spreads extra props to the button and each menuitem', () => {
      const { getByRole, getAllByRole } = renderComponent('Item 1', {
        'data-testid': 'collapsible',
      });

      const button = getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'collapsible');

      const spans = getAllByRole('menuitem');
      spans.forEach((span) => expect(span).toHaveAttribute('data-testid', 'collapsible'));
    });
  });
});
