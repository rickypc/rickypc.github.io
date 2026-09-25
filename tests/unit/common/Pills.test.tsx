/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import Pills from '@site/src/components/common/Pills';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Pills', () => {
  let container: HTMLElement;
  let dtElements: NodeListOf<HTMLDListElement>;
  let onClick: Mocked<any>;
  const items = ['apple', 'banana', 'cherry'];
  const prefix = 'fruit';

  const renderComponent = (active: string) => {
    onClick = mock();
    ({ container } = render(
      <Pills active={active} items={items} onClick={onClick} prefix={prefix} />,
    ));
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

    test('calls onKeyDown with the clicked item', () => {
      fireEvent.keyDown(dtElements[0], { key: 'Enter' });
      expect(onClick).toHaveBeenCalledWith('apple');
    });

    test('calls onKeyDown without the clicked item', () => {
      fireEvent.keyDown(dtElements[0], { key: 'A' });
      expect(onClick).not.toHaveBeenCalledWith('apple');
    });
  });

  describe('active state', () => {
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    beforeEach(() => renderComponent('cherry'));

    test('applies active class and renders indicator on active item', () => {
      const [appleDt, /* ignore */ , cherryDt] = dtElements;
      expect(appleDt).not.toHaveClass('active');
      expect(cherryDt).toHaveClass('active');

      const indicator = screen.getByTestId('span');
      expect(indicator).toHaveClass('indicator');
      expect(indicator).toHaveAttribute('data-layoutid', `pill-indicator-${prefix}`);
      expect(indicator).toHaveTextContent('cherry');
    });
  });
});
