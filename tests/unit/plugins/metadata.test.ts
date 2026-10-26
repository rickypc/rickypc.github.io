/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { remarkMetadata } from '#root/src/plugins/metadata';

const transformer = remarkMetadata();

const badge = { attributes: [], children: [], name: 'Metadata', type: 'mdxJsxFlowElement' };

type FixtureNode = {
  type: string;
  value?: string;
  depth?: number;
  name?: string;
  attributes?: unknown[];
  children?: unknown[];
};

describe('plugins.remarkMetadata()', () => {
  test('inserts the badge after the leading prefix when the body has no level-1 heading', () => {
    const root = {
      children: [
        { type: 'yaml', value: 'title: T' },
        { type: 'mdxjsEsm', value: "import X from 'y';" },
        { depth: 2, type: 'heading' },
        { type: 'paragraph' },
      ],
    };
    transformer(root, { basename: 'doc.mdx' });
    expect(root.children).toEqual([
      { type: 'yaml', value: 'title: T' },
      { type: 'mdxjsEsm', value: "import X from 'y';" },
      badge,
      { depth: 2, type: 'heading' },
      { type: 'paragraph' },
    ]);
  });

  test('inserts the badge at the top when the body has neither prefix nor a level-1 heading', () => {
    const root = { children: [{ type: 'paragraph' }] };
    transformer(root, { basename: 'doc.mdx' });
    expect(root.children).toEqual([badge, { type: 'paragraph' }]);
  });

  test('appends the badge when the tree carries only a front matter and import prefix', () => {
    const root: { children: FixtureNode[] } = {
      children: [
        { type: 'yaml', value: 'title: T' },
        { type: 'mdxjsEsm', value: "import X from 'y';" },
      ],
    };
    transformer(root, { basename: 'doc.mdx' });
    const expected: FixtureNode[] = [
      { type: 'yaml', value: 'title: T' },
      { type: 'mdxjsEsm', value: "import X from 'y';" },
      badge,
    ];
    expect(root.children).toEqual(expected);
  });

  test('inserts the badge directly after a body level-1 heading', () => {
    const root = {
      children: [
        { type: 'yaml', value: 'title: T' },
        { depth: 1, type: 'heading' },
        { type: 'paragraph' },
      ],
    };
    transformer(root, { basename: 'doc.mdx' });
    expect(root.children).toEqual([
      { type: 'yaml', value: 'title: T' },
      { depth: 1, type: 'heading' },
      badge,
      { type: 'paragraph' },
    ]);
  });

  test('inserts the badge after the contentTitle header wrapper around a body h1', () => {
    const root = {
      children: [
        { type: 'yaml', value: 'title: T' },
        { type: 'mdxjsEsm', value: "import X from 'y';" },
        { name: 'header', type: 'mdxJsxFlowElement' },
        { type: 'paragraph' },
      ],
    };
    transformer(root, { basename: 'doc.mdx' });
    expect(root.children).toEqual([
      { type: 'yaml', value: 'title: T' },
      { type: 'mdxjsEsm', value: "import X from 'y';" },
      { name: 'header', type: 'mdxJsxFlowElement' },
      badge,
      { type: 'paragraph' },
    ]);
  });

  test('ignores pipeline-appended trailing ESM exports such as the table of contents', () => {
    const root = {
      children: [
        { type: 'yaml', value: 'title: T' },
        { type: 'mdxjsEsm', value: "import X from 'y';" },
        { type: 'paragraph' },
        { type: 'mdxjsEsm', value: 'export const toc = []' },
      ],
    };
    transformer(root, { basename: 'doc.mdx' });
    expect(root.children).toEqual([
      { type: 'yaml', value: 'title: T' },
      { type: 'mdxjsEsm', value: "import X from 'y';" },
      badge,
      { type: 'paragraph' },
      { type: 'mdxjsEsm', value: 'export const toc = []' },
    ]);
  });

  test('skips underscore-prefixed partials by basename and by path', () => {
    const byBasename = { children: [{ type: 'paragraph' }] };
    transformer(byBasename, { basename: '_partial.mdx' });
    expect(byBasename.children).toHaveLength(1);

    const byPath = { children: [{ type: 'paragraph' }] };
    transformer(byPath, { path: '/docs/x/_partial.mdx' });
    expect(byPath.children).toHaveLength(1);
  });

  test('never duplicates an existing root-level Metadata element', () => {
    const root = { children: [badge, { type: 'paragraph' }] };
    transformer(root, { basename: 'doc.mdx' });
    expect(root.children).toHaveLength(2);
  });
});
