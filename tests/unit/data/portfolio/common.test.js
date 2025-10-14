/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

import transition from '@site/src/data/portfolio/common';

describe('portfolio.common', () => {
  it('exports an object with exactly the expected keys', () => {
    expect(typeof transition).toEqual('object');
    expect(Object.keys(transition).sort()).toEqual(['damping', 'stiffness', 'type'].sort());
  });

  it('provides correct typed values for each key', () => {
    expect(transition.damping).toEqual(25);
    expect(typeof transition.damping).toEqual('number');

    expect(transition.stiffness).toEqual(120);
    expect(typeof transition.stiffness).toEqual('number');

    expect(transition.type).toEqual('spring');
    expect(typeof transition.type).toEqual('string');
  });

  it('matches the exact exported object shape and value equality', () => {
    expect(transition).toEqual({ damping: 25, stiffness: 120, type: 'spring' });
  });

  it('spreading the object does not add extra enumerable properties', () => {
    const clone = { ...transition };
    expect(clone).toEqual(transition);
    expect(Object.keys(clone).length).toEqual(3);
  });
});
