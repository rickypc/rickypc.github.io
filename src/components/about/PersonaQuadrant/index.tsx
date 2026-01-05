/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { a11y, clsx, key } from '@site/src/data/common';
import { memo } from 'react';
import { type QuadrantAxis, type QuadrantLabel, type QuadrantPosition } from '@site/src/data/about';
import styles from './styles.module.css';

type PersonaQuadrantProps = {
  alt: string;
  axes: QuadrantAxis[],
  circle: QuadrantPosition,
  className: string;
  labels: QuadrantLabel[];
};

export default memo(function PersonaQuadrant({
  alt,
  axes,
  circle,
  className,
  labels,
}: PersonaQuadrantProps) {
  return (
    <svg {...a11y(alt)} className={clsx(className, styles.quadrant)} role="img" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" markerHeight="11" markerWidth="10" orient="auto" refY="3" viewBox="0 0 20 20">
          <path d="M0 0v6l9-3z" />
        </marker>
        <radialGradient id="radial" cx="38%" cy="30%" r="78%">
          <stop offset="0%" />
          <stop offset="16%" />
          <stop offset="30%" />
          <stop offset="48%" />
          <stop offset="62%" />
          <stop offset="72%" />
          <stop offset="80%" />
          <stop offset="90%" />
          <stop offset="96%" />
          <stop offset="100%" />
        </radialGradient>
      </defs>
      <g transform="translate(25 25)">
        <rect className="inner" />
        <path className="arrow" d="M0 205h190" markerEnd="url(#arrow)" />
        <path className="arrow" d="M-5 200V10" markerEnd="url(#arrow)" />
        {labels.map((label) => (
          <text
            className="label"
            key={key(label.text)}
            textAnchor={label.anchor}
            x={label.x}
            y={label.y}
          >
            <title>{label.title}</title>
            {label.text}
          </text>
        ))}
        {axes.map((axis) => (
          <text
            className="axis"
            key={key(axis.text)}
            textAnchor={axis.anchor}
            transform={axis.transform}
            x={axis.x}
            y={axis.y}
          >
            {axis.text}
          </text>
        ))}
        <path className="grid" d="M20 0v200M40 0v200M60 0v200M80 0v200M100 0v200M120 0v200M140 0v200M160 0v200M180 0v200M0 20h200M0 40h200M0 60h200M0 80h200M0 100h200M0 120h200M0 140h200M0 160h200M0 180h200M0 200h200" />
        <path className="axis" d="M0 100h200M100 0v200" />
        <circle r="10" cx={circle.x} cy={circle.y} fill="url(#radial)" />
      </g>
    </svg>
  );
});
