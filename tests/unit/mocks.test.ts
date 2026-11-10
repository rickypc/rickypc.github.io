/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { join } from 'node:path';

const unitRoot = join(import.meta.dir, '..', '..', 'tests', 'unit');

const mockFileFor = async (mockPath: string) => {
  for (const candidate of [mockPath, `${mockPath}.ts`, `${mockPath}.tsx`, `${mockPath}.jsx`]) {
    if (await Bun.file(join(unitRoot, candidate)).exists()) {
      return candidate;
    }
  }
  return undefined;
};

describe('tests.unit.mocks', () => {
  test('every preload key maps to an existing suite file', async () => {
    const mocks = (await Bun.file(join(unitRoot, 'mocks.json')).json()) as Record<string, unknown>;
    const stale: string[] = [];
    for (const key of Object.keys(mocks)) {
      if (!(await Bun.file(join(unitRoot, '..', '..', key)).exists())) {
        stale.push(key);
      }
    }

    expect(stale).toEqual([]);
  });

  test('every mapped mock module resolves to a real mock file', async () => {
    const mocks = (await Bun.file(join(unitRoot, 'mocks.json')).json()) as Record<
      string,
      Record<string, string>
    >;
    const unresolved: string[] = [];
    for (const modules of Object.values(mocks)) {
      for (const [specifier, mockPath] of Object.entries(modules)) {
        if ((await mockFileFor(mockPath)) === undefined) {
          unresolved.push(`${specifier} -> ${mockPath}`);
        }
      }
    }

    expect(unresolved).toEqual([]);
  });
});
