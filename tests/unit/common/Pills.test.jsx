/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pills from '@site/src/components/common/Pills';

jest.mock('framer-motion', () => ({
  __esModule: true,
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{children}</>,
  domMax: {},
  m: {
    dt: ({
      children,
      className,
      onClick,
      whileTap,
      ...rest
    }) => (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-noninteractive-element-interactions */
      <dt className={className} onClick={onClick} {...rest}>
        {children}
      </dt>
    ),
    span: ({
      children,
      className,
      layoutId,
      ...rest
    }) => (
      <span
        data-testid={`indicator-${children}`}
        className={className}
        data-layoutid={layoutId}
        {...rest}
      >
        {children}
      </span>
    ),
  },
}));

jest.mock(
  '@site/src/components/common/Pills/styles.module.css',
  () => ({
    active: 'active-class',
    indicator: 'indicator-class',
    item: 'item-class',
    pills: 'pills-class',
  }),
);

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  clsx: (...args) => args.filter(Boolean).join(' '),
  key: (a, b) => `${a}-${b}`,
}));

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
      expect(dl.tagName).toBe('DL');
      expect(dl).toHaveClass('pills-class');
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
      expect(appleDt).not.toHaveClass('active-class');
      expect(cherryDt).toHaveClass('active-class');

      const indicator = getByTestId('indicator-cherry');
      expect(indicator).toHaveClass('indicator-class');
      expect(indicator).toHaveAttribute('data-layoutid', `pill-indicator-${prefix}`);
      expect(indicator).toHaveTextContent('cherry');
    });
  });
});
