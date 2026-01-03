/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
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
    test('renders header, heading, and description', () => {
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
});
