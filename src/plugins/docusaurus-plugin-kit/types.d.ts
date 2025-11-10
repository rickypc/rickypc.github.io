/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

declare module 'cli-progress' {
  export interface Options {
    format?: string;
    [key: string]: any;
  }

  export interface Preset {
    barCompleteChar: string;
    barIncompleteChar: string;
    format: string;
    stopOnComplete?: boolean;
  }

  export class Bar {
    // eslint-disable-next-line no-unused-vars
    constructor(options: Options, preset?: any);

    increment(): void;

    options: Options;

    // eslint-disable-next-line no-unused-vars
    start(total: number, value: number): void;

    stop(): void;
  }
}

declare module '@docusaurus/responsive-loader/sharp' {
  const content: any;
  export default content;
}
