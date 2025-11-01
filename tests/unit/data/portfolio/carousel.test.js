/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import { transition, variants, within } from '@site/src/data/portfolio/carousel';

describe('portfolio.carousel', () => {
  it('transition shape and values', () => {
    expect(typeof transition).toBe('object');
    expect(transition).toHaveProperty('opacity');
    expect(transition).toHaveProperty('x');
    expect(typeof transition.opacity).toBe('object');
    expect(typeof transition.x).toBe('object');

    expect(transition.opacity.duration).toBeCloseTo(0.2, 5);

    const { x } = transition;
    expect(x).toEqual({
      bounce: 0,
      mass: 0.5,
      stiffness: 50,
      type: 'spring',
    });
  });

  it('variants.animate and factories produce expected values for positive, zero, negative directions', () => {
    // Animate.
    expect(typeof variants.animate).toBe('object');
    expect(variants.animate).toEqual({ opacity: 1, scale: 1, x: 0 });

    // Exit: direction > 0 => -100%, direction <= 0 => 100%.
    const exitPos = variants.exit(1);
    const exitZero = variants.exit(0);
    const exitNeg = variants.exit(-2);
    expect(exitPos).toEqual({ opacity: 0.2, scale: 0.8, x: '-100%' });
    expect(exitZero).toEqual({ opacity: 0.2, scale: 0.8, x: '100%' });
    expect(exitNeg).toEqual({ opacity: 0.2, scale: 0.8, x: '100%' });

    // Initial: direction > 0 => 100%, direction <= 0 => -100%.
    const initPos = variants.initial(2);
    const initZero = variants.initial(0);
    const initNeg = variants.initial(-1);
    expect(initPos).toEqual({ opacity: 0, scale: 1.5, x: '100%' });
    expect(initZero).toEqual({ opacity: 0, scale: 1.5, x: '-100%' });
    expect(initNeg).toEqual({ opacity: 0, scale: 1.5, x: '-100%' });

    // Small non-integer direction values.
    expect(variants.exit(0.0001).x).toBe('-100%');
    expect(variants.exit(-0.0001).x).toBe('100%');
    expect(variants.initial(0.5).x).toBe('100%');
    expect(variants.initial(-0.5).x).toBe('-100%');
  });

  it('within wraps and preserves precision across representative edge cases', () => {
    // Basic wrap forward and backward.
    expect(within(370, 0, 360)).toBe(10);
    expect(within(-10, 0, 360)).toBe(350);

    // Equality cases.
    expect(within(5, 5, 10)).toBe(5);
    expect(within(10, 0, 10)).toBe(0);

    // Non-zero min and typical wrap.
    expect(within(250, 100, 200)).toBe(150);

    // Floating point precision preserved.
    expect(within(3.14159 + 360, 0, 360)).toBeCloseTo(3.14159, 5);

    // Very large numbers.
    expect(within(1e9 + 5, 0, 100)).toBe(5);
    expect(within(-1e9 + 7, 0, 100)).toBe(7);

    // Negative min and results outside range.
    expect(within(15, -10, 20)).toBe(15);
    expect(within(25, -10, 20)).toBe(-5);

    // Delta = 1 edge cases.
    expect(within(0.9999, 0, 1)).toBeCloseTo(0.9999, 5);
    expect(within(1, 0, 1)).toBe(0);
  });
});
