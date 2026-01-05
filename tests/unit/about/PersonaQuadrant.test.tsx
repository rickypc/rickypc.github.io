/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonaQuadrant from '@site/src/components/about/PersonaQuadrant';
import { type QuadrantAxis, type QuadrantLabel } from '@site/src/data/about';

describe('about.PersonaQuadrant', () => {
  const axes: QuadrantAxis[] = [
    {
      anchor: 'middle',
      text: 'X Axis',
      transform: '',
      x: 100,
      y: 230,
    },
    {
      anchor: 'end',
      text: 'Y Axis',
      transform: 'rotate(-90)',
      x: -10,
      y: 100,
    },
  ];

  const circle = { x: 120, y: 80 };

  const labels: QuadrantLabel[] = [
    {
      anchor: 'start',
      text: 'Top Left',
      title: 'TL',
      x: 0,
      y: 0,
    },
    {
      anchor: 'end',
      text: 'Top Right',
      title: 'TR',
      x: 200,
      y: 0,
    },
    {
      anchor: 'start',
      text: 'Bottom Left',
      title: 'BL',
      x: 0,
      y: 200,
    },
    {
      anchor: 'end',
      text: 'Bottom Right',
      title: 'BR',
      x: 200,
      y: 200,
    },
  ];

  test('renders an accessible SVG with all the children', () => {
    const { container } = render((
      <PersonaQuadrant
        alt="Quadrant Diagram"
        axes={axes}
        circle={circle}
        className="test-class"
        labels={labels}
      />
    ));

    const svg = screen.getByRole('img', { name: 'Quadrant Diagram' });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('test-class');

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const arrows = container.querySelectorAll('path.arrow');
    expect(arrows).toHaveLength(2);

    expect(arrows[0]).toHaveAttribute('d', 'M0 205h190');
    expect(arrows[1]).toHaveAttribute('d', 'M-5 200V10');

    axes.forEach((axis) => {
      expect(screen.getByText(axis.text)).toBeInTheDocument();
    });

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const circleEl = container.querySelector('circle');
    expect(circleEl).toHaveAttribute('cx', circle.x.toString());
    expect(circleEl).toHaveAttribute('cy', circle.y.toString());
    expect(circleEl).toHaveAttribute('r', '10');

    labels.forEach((label) => {
      const el = screen.getByText(label.text);
      expect(el).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(el.querySelector('title')?.textContent).toBe(label.title);
    });

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.querySelector('path.axis')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect(container.querySelector('path.grid')).toBeInTheDocument();
  });
});
