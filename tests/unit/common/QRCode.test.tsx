/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import QRCode from '@site/src/components/common/QRCode';
import { render, screen } from '@testing-library/react';

describe('QRCode', () => {
  (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
    siteConfig: { url: 'https://domain.test' },
  });

  test('renders the QR code with all its children', () => {
    render(<QRCode />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('qr');

    const title = screen.getByText('domain.test');
    expect(title).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const image = svg.querySelector('image');
    expect(image).not.toBeNull();
    expect(image?.getAttribute('height')).toBe('7.25');
    expect(image?.getAttribute('width')).toBe('7.25');
    expect(image?.getAttribute('x')).toBe('10.875');
    expect(image?.getAttribute('y')).toBe('10.875');
  });
});
