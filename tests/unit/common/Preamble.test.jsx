/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Preamble from '../../../src/components/common/Preamble';

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

jest.mock('@site/src/components/common/PrintAdmonition', () => ({
  __esModule: true,
  default: () => <div data-testid="print-admonition" />,
}));

jest.mock(
  '../../../src/components/common/styles.module.css',
  () => ({ preamble: 'preamble-class' }),
);

describe('Preamble', () => {
  const baseProps = {
    title: 'Sample Title',
    description: 'This is a sample description.',
  };

  it('renders header, heading, and description without PrintAdmonition by default', () => {
    const { queryByTestId, getByTestId, getByText } = render((
      <Preamble {...baseProps} />
    ));

    // PrintAdmonition should not render
    expect(queryByTestId('print-admonition')).toBeNull();

    // Header with class "row"
    const header = getByText('Sample Title').closest('header');
    expect(header).toHaveClass('row');

    // Inner div should have combined classes
    const innerDiv = header.querySelector('div');
    expect(innerDiv).toHaveClass(
      'col col--8 col--offset-2 preamble-class',
    );

    // Heading as an h1
    const heading = getByTestId('heading');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveTextContent('Sample Title');

    // Paragraph with description
    const para = getByText('This is a sample description.');
    expect(para.tagName).toBe('P');
  });

  it('renders PrintAdmonition when printAdmonition is true', () => {
    const { getByTestId } = render((
      <Preamble {...baseProps} printAdmonition />
    ));
    expect(getByTestId('print-admonition')).toBeInTheDocument();
  });
});
