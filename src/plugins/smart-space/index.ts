/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/**
 * Applies HTML whitespace semantics to JSX text without altering the rendered layout.
 *
 * Stock JSX deletes whitespace runs containing a newline at text boundaries. This causes issues
 * by gluing wrapped text together ("from\n<Link>" becomes "fromLink"), even though the corpus
 * relies on that deletion for tight punctuation typography ("</Link>\n, then" must not gain a
 * space before the comma).
 *
 * This module owns the shared smart-space rules and both pipeline adapters:
 *
 * 1. babelSmartSpace: The Babel plugin for .ts/.tsx sources (wired through babel.config.ts via
 *    the Docusaurus preset). It operates as the twin to the remark adapter with two exceptions:
 *    - A JSX expression container counts as an inline sibling.
 *    - The generator's `extra.rawValue` must stay in sync with the rewritten value.
 * 2. remarkSmartSpace: The remark attacher for MDX sources (registered in docusaurus.config.ts).
 *
 * Both pipelines execute exactly one shared implementation of the following rules for every
 * JSXText whitespace run containing a newline:
 *
 * - Boundary Runs: A run (first/last child) next to the parent's own tags collapses away
 *   completely, matching stock JSX behavior to keep content tight inside its element.
 * - Interior Runs: Collapses down to a single space, exactly like stock JSX.
 * - Trailing Runs: Keeps one space when followed by an inline element - regardless of whether
 *   the preceding text ends in a word or punctuation - ensuring a deleted entity anchor retains
 *   its space. It retains stock deletion next to a block element, when it is the last child,
 *   or when it ends in a non-breaking space.
 * - Leading Runs: Keeps one space when the text opens with a word or an opening bracket. Other
 *   punctuation binds tight to the previous element to preserve corpus typography.
 * - Whitespace-Only Nodes: Becomes a single space when sitting between two inline elements;
 *   beside any other element type, it preserves stock JSX deletion behavior.
 */

type BabelJsxTextNode = JsxTextNode & { extra?: { raw?: unknown; rawValue?: unknown } };

type BabelPlugin = {
  name: string;
  visitor: { JSXText(path: NodePath): void };
};

type JsxTextNode = TextNode & UnknownNode;

type JsxTextRewriter = (
  node: JsxTextNode,
  first: boolean,
  last: boolean,
  prev: unknown,
  next: unknown,
) => void;

type NodePath = {
  key: string;
  node: unknown;
  parent: UnknownNode;
};

type SmartSpaceOptions = {
  isInline: (node: unknown) => boolean;
  setValue: (node: JsxTextNode, value: string) => void;
};

export type TextNode = { value: string };

type UnknownNode = Record<string, unknown>;

const INLINE_TAGS = new Set([
  'a',
  'b',
  'code',
  'em',
  'i',
  'img',
  'Link',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
]);
const LINE_BREAK = /[ \t\r]*\n[ \t\n\r]*/g;
const NBSP = '\u00a0';
// Hoist regex to prevent recompilation during deep traversals.
const WORD_CHAR_REGEXP = /\p{L}|\p{N}/u;

const invalid = (node: unknown) => !node || typeof node !== 'object';

const hasInlineTag = (node: unknown): boolean => {
  if (invalid(node)) {
    return false;
  }
  const record = node as UnknownNode;
  if (record.type !== 'JSXElement') {
    return false;
  }
  const openingElement = record.openingElement as UnknownNode | undefined;
  const nameNode = openingElement?.name as UnknownNode | undefined;
  return nameNode?.type === 'JSXIdentifier' && INLINE_TAGS.has(String(nameNode.name));
};

const isJsxText = (node: unknown): node is JsxTextNode => {
  if (invalid(node)) {
    return false;
  }
  const record = node as UnknownNode;
  return record.type === 'JSXText' && typeof record.value === 'string';
};

const isOpening = (char: string | undefined): boolean =>
  char === '(' || char === '[' || char === '{';

const isWord = (char: string | undefined): boolean =>
  typeof char === 'string' && WORD_CHAR_REGEXP.test(char);

