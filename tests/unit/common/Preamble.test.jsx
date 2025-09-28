/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Preamble from '@site/src/components/common/Preamble';

jest.mock(
  '@site/src/components/common/Preamble/styles.module.css',
  () => ({ preamble: 'preamble-class' }),
);

jest.mock('@site/src/components/common/PrintAdmonition', () => ({
  __esModule: true,
  default: () => <div data-testid="print-admonition" />,
}));

jest.mock('@site/src/data/common', () => ({
  __esModule: true,
  clsx: (...args) => args.filter(Boolean).join(' '),
}));

jest.mock('@theme/Heading', () => ({
  __esModule: true,
  default: ({ as: Tag = 'h2', children }) => (
    <Tag data-testid="heading">{children}</Tag>
  ),
}));

describe('Preamble', () => {
  const baseProps = {
    title: 'Sample Title',
    description: 'This is a sample description.',
  };

  describe('default rendering', () => {
    let utils;

    beforeEach(() => {
      utils = render(<Preamble {...baseProps} />);
    });

    it('does not render PrintAdmonition', () => {
      const { queryByTestId } = utils;
      expect(queryByTestId('print-admonition')).toBeNull();
    });

    it('renders header, heading, and description', () => {
      const { getByTestId, getByText } = utils;
      const header = getByText(baseProps.title).closest('header');
      expect(header).toHaveClass('row');

      const innerDiv = header.querySelector('div');
      expect(innerDiv).toHaveClass(
        'col col--8 col--offset-2 preamble-class',
      );

      const heading = getByTestId('heading');
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveTextContent(baseProps.title);

      const para = getByText(baseProps.description);
      expect(para.tagName).toBe('P');
    });
  });

  describe('when printAdmonition is true', () => {
    it('renders the PrintAdmonition component', () => {
      const { getByTestId } = render((
        <Preamble {...baseProps} printAdmonition />
      ));
      expect(getByTestId('print-admonition')).toBeInTheDocument();
    });
  });
});
