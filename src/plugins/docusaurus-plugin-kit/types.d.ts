/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

declare module '@docusaurus/responsive-loader/sharp' {
  const content: any;
  export default content;
}

declare module 'timeable-promise' {
  export function concurrent<T>(
    // eslint-disable-next-line no-unused-vars
    array: T[],
    // eslint-disable-next-line no-unused-vars
    executor: (item: T[], index: number, array: T[][]) => Promise<void>,
    // eslint-disable-next-line no-unused-vars
    concurrency: number,
  ): Promise<void>;
}
