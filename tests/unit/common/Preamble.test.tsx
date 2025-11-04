/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Preamble from '@site/src/components/common/Preamble';

jest.unmock('@site/src/components/common/Preamble');

describe('Preamble', () => {
  const baseProps = {
    description: 'This is a sample description.',
    title: 'Sample Title',
  };

  describe('default rendering', () => {
    it('does not render PrintAdmonition', () => {
      render(<Preamble {...baseProps} />);
      expect(screen.queryByTestId('print-admonition')).toBeNull();
    });

    it('renders header, heading, and description', () => {
      render(<Preamble {...baseProps} />);

      // eslint-disable-next-line testing-library/no-node-access
      const header = screen.getByText(baseProps.title).closest('header');
      expect(header).toHaveClass('row');

      // eslint-disable-next-line testing-library/no-node-access
      const innerDiv = header?.querySelector('div');
      expect(innerDiv).toHaveClass(
        'col col--8 col--offset-2 preamble',
      );

      const heading = screen.getByTestId('heading');
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveTextContent(baseProps.title);

      const para = screen.getByText(baseProps.description);
      expect(para.tagName).toBe('P');
    });
  });

  describe('when printAdmonition is true', () => {
    it('renders the PrintAdmonition component', () => {
      render(<Preamble {...baseProps} printAdmonition />);
      expect(screen.getByTestId('print-admonition')).toBeInTheDocument();
    });
  });
});
