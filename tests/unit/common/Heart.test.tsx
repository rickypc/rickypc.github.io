/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heart from '@site/src/components/common/Heart';

jest.unmock('@site/src/components/common/Heart');

type Cases = [string, { className?: string; }, string[]];

describe('Heart', () => {
  const cases: Cases[] = [
    ['default props', {}, ['reaction']],
    ['with custom className', { className: 'custom-class' }, ['custom-class', 'reaction']],
  ];

  test.each(cases)('%s', (_desc, extraProps, expectedClasses) => {
    const { container } = render(<Heart id="heart1" {...extraProps} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expectedClasses.forEach((cls) => {
      expect(span).toHaveClass(cls);
    });
  });
});
