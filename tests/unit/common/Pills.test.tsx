/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pills from '@site/src/components/common/Pills';

jest.unmock('@site/src/components/common/Pills');

describe('Pills', () => {
  let container: HTMLElement;
  // eslint-disable-next-line no-undef
  let dtElements: NodeListOf<HTMLDListElement>;
  let onClick: jest.MockedFunction<any>;
  const items = ['apple', 'banana', 'cherry'];
  const prefix = 'fruit';

  const renderComponent = (active: string) => {
    onClick = jest.fn();
    ({ container } = render((
      <Pills
        active={active}
        items={items}
        onClick={onClick}
        prefix={prefix}
      />
    )));
    // eslint-disable-next-line testing-library/no-node-access
    dtElements = container.querySelectorAll<HTMLDListElement>('dt');
  };

  describe('default behavior', () => {
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    beforeEach(() => renderComponent('banana'));

    test('renders a <dl> with correct items', () => {
      // eslint-disable-next-line testing-library/no-node-access
      const dl = container.querySelector('dl');
      expect(dl?.tagName).toBe('DL');
      expect(dl).toHaveClass('pills');
      expect(dtElements).toHaveLength(items.length);

      items.forEach((item, idx) => {
        // eslint-disable-next-line security/detect-object-injection
        const dt = dtElements[idx];
        // eslint-disable-next-line testing-library/no-node-access
        const span = dt.querySelector('span:not([data-layoutid])');
        expect(span).toHaveTextContent(item);
      });
    });

    test('calls onClick with the clicked item', () => {
      fireEvent.click(dtElements[0]);
      expect(onClick).toHaveBeenCalledWith('apple');
    });
  });

  describe('active state', () => {
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    beforeEach(() => renderComponent('cherry'));

    test('applies active class and renders indicator on active item', () => {
      // eslint-disable-next-line no-unused-vars
      const [appleDt, bananaDt, cherryDt] = dtElements;
      expect(appleDt).not.toHaveClass('active');
      expect(cherryDt).toHaveClass('active');

      const indicator = screen.getByTestId('span');
      expect(indicator).toHaveClass('indicator');
      expect(indicator).toHaveAttribute('data-layoutid', `pill-indicator-${prefix}`);
      expect(indicator).toHaveTextContent('cherry');
    });
  });
});
