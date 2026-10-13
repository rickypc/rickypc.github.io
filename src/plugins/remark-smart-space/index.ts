/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/**
 * Applies HTML whitespace semantics to MDX JSX text without changing the rendered corpus layout.
 * Stock JSX deletes a whitespace run containing a newline at text boundaries, gluing wrapped
 * source text ("from⏎<Link>" becomes "fromLink"), while the corpus relies on that deletion for
 * tight typography ("</Link>⏎, then" must not gain a space before the comma).
 *
 * For every JSXText whitespace run that contains a newline:
 * - A boundary run (first/last child) next to the parent's own tags collapses away completely,
 *   matching stock JSX behavior to keep content tight inside its element.
 * - An interior run collapses down to a single space, exactly like stock JSX.
 * - A trailing run keeps one space when an inline element follows, whether the preceding text
 *   ends in a word or in punctuation, so a deleted entity anchor relies on the line break for
 *   that space. It retains stock deletion beside a block element, when it is the last child, or
 *   when it ends in a non-breaking space.
 * - A leading run keeps one space when the text opens with a word or an opening bracket. Other
 *   punctuation binds tight to the previous element, preserving corpus typography.
 * - A whitespace-only text node between two inline elements becomes one space; beside anything
 *   else, it preserves stock JSX deletion behavior.
 */

type JsxTextNode = UnknownNode & TextNode;

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
const NBSP = '\u00a0';
const RUN = /[ \t\r]*\n[ \t\n\r]*/g;
// Hoist regex to prevent recompilation during deep traversals.
const WORD_CHAR_REGEXP = /\p{L}|\p{N}/u;

const invalid = (node: unknown) => !node || typeof node !== 'object';

const isInlineElement = (node: unknown): boolean => {
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

const runToSpace = (
  value: string,
  run: string,
  offset: number,
  first: boolean,
  last: boolean,
  nextNode: unknown,
): string => {
  if (offset === 0) {
    const next = value[run.length];
    return !first && (isWord(next) || isOpening(next)) ? ' ' : '';
  }
  if (offset + run.length === value.length) {
    const prev = value[offset - 1];
    // Requires the following sibling to be inline, whether the text ends in a word or in
    // punctuation, so a deleted entity anchor can rely on the line break for the space.
    const keep = isInlineElement(nextNode);
    return !last && prev !== NBSP && keep ? ' ' : '';
  }
  return ' ';
};

// After runToSpace assignment.
const normalize = (value: string, first: boolean, last: boolean, nextNode: unknown): string =>
  value.replace(RUN, (run: string, offset: number): string =>
    runToSpace(value, run, offset, first, last, nextNode),
  );

const setValue = (node: JsxTextNode, value: string): void => {
  node.value = value;
  if (typeof node.raw === 'string') {
    node.raw = value;
  }
};

// After setValue assignment.
const rewriteJsxText = (
  node: JsxTextNode,
  first: boolean,
  last: boolean,
  prev: unknown,
  next: unknown,
): void => {
  // Simple string check before calling expensive regex testing.
  if (!node.value.includes('\n')) {
    return;
  }
  if (!/[^ \t\n\r]/.test(node.value)) {
    if (!first && !last && isInlineElement(prev) && isInlineElement(next)) {
      setValue(node, ' ');
    }
    return;
  }
  const normalized = normalize(node.value, first, last, next);
  if (normalized !== node.value) {
    setValue(node, normalized);
  }
};

const visitChildren = (children: unknown[]): void => {
  for (let index = 0, lastIndex = children.length - 1; index <= lastIndex; index += 1) {
    const child = children[index as number];
    if (isJsxText(child)) {
      rewriteJsxText(
        child,
        index === 0,
        index === lastIndex,
        children[index - 1],
        children[index + 1],
      );
    } else {
      visit(child);
    }
  }
};

const visitProperties = (record: Record<string, unknown>): void => {
  for (const key in record) {
    if (Object.hasOwn(record, key) && key !== 'children') {
      const value = record[key as keyof typeof record];
      if (value && typeof value === 'object') {
        visit(value);
      }
    }
  }
};

// After visitProperties assignment.
const visit = (node: unknown): void => {
  if (invalid(node)) {
    return;
  }
  // Direct index-based iteration for structural arrays.
  if (Array.isArray(node)) {
    for (let i = 0, len = node.length; i < len; i++) {
      visit(node[i as number]);
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

export default (): ((tree: unknown) => void) => visit;
