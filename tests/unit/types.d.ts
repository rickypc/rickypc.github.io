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
    create(...args: any[]): any;
    stop(): void;
    update(): void;
  }

  export interface MultiBarConstructor {
    new(...args: any[]): MultiBarInstance;
    (...args: any[]): MultiBarInstance;
  }

  export const MultiBar: MultiBarConstructor;
  export type MultiBar = MultiBarInstance;
}

declare module '@docusaurus/utils' {
  export const DEFAULT_BUILD_DIR_NAME: string;
  export const DEFAULT_CONFIG_FILE_NAME: string;
  export const getFileCommitDate: any;
  export const loadFreshModule: any;
  export const siteConfig: any;
}