const normalizeEnd = (before: string, keep: boolean, last: boolean): string =>
  keep && !last && before !== NBSP ? ' ' : '';
const normalizeStart = (after: string, first: boolean): string =>
  !first && (isWord(after) || isOpening(after)) ? ' ' : '';

const normalizes = (
  value: string,
  first: boolean,
  last: boolean,
  nextNode: unknown,
  isInline: (node: unknown) => boolean,
): string => {
  const valueLength = value.length;
  return value.replace(LINE_BREAK, (match: string, offset: number): string => {
    const matchLength = match.length;
    if (offset === 0) {
      return normalizeStart(value[matchLength as number], first);
    }
    if (offset + matchLength === valueLength) {
      // Requires the following sibling to be inline, whether the text ends in a word or in
      // punctuation, so a deleted entity anchor can rely on the line break for the space.
      return normalizeEnd(value[offset - 1], isInline(nextNode), last);
    }
    return ' ';
  });
};

// After normalizes assignment.
const jsxTextRewriter = ({ isInline, setValue }: SmartSpaceOptions): JsxTextRewriter => {
  const response: JsxTextRewriter = (node, first, last, prev, next) => {
    // Simple string check before calling expensive regex testing.
    if (!node.value.includes('\n')) {
      return;
    }
    if (!/[^ \t\n\r]/.test(node.value)) {
      if (!first && !last && isInline(prev) && isInline(next)) {
        setValue(node, ' ');
      }
      return;
    }
    const normalized = normalizes(node.value, first, last, next, isInline);
    if (normalized !== node.value) {
      setValue(node, normalized);
    }
  };
  return response;
};

const rewriteBabelText = jsxTextRewriter({
  isInline(node: unknown): boolean {
    if (invalid(node)) {
      return false;
    }
    const record = node as UnknownNode;
    return record.type === 'JSXExpressionContainer' || hasInlineTag(record);
  },
  setValue(node: BabelJsxTextNode, value: string): void {
    const extra = node.extra;
    node.value = value;
    // Keeps the generator honest: it prints extra.raw while value still equals rawValue.
    if (extra && typeof extra.rawValue === 'string') {
      extra.raw = value;
      extra.rawValue = value;
    }
  },
});

const rewriteRemarkText = jsxTextRewriter({
  isInline: hasInlineTag,
  setValue(node: JsxTextNode, value: string): void {
    node.value = value;
    if (typeof node.raw === 'string') {
      node.raw = value;
    }
  },
});

const visitChildren = (children: unknown[]): void => {
  for (let index = 0, lastIndex = children.length - 1; index <= lastIndex; index += 1) {
    const child = children[index as number];
    if (isJsxText(child)) {
      rewriteRemarkText(
        child,
        index === 0,
        index === lastIndex,
        children[index - 1],
        children[index + 1],
      );
    } else {
      visits(child);
    }
  }
};

const visitProperties = (record: Record<string, unknown>): void => {
  for (const key in record) {
    if (Object.hasOwn(record, key) && key !== 'children') {
      const value = record[key as keyof typeof record];
      if (value && typeof value === 'object') {
        visits(value);
      }
    }
  }
};

const visits = (node: unknown): void => {
  if (invalid(node)) {
    return;
  }
  // Direct index-based iteration for structural arrays.
  if (Array.isArray(node)) {
    for (let i = 0, len = node.length; i < len; i++) {
      visits(node[i as number]);
    }
    return;
  }
  // Handle nodes with children and other properties.
  const record = node as UnknownNode;
  if (Array.isArray(record.children)) {
    visitChildren(record.children);
  }
  visitProperties(record);
};

export const babelSmartSpace = (): BabelPlugin => ({
  name: 'smart-space',
  visitor: {
    JSXText(path: NodePath): void {
      const children = path.parent.children as unknown[];
      const index = Number(path.key);
      rewriteBabelText(
        path.node as BabelJsxTextNode,
        index === 0,
        index === children.length - 1,
        children[index - 1],
        children[index + 1],
      );
    },
  },
});

export const remarkSmartSpace = (): ((tree: unknown) => void) => visits;
