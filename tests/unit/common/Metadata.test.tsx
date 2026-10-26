/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { DocProvider, useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Metadata from '@site/src/components/common/Metadata';
import { usePrint, useReadingTime, useWelcome } from '@site/src/hooks/observer';
import { render } from '@testing-library/react';
import type { ComponentProps, ReactNode } from 'react';

const docContent = {
  frontMatter: { keywords: ['buddhism', 'karma'] },
  metadata: {
    description: 'Doc description.',
    permalink: '/docs/buddhism/x/y/',
    title: 'Doc Title',
  },
} as unknown as ComponentProps<typeof DocProvider>['content'];
const jsonLdScripts = () =>
  // eslint-disable-next-line testing-library/no-node-access
  document.querySelectorAll('script[type="application/ld+json"]');
const renderInDocContext = (ui: ReactNode) =>
  render(<DocProvider content={docContent}>{ui}</DocProvider>);
const usePrintMock = usePrint as Mocked<typeof usePrint>;
const useReadingTimeMock = useReadingTime as Mocked<typeof useReadingTime>;
const usePluginDataMock = usePluginData as Mocked<typeof usePluginData>;

describe('Welcome', () => {
  test('calls useWelcome with navigation=false by default', () => {
    usePrintMock.mockReturnValue([false]);
    useReadingTimeMock.mockReturnValue([10.123456789]);
    renderInDocContext(<Metadata />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });
  });

  test('calls useWelcome with navigation=true when prop is true', () => {
    usePrintMock.mockReturnValue([false]);
    useReadingTimeMock.mockReturnValue([0]);
    renderInDocContext(<Metadata navigation />);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: true });
  });

  test('expands details when printing=true and restores when printing=false', async () => {
    // Create mock <details> elements with a child <div>.
    const details1 = document.createElement('details');
    const div1 = document.createElement('div');
    details1.appendChild(div1);
    // Initially closed.
    details1.open = false;
    document.body.appendChild(details1);

    const details2 = document.createElement('details');
    const div2 = document.createElement('div');
    details2.appendChild(div2);
    // Initially open.
    details2.open = true;
    document.body.appendChild(details2);

    // First render with printing=true.
    usePrintMock.mockReturnValue([true]);
    const { rerender } = renderInDocContext(<Metadata />);

    // Both details should be forced open and styled.
    expect(details1.open).toBeTruthy();
    expect(details1.dataset.collapsed).toBe('false');
    expect(div1.style.display).toBe('block');
    expect(div1.style.height).toBe('auto');
    expect(div1.style.overflow).toBe('visible');

    expect(details2.open).toBeTruthy();
    expect(details2.dataset.collapsed).toBe('false');
    expect(div2.style.display).toBe('block');
    expect(div2.style.height).toBe('auto');
    expect(div2.style.overflow).toBe('visible');

    // Re-render with printing=false.
    usePrintMock.mockReturnValue([false]);
    // Changing props to trigger the rerender correctly.
    rerender(
      <DocProvider content={docContent}>
        <Metadata navigation />
      </DocProvider>,
    );

    // details1 was originally closed, so it should be collapsed again.
    expect(details1.open).toBeFalsy();
    expect(details1.dataset.collapsed).toBe('true');
    expect(div1.style.display).toBe('none');
    expect(div1.style.height).toBe('0px');
    expect(div1.style.overflow).toBe('hidden');

    // details2 was originally open, so it should remain open.
    expect(details2.open).toBeTruthy();
    expect(details2.dataset.collapsed).not.toBe('true');
  });
});

