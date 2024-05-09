/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2024 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

export const transition = {
  opacity: { duration: 0.2 },
  x: {
    bounce: 0,
    mass: 0.5,
    stiffness: 50,
    type: 'spring',
  },
};

export const variants = {
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: (direction) => ({
    opacity: 0.2,
    scale: 0.8,
    x: direction > 0 ? '-100%' : '100%',
  }),
  initial: (direction) => ({
    opacity: 0,
    scale: 1.5,
    x: direction > 0 ? '100%' : '-100%',
  }),
};

export const within = (val, min, max) => {
  const delta = max - min;
  return ((((val - min) % delta) + delta) % delta) + min;
};
