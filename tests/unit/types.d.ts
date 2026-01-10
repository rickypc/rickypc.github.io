/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

declare module 'beasties' {
  const Beasties: any;
  export default Beasties;
  export const process: any;
}

declare module 'cli-progress' {
  export const barUpdate: any;
  export const barsUpdate: any;
  export const create: any;
  export const increment: any;
  export const setTotal: any;
  export const stop: any;

  export interface MultiBarInstance {
    // eslint-disable-next-line no-unused-vars
    create(...args: any[]): any;
    stop(): void;
    update(): void;
  }

  export interface MultiBarConstructor {
    // eslint-disable-next-line no-unused-vars
    new(...args: any[]): MultiBarInstance;
    // eslint-disable-next-line no-unused-vars
    (...args: any[]): MultiBarInstance;
  }

  export const MultiBar: MultiBarConstructor;
  export type MultiBar = MultiBarInstance;
}
