/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { fileURLToPath } from 'node:url';
import { transformAsync } from '@babel/core';
import babelConfig from '#root/babel.config';
import { babelSmartSpace } from '#root/src/plugins/smart-space';

describe('babel.config', () => {
  test('wires the docusaurus preset and this plugin as its babel configuration', () => {
    const preset = fileURLToPath(import.meta.resolve('@docusaurus/core/lib/babel/preset'));
    expect(babelConfig.presets).toEqual([preset]);
    expect(babelConfig.plugins).toEqual([babelSmartSpace]);
  });

  test('loads babel.config.ts through babel core and keeps the space in emitted JSX calls', async () => {
    const result = await transformAsync('const x = <p>from\n  <Link to="/x">y</Link></p>;', {
      babelrc: false,
      caller: { name: 'client' },
      configFile: require.resolve('#root/babel.config.ts'),
      filename: 'fixture.tsx',
    });
    expect(result?.code).toContain('"from "');
  });
});
