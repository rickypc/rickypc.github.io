/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pills from '@site/src/components/common/Pills';

jest.unmock('@site/src/components/common/Pills');

describe('Pills', () => {
  const items = ['apple', 'banana', 'cherry'];
  const prefix = 'fruit';
  let handleClick;
  let container;
  let getByTestId;
  let dtElements;

  const renderComponent = (active) => {
    handleClick = jest.fn();
    const utils = render((
      <Pills
        active={active}
        items={items}
        onClick={handleClick}
        prefix={prefix}
      />
    ));
    container = utils.container;
    getByTestId = utils.getByTestId;
    dtElements = container.querySelectorAll('dt');
  };

  describe('default behavior', () => {
    beforeEach(() => renderComponent('banana'));

    it('renders a <dl> with correct items', () => {
      const dl = container.querySelector('dl');
      expect(dl.tagName).toEqual('DL');
      expect(dl).toHaveClass('pills');
      expect(dtElements).toHaveLength(items.length);

      items.forEach((item, idx) => {
        // eslint-disable-next-line security/detect-object-injection
        const dt = dtElements[idx];
        const span = dt.querySelector('span:not([data-layoutid])');
        expect(span).toHaveTextContent(item);
      });
    });

    it('calls onClick with the clicked item', () => {
      fireEvent.click(dtElements[0]);
      expect(handleClick).toHaveBeenCalledWith('apple');
    });
  });

  describe('active state', () => {
    beforeEach(() => renderComponent('cherry'));

    it('applies active class and renders indicator on active item', () => {
      // eslint-disable-next-line no-unused-vars
      const [appleDt, bananaDt, cherryDt] = dtElements;
      expect(appleDt).not.toHaveClass('active');
      expect(cherryDt).toHaveClass('active');

      const indicator = getByTestId('span');
      expect(indicator).toHaveClass('indicator');
      expect(indicator).toHaveAttribute('data-layoutid', `pill-indicator-${prefix}`);
      expect(indicator).toHaveTextContent('cherry');
    });
  });
});
