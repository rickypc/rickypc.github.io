/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/// <reference types="bun-types/test-globals" />

type Mocked<T extends (...args: any[]) => any> = Mock<T> & ReturnType<T>;

type TestingLibraryMatchers<T> =
  import('@testing-library/jest-dom/matchers').TestingLibraryMatchers<any, T>;

declare module 'bun:test' {
  interface Matchers<T = unknown> extends TestingLibraryMatchers<T> {}
}

declare module 'cli-progress' {
  export const barUpdate: any;
  export const barsUpdate: any;
  export const create: any;
  export const increment: any;
  export const setTotal: any;
  export const stop: any;

  export interface MultiBarInstance {
    create(..._args: any[]): any;
    stop(): void;
    update(): void;
  }

  export interface MultiBarConstructor {
    new (..._args: any[]): MultiBarInstance;
    (..._args: any[]): MultiBarInstance;
  }

  export const MultiBar: MultiBarConstructor;
  export type MultiBar = MultiBarInstance;
}

declare module 'pdfmake' {
  export const addFonts: any;
  export const createPdf: any;
  export const setLocalAccessPolicy: any;
  export const setUrlAccessPolicy: any;
  export const write: any;
}

declare module 'tinypool' {
  const Tinypool: any;
  export default Tinypool;
  export const pools: any;
}
