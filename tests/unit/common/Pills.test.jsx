/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pills from '../../../src/components/common/Pills';

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  clsx: (...args) => args.filter(Boolean).join(' '),
  key: (a, b) => `${a}-${b}`,
}));

jest.mock('framer-motion', () => ({
  __esModule: true,
  // eslint-disable-next-line react/jsx-no-useless-fragment,react/prop-types
  LazyMotion: ({ children }) => <>{ children }</>,
  domMax: {},
  m: {
    dt: ({
      children,
      className,
      onClick,
      whileTap,
      ...rest
    }) => (
      /*
        eslint-disable-next-line jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-noninteractive-element-interactions
      */
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
  '../../../src/components/common/styles.module.css',
  () => ({
    pills: 'pills-class',
    active: 'active-class',
    item: 'item-class',
    indicator: 'indicator-class',
  }),
);

describe('Pills', () => {
  const items = ['apple', 'banana', 'cherry'];
  const prefix = 'fruit';

  it('renders a <dl> with one <dt> per item and calls onClick', () => {
    const handleClick = jest.fn();
    const { container } = render((
      <Pills
        active="banana"
        items={items}
        onClick={handleClick}
        prefix={prefix}
        data-testid="pills"
      />
    ));

    // grab the one <dl> element
    const dl = container.querySelector('dl');
    expect(dl.tagName).toBe('DL');
    expect(dl).toHaveClass('pills-class');

    // one <dt> per item
    const dtElements = container.querySelectorAll('dt');
    expect(dtElements).toHaveLength(items.length);

    // each dt wraps a span with the item text
    items.forEach((item, idx) => {
      // eslint-disable-next-line security/detect-object-injection
      const dt = dtElements[idx];
      const span = dt.querySelector('span:not([data-test*="indicator"])');
      expect(span).toHaveTextContent(item);
    });

    // click an item
    fireEvent.click(dtElements[0]);
    expect(handleClick).toHaveBeenCalledWith('apple');
  });

  it('applies active class on the active item and renders an indicator', () => {
    const handleClick = jest.fn();
    const { container, getByTestId } = render((
      <Pills
        active="cherry"
        items={items}
        onClick={handleClick}
        prefix={prefix}
      />
    ));

    const dtElements = container.querySelectorAll('dt');
    const appleDt = dtElements[0];
    const cherryDt = dtElements[2];

    // only the active dt has the active-class
    expect(appleDt).not.toHaveClass('active-class');
    expect(cherryDt).toHaveClass('active-class');

    // the indicator span appears only for the active item
    const indicator = getByTestId('indicator-cherry');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('indicator-class');
    expect(indicator).toHaveAttribute(
      'data-layoutid',
      `pill-indicator-${prefix}`,
    );
    expect(indicator).toHaveTextContent('cherry');
  });
});
