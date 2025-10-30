/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heart from '@site/src/components/common/Heart';

jest.unmock('@site/src/components/common/Heart');

describe('Heart', () => {
  const cases = [
    ['default props', {}, ['reaction']],
    ['with custom className', { className: 'custom-class' }, ['custom-class', 'reaction']],
  ];

  it.each(cases)('%s', (_desc, extraProps, expectedClasses) => {
    const { container } = render(<Heart id="heart1" {...extraProps} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expectedClasses.forEach((cls) => {
      expect(span).toHaveClass(cls);
    });
  });
});
