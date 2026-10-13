/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import Plugin, { type TextNode } from '#root/src/plugins/remark-smart-space';

const createElement = (name: string) => ({
  openingElement: { name: { name, type: 'JSXIdentifier' } },
  type: 'JSXElement',
});
const remarkSmartSpace = Plugin();

describe('plugins.remark-smart-space', () => {
  test('recursively processes raw arrays found inside generic node properties', () => {
    const tree = {
      body: [{ children: [{ type: 'JSXText', value: 'word1  \n  word2' }], type: 'JSXElement' }],
      type: 'Program',
    };
    remarkSmartSpace(tree);

    // Verifies that the nested element inside the generic array was successfully visited and
    // rewritten.
    expect((tree.body[0].children as TextNode[])[0].value).toBe('word1 word2');
  });

  test('should ignore text nodes that do not contain newlines', () => {
    const tree = { children: [{ type: 'JSXText', value: 'hello world' }], type: 'JSXElement' };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[0].value).toBe('hello world');
  });

  test('collapses boundary runs completely when next to parent tags (stock JSX behavior)', () => {
    const tree = {
      children: [{ type: 'JSXText', value: '  \n  content  \n  ' }],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[0].value).toBe('content');
  });

  test('collapses an interior newline run down to a single space', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'word1  \n  word2' }],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[0].value).toBe('word1 word2');
  });

  test('keeps trailing space if text ends in a word and an inline element follows', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'from  \n  ' }, createElement('Link')],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[0].value).toBe('from ');
  });

  test('retains stock deletion for trailing run beside a block element', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'text  \n  ' }, createElement('div')],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[0].value).toBe('text');
  });

  test('keeps trailing space when text ends in punctuation and an inline element follows', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'dimensions of:  \n  ' }, createElement('span')],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[0].value).toBe('dimensions of: ');
  });

  test('retains stock deletion for trailing run when it ends in a non-breaking space', () => {
    const tree = {
      children: [{ type: 'JSXText', value: 'text\u00a0\n  ' }, createElement('span')],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[0].value).toBe('text\u00a0');
  });

  test('keeps a leading space when text opens with a word', () => {
    const tree = {
      children: [createElement('span'), { type: 'JSXText', value: '  \n  word' }],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[1].value).toBe(' word');
  });

  test('keeps a leading space when text opens with an opening bracket', () => {
    const tree = {
      children: [createElement('span'), { type: 'JSXText', value: '  \n  (parenthetical)' }],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[1].value).toBe(' (parenthetical)');
  });

  test('deletes leading space for punctuation to bind tight to the previous element', () => {
    const tree = {
      children: [createElement('Link'), { type: 'JSXText', value: '  \n  , then' }],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[1].value).toBe(', then');
  });

  test('turns a whitespace-only node between two inline elements into a single space', () => {
    const tree = {
      children: [createElement('b'), { type: 'JSXText', value: '   \n   ' }, createElement('i')],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[1].value).toBe(' ');
  });

  test('preserves stock deletion on whitespace-only node if not strictly between two inline elements', () => {
    const tree = {
      children: [createElement('b'), { type: 'JSXText', value: '   \n   ' }, createElement('div')],
      type: 'JSXElement',
    };
    remarkSmartSpace(tree);
    expect((tree.children as TextNode[])[1].value).toBe('   \n   ');
  });
});
