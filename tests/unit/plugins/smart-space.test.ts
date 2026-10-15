/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { transformAsync } from '@babel/core';
import { babelSmartSpace, remarkSmartSpace, type TextNode } from '#root/src/plugins/smart-space';

describe('plugins.smart-space.babel', () => {
  const compile = async (code: string): Promise<string> =>
    (
      await transformAsync(code, {
        babelrc: false,
        configFile: false,
        filename: 'fixture.tsx',
        parserOpts: { plugins: ['jsx', 'typescript'] },
        plugins: [babelSmartSpace],
      })
    )?.code ?? '';

  test('should ignore text nodes that do not contain newlines', async () => {
    expect(await compile('const x = <p>hello world</p>;')).toContain('<p>hello world</p>');
  });

  test('collapses boundary runs completely when next to parent tags (stock JSX behavior)', async () => {
    expect(await compile('const x = <p>\n  content\n</p>;')).toContain('<p>content</p>');
  });

  test('collapses an interior newline run down to a single space', async () => {
    expect(await compile('const x = <p>word1\n  word2</p>;')).toContain('word1 word2');
  });

  test('keeps trailing space if text ends in a word and an inline element follows', async () => {
    expect(await compile('const x = <p>from\n  <Link to="/x" /></p>;')).toContain('from <Link');
  });

  test('retains stock deletion for trailing run beside a block element', async () => {
    expect(await compile('const x = <p>text\n  <div /></p>;')).toContain('text<div');
  });

  test('keeps trailing space when text ends in punctuation and an inline element follows', async () => {
    expect(await compile('const x = <p>dimensions of:\n  <span /></p>;')).toContain('of: <span');
  });

  test('retains stock deletion for trailing run when it ends in a non-breaking space', async () => {
    expect(await compile('const x = <p>text\u00a0\n  <span /></p>;')).toContain('text\u00a0<span');
  });

  test('keeps a leading space when text opens with a word', async () => {
    expect(await compile('const x = <p><span />\n  word</p>;')).toContain('<span /> word');
  });

  test('keeps a leading space when text opens with an opening bracket', async () => {
    expect(await compile('const x = <p><span />\n  (parenthetical)</p>;')).toContain(
      '<span /> (parenthetical)',
    );
  });

  test('deletes leading space for punctuation to bind tight to the previous element', async () => {
    expect(await compile('const x = <p><Link />\n  , then</p>;')).toContain('<Link />, then');
  });

  test('turns a whitespace-only node between two inline elements into a single space', async () => {
    expect(await compile('const x = <p><b />\n  <i /></p>;')).toContain('<b /> <i />');
  });

  test('preserves stock deletion on whitespace-only node if not strictly between two inline siblings', async () => {
    const output = await compile('const x = <p><b />\n  <div /></p>;');
    expect(output).toContain('<b />\n');
    expect(output).not.toContain('<b /> <div');
  });

  test('keeps trailing space when an expression container follows', async () => {
    expect(await compile('const x = <p>fake.\n  {expr}</p>;')).toContain('fake. {expr}');
  });

  test('retains stock deletion for trailing run beside a fragment', async () => {
    expect(await compile('const x = <p>text\n  <><i /></></p>;')).toContain('text<>');
  });
});

describe('plugins.smart-space.remark', () => {
  const createElement = (name: string) => ({
    openingElement: { name: { name, type: 'JSXIdentifier' } },
    type: 'JSXElement',
  });
  const Plugin = remarkSmartSpace();

  test('recursively processes raw arrays found inside generic node properties', () => {
    const tree = {
      body: [{ children: [{ type: 'JSXText', value: 'word1  \n  word2' }], type: 'JSXElement' }],
      type: 'Program',
    };
    Plugin(tree);

    // Verifies that the nested element inside the generic array was successfully visited and
    // rewritten.
    expect((tree.body[0].children as TextNode[])[0].value).toBe('word1 word2');
  });

  test('should ignore text nodes that do not contain newlines', () => {
    const tree = { children: [{ type: 'JSXText', value: 'hello world' }], type: 'JSXElement' };
    Plugin(tree);
    expect((tree.children as TextNode[])[0].value).toBe('hello world');
  });

  test('collapses boundary runs completely when next to parent tags (stock JSX behavior)', () => {
    const tree = {
      children: [{ type: 'JSXText', value: '  \n  content  \n  ' }],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[0].value).toBe('content');
  });

  test('collapses an interior newline run down to a single space', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'word1  \n  word2' }],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[0].value).toBe('word1 word2');
  });

  test('keeps trailing space if text ends in a word and an inline element follows', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'from  \n  ' }, createElement('Link')],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[0].value).toBe('from ');
  });

  test('retains stock deletion for trailing run beside a block element', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'text  \n  ' }, createElement('div')],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[0].value).toBe('text');
  });

  test('keeps trailing space when text ends in punctuation and an inline element follows', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'dimensions of:  \n  ' }, createElement('span')],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[0].value).toBe('dimensions of: ');
  });

  test('retains stock deletion for trailing run when it ends in a non-breaking space', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'text\u00a0\n  ' }, createElement('span')],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[0].value).toBe('text\u00a0');
  });

  test('keeps a leading space when text opens with a word', () => {
    const tree = {
      children: [createElement('span'), { type: 'JSXText', value: '  \n  word' }],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[1].value).toBe(' word');
  });

  test('keeps a leading space when text opens with an opening bracket', () => {
    const tree = {
      children: [createElement('span'), { type: 'JSXText', value: '  \n  (parenthetical)' }],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[1].value).toBe(' (parenthetical)');
  });

  test('deletes leading space for punctuation to bind tight to the previous element', () => {
    const tree = {
      children: [createElement('Link'), { type: 'JSXText', value: '  \n  , then' }],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[1].value).toBe(', then');
  });

  test('turns a whitespace-only node between two inline elements into a single space', () => {
    const tree = {
      children: [createElement('b'), { type: 'JSXText', value: '   \n   ' }, createElement('i')],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[1].value).toBe(' ');
  });

  test('preserves stock deletion on whitespace-only node if not strictly between two inline elements', () => {
    const tree = {
      children: [createElement('b'), { type: 'JSXText', value: '   \n   ' }, createElement('div')],
      type: 'JSXElement',
    };
    Plugin(tree);
    expect((tree.children as TextNode[])[1].value).toBe('   \n   ');
  });
});
