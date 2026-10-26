/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

/**
 * Injects the <Metadata /> component into every routed docs page at compile time.
 *
 * The reading-time badge and the page's JSON-LD <script> used to live in a manual <Metadata /> tag
 * at the top of each MDX body. This remark attacher restores that exact in-flow position
 * automatically, so the badge renders under the page title like the manual tag did:
 *
 * - When the body opens with its own level-1 heading (the page renders that heading as its title),
 *   the component is inserted directly after it. The Docusaurus contentTitle plugin wraps that
 *   heading in a <header> JSX element before user plugins run, so both the bare heading and the
 *   wrapped header count as the title node.
 * - Otherwise the theme renders the front matter title above the body, and the component is
 *   inserted after the leading front matter and import block (or at the very top when no such
 *   prefix exists).
 *
 * Only the LEADING yaml/mdxjsEsm prefix is treated as the import block: the Docusaurus pipeline
 * appends its own ESM exports (for example the table of contents) to the END of the tree, so
 * inserting after the last mdxjsEsm node would push the component to the bottom of the page.
 *
 * Underscore-prefixed partials are skipped, and a page that already carries a root-level
 * <Metadata /> is left untouched, so manual and automatic injection never duplicate.
 */

type MdxJsxFlowElementNode = {
  type: 'mdxJsxFlowElement';
  name: string;
  attributes: unknown[];
  children: unknown[];
};

type RootChildNode = {
  type: string;
  depth?: number;
  name?: string;
};

type RootNode = {
  children: RootChildNode[];
};

type VFileLike = {
  basename?: string;
  path?: string;
};

const badgeNode = (): MdxJsxFlowElementNode => ({
  attributes: [],
  children: [],
  name: 'Metadata',
  type: 'mdxJsxFlowElement',
});

const hasManualBadge = (root: RootNode): boolean =>
  root.children.some((child) => child.type === 'mdxJsxFlowElement' && child.name === 'Metadata');

const isPartial = (file: VFileLike): boolean =>
  (file.basename ?? file.path?.split('/').pop() ?? '').startsWith('_');

const isPrefixNode = (child: RootChildNode): boolean =>
  child.type === 'yaml' || child.type === 'mdxjsEsm';

const isTitleNode = (child: RootChildNode): boolean =>
  (child.type === 'heading' && child.depth === 1)
  || (child.type === 'mdxJsxFlowElement' && child.name === 'header');

/**
 * Remark attacher that inserts a `<Metadata />` element into each routed docs page.
 * @returns {ReturnType} The remark transformer performing the insertion (see the module header for
 *   the position rules and the pipeline gotchas it accounts for).
 */
export function remarkMetadata() {
  return (root: RootNode, file: VFileLike) => {
    if (isPartial(file) || hasManualBadge(root)) {
      return;
    }
    const children = root.children;
    const contentStart = children.findIndex((child) => !isPrefixNode(child));
    const insertAt =
      contentStart === -1
        ? children.length
        : isTitleNode(children[contentStart as number] as RootChildNode)
          ? contentStart + 1
          : contentStart;
    children.splice(insertAt, 0, badgeNode());
  };
}
