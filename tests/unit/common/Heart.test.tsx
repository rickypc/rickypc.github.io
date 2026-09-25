/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Heart from '@site/src/components/common/Heart';
import { render } from '@testing-library/react';

type Cases = [string, { className?: string }, string[]];

describe('Heart', () => {
  const cases: Cases[] = [
    ['default props', {}, ['reaction']],
    ['with custom className', { className: 'custom-class' }, ['custom-class', 'reaction']],
  ];

  test.each(cases)('%s', (_desc, extraProps, expectedClasses) => {
    // biome-ignore lint/correctness/useUniqueElementIds: -
    const { container } = render(<Heart id="heart1" {...extraProps} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expectedClasses.forEach((cls) => {
      expect(span).toHaveClass(cls);
    });
  });
});
