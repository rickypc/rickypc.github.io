/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { ToolDescriptor, ToolOutcome } from '@site/src/data/model-context';
import { catalog, intro, layout } from '@site/src/data/portfolio';
import Portfolio from '@site/src/pages/portfolio';
import { act, fireEvent, render, screen } from '@testing-library/react';

mock.module('@site/src/data/portfolio', () => ({
  __esModule: true,
  // Deterministic catalog: one item matches Tag1, one does not.
  catalog: [
    { id: 1, tags: ['Tag1', 'Common'], title: 'HasTag1' },
    { id: 2, tags: ['Other', 'Common'], title: 'NoTag1' },
  ],
  intro: { description: 'Preamble Desc', title: 'Preamble Title' },
  layout: { description: 'Portfolio Desc', title: 'Portfolio Title' },
}));

describe('pages.portfolio', () => {
  (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
    siteConfig: { url: 'https://domain.test' },
  });

  test('passes layout props and className token to Layout', () => {
    render(<Portfolio />);
    const layoutEl = screen.getByTestId('layout');
    expect(layoutEl.getAttribute('class')).toContain('portfolio');
    expect(layoutEl.getAttribute('data-description')).toEqual(layout.description as string);
    expect(layoutEl.getAttribute('data-title')).toEqual(layout.title as string);
  });

  test('renders Preamble with expected props', () => {
    render(<Portfolio />);
    const pre = screen.getByTestId('preamble');
    expect(JSON.parse(pre.dataset.intro as string)).toEqual(expect.objectContaining(intro));
  });

  test('initial state: Filter current All, Projects full catalog, Zoom closed', () => {
    render(<Portfolio />);
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(
      String(catalog.length),
    );
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('false');
  });

  test('clicking filter-all invokes default "All" branch and keeps full catalog', () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByTestId('filter-all'));
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toEqual(
      String(catalog.length),
    );
  });

  test('clicking filter-tag invokes filtering branch and reduces Projects', () => {
    render(<Portfolio />);
    fireEvent.click(screen.getByTestId('filter-tag1'));
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('Tag1');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toBe('1');
  });

  test('clicking a project opens Zoom; clicking Zoom closes it', () => {
    render(<Portfolio />);
    // Open.
    fireEvent.click(screen.getByTestId('projects'));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('true');
    // Close.
    fireEvent.click(screen.getByTestId('zoom'));
    expect(screen.getByTestId('zoom').getAttribute('data-open')).toBe('false');
  });
});

describe('pages.portfolio.filter-projects tool', () => {
  const contextMock = () => ({ registerTool: mock(), unregisterTool: mock() });

  const descriptorFrom = (context: ReturnType<typeof contextMock>): ToolDescriptor => {
    const [call] = context.registerTool.mock.calls;
    return (Array.isArray(call) ? call[0] : undefined) as ToolDescriptor;
  };

  const installContext = (context: object) => {
    (globalThis.document as { modelContext?: unknown }).modelContext = context;
  };

  afterEach(() => {
    delete (globalThis.document as { modelContext?: unknown }).modelContext;
  });

  test('registers one filter-projects tool with a loose tag schema', () => {
    const context = contextMock();
    installContext(context);
    render(<Portfolio />);

    expect(context.registerTool).toHaveBeenCalledTimes(1);
    const [descriptor] = context.registerTool.mock.calls[0] as [ToolDescriptor];
    expect(descriptor.name).toBe('filter-projects');
    expect(descriptor.inputSchema?.properties?.tag?.type).toBe('string');
  });

  test('drives the shared filter path and returns the capped payload', async () => {
    const context = contextMock();
    installContext(context);
    render(<Portfolio />);

    let outcome: ToolOutcome = {};
    await act(async () => {
      outcome = (await descriptorFrom(context).execute({ tag: 'Tag1' })) as ToolOutcome;
    });

    expect(outcome).toEqual({
      count: 1,
      projects: [{ tags: ['Tag1', 'Common'], title: 'HasTag1' }],
      tag: 'Tag1',
    });
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('Tag1');
    expect(screen.getByTestId('projects').getAttribute('data-count')).toBe('1');
  });

  test('defaults to the full grid when no tag is given', async () => {
    const context = contextMock();
    installContext(context);
    render(<Portfolio />);

    let outcome: ToolOutcome = {};
    await act(async () => {
      outcome = (await descriptorFrom(context).execute()) as ToolOutcome;
    });

    expect(outcome).toEqual({
      count: 2,
      projects: [
        { tags: ['Tag1', 'Common'], title: 'HasTag1' },
        { tags: ['Other', 'Common'], title: 'NoTag1' },
      ],
      tag: 'All',
    });
    expect(screen.getByTestId('projects').getAttribute('data-count')).toBe('2');
  });

  test('rejects an unknown tag with the allowed enum and no state change', async () => {
    const context = contextMock();
    installContext(context);
    render(<Portfolio />);

    let outcome: ToolOutcome = {};
    await act(async () => {
      outcome = (await descriptorFrom(context).execute({ tag: 'nope' })) as ToolOutcome;
    });

    expect(outcome.error).toMatch(/expects one of: All, Tag1, Common, Other/);
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');
  });

  test('rejects a non-string tag and treats null as the default grid', async () => {
    const context = contextMock();
    installContext(context);
    render(<Portfolio />);

    for (const requested of [42, true, {}]) {
      let outcome: ToolOutcome = {};
      await act(async () => {
        outcome = (await descriptorFrom(context).execute({ tag: requested })) as ToolOutcome;
      });
      expect(outcome.error).toMatch(/expects one of: All, Tag1, Common, Other/);
    }
    expect(screen.getByTestId('filter').getAttribute('data-current')).toBe('All');

    let outcome: ToolOutcome = {};
    await act(async () => {
      outcome = (await descriptorFrom(context).execute({ tag: null })) as ToolOutcome;
    });
    expect(outcome.tag).toBe('All');
    expect(outcome.count).toBe(2);
  });

  test('unregisters the tool on unmount', () => {
    const context = contextMock();
    installContext(context);
    const view = render(<Portfolio />);
    view.unmount();

    expect(context.unregisterTool).toHaveBeenCalledWith('filter-projects');
  });
});