describe('Metadata.jsonLd', () => {
  test('emits one script whose graph carries BlogPosting and exactly one Person node', () => {
    usePrintMock.mockReturnValue([false]);
    useReadingTimeMock.mockReturnValue([0]);
    (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
      siteConfig: { url: 'https://ricky.one' },
    });
    usePluginDataMock.mockReturnValue({
      dates: {
        '/docs/buddhism/x/y/': {
          dateModified: '2026-10-01T00:00:00.000Z',
          datePublished: '2025-06-01T00:00:00.000Z',
        },
      },
    });

    renderInDocContext(<Metadata />);

    const scripts = jsonLdScripts();
    expect(scripts).toHaveLength(1);
    const { '@graph': graph } = JSON.parse(scripts[0]?.textContent ?? '{}');
    expect(graph).toHaveLength(2);
    expect(graph[0]).toEqual({
      '@id': 'https://ricky.one/docs/buddhism/x/y/#article',
      '@type': 'BlogPosting',
      author: { '@id': 'https://ricky.one#Person' },
      dateModified: '2026-10-01T00:00:00.000Z',
      datePublished: '2025-06-01T00:00:00.000Z',
      description: 'Doc description.',
      headline: 'Doc Title',
      image: 'https://ricky.one/img/self.png',
      inLanguage: 'en-US',
      keywords: 'buddhism,karma',
      mainEntityOfPage: { '@id': 'https://ricky.one/docs/buddhism/x/y/', '@type': 'WebPage' },
      name: 'Doc Title',
      publisher: { '@id': 'https://ricky.one#Person' },
      url: 'https://ricky.one/docs/buddhism/x/y/',
    });
    expect(graph[1]).toMatchObject({
      '@id': 'https://ricky.one#Person',
      '@type': 'Person',
      name: 'Ricky Huang',
    });
  });

  test('omits the BlogPosting node without plugin dates', () => {
    usePrintMock.mockReturnValue([false]);
    useReadingTimeMock.mockReturnValue([0]);
    (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
      siteConfig: { url: 'https://ricky.one' },
    });
    usePluginDataMock.mockReturnValue({ dates: {} });

    renderInDocContext(<Metadata />);

    const scripts = jsonLdScripts();
    expect(scripts).toHaveLength(1);
    const { '@graph': graph } = JSON.parse(scripts[0]?.textContent ?? '{}');
    expect(graph).toHaveLength(1);
    expect(graph[0]['@type']).toBe('Person');
  });

  test('leads the graph with the BreadcrumbList member when sidebar breadcrumbs exist', () => {
    usePrintMock.mockReturnValue([false]);
    useReadingTimeMock.mockReturnValue([0]);
    (useDocusaurusContext as Mocked<typeof useDocusaurusContext>).mockReturnValue({
      siteConfig: { url: 'https://ricky.one' },
    });
    usePluginDataMock.mockReturnValue({ dates: {} });
    (useSidebarBreadcrumbs as Mocked<typeof useSidebarBreadcrumbs>).mockReturnValue([
      { href: '/docs/category/buddhism', label: 'Buddhism' },
      { href: '/docs/buddhism/x/y/', label: 'Doc Title' },
    ]);

    renderInDocContext(<Metadata />);

    const scripts = jsonLdScripts();
    expect(scripts).toHaveLength(1);
    const { '@graph': graph } = JSON.parse(scripts[0]?.textContent ?? '{}');
    expect(graph.map((node: { '@type': string }) => node['@type'])).toEqual([
      'BreadcrumbList',
      'Person',
    ]);
    expect(graph[0].itemListElement).toEqual([
      {
        '@type': 'ListItem',
        item: 'https://ricky.one/docs/category/buddhism',
        name: 'Buddhism',
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: 'https://ricky.one/docs/buddhism/x/y/',
        name: 'Doc Title',
        position: 2,
      },
    ]);
  });

  test('renders the script regardless of the navigation prop and keeps the badge hidden', () => {
    usePrintMock.mockReturnValue([false]);
    useReadingTimeMock.mockReturnValue([10.123456789]);

    renderInDocContext(<Metadata navigation />);

    expect(jsonLdScripts()).toHaveLength(1);
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('small')).toBeNull();
  });
});
