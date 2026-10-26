/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { translateTagsPageTitle } from '@docusaurus/theme-common';
import { profilePageNode } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import { render, screen } from '@testing-library/react';
import DocTagsListPageWrapper from '@theme/DocTagsListPage';
import DocTagsListPage from '@theme-original/DocTagsListPage';

const personNode = { '@id': 'https://ricky.one#Person', '@type': 'Person' };

mock.module('@site/src/data/common', () => ({
  graphFor: mock((nodes: Record<string, unknown>[]) =>
    JSON.stringify({ '@context': 'test', '@graph': nodes }),
  ),
  PERSON_NODE: personNode,
  profilePageNode: mock((metadata: Record<string, unknown>) => ({ ld: 'node', metadata })),
}));

// biome-ignore lint/security/noSecrets: -
describe('theme.DocTagsListPage', () => {
  // biome-ignore lint/security/noSecrets: -
  test('injects meta tags, calls useWelcome, and forwards props to original DocTagsListPage', () => {
    const description = expect.stringContaining('Practical notes on Buddhism');
    const props = { someProp: 'value', tags: [] };

    render(<DocTagsListPageWrapper {...props} />);

    expect(translateTagsPageTitle).toHaveBeenCalled();

    expect(profilePageNode).toHaveBeenCalledTimes(1);
    expect(profilePageNode).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        description: expect.stringContaining('Practical notes on Buddhism'),
        keywords: expect.arrayContaining(['mindfulness']),
        title: 'Tags',
      }),
    );

    const script = screen
      .getByTestId('metadata')
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(JSON.parse(script?.textContent || '{}')).toEqual({
      '@context': 'test',
      '@graph': [
        {
          ld: 'node',
          metadata: expect.objectContaining({
            description,
            keywords: expect.arrayContaining(['mindfulness']),
            title: 'Tags',
          }),
        },
        personNode,
      ],
    });

    const { head } = document;
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      description,
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:title"]')).toHaveAttribute('content', 'Tags');

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    expect(DocTagsListPage).toHaveBeenCalledTimes(1);
    expect(DocTagsListPage).toHaveBeenNthCalledWith(1, expect.objectContaining(props), undefined);

    const list = screen.getByTestId('doc-tags-list-page');
    expect(list).toBeInTheDocument();
    expect(list.textContent).toContain('"someProp":"value"');
  });
});
