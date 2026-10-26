/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { mock } from 'bun:test';
import { usePluralForm } from '@docusaurus/theme-common';
import { profilePageNode } from '@site/src/data/common';
import { useWelcome } from '@site/src/hooks/observer';
import { render, screen } from '@testing-library/react';
import DocTagDocListPageWrapper from '@theme/DocTagDocListPage';
import DocTagDocListPage from '@theme-original/DocTagDocListPage';

const personNode = { '@id': 'https://ricky.one#Person', '@type': 'Person' };

mock.module('@site/src/data/common', () => ({
  graphFor: mock((nodes: Record<string, unknown>[]) =>
    JSON.stringify({ '@context': 'test', '@graph': nodes }),
  ),
  PERSON_NODE: personNode,
  profilePageNode: mock((metadata: Record<string, unknown>) => ({ ld: 'node', metadata })),
}));

// biome-ignore lint/security/noSecrets: -
describe('theme.DocTagDocListPage', () => {
  // biome-ignore lint/security/noSecrets: -
  test('injects meta tags, calls useWelcome, and forwards props to original DocTagDocListPage', () => {
    const props = {
      extra: 'value',
      tag: {
        allTagsPath: '/tags',
        count: 1,
        description: 'mindfulness something',
        items: [],
        label: 'mindfulness',
        permalink: '/tags/mindfulness',
        unlisted: false,
      },
    };

    render(<DocTagDocListPageWrapper {...props} />);

    expect(usePluralForm).toHaveBeenCalled();

    expect(profilePageNode).toHaveBeenCalledTimes(1);
    expect(profilePageNode).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        description: expect.stringContaining(props.tag.label),
        keywords: expect.arrayContaining(['mindfulness']),
        title: 'translated:theme.docs.tagDocListPageTitle:{nDocsTagged} with "{tagName}"',
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
            description: expect.stringContaining(props.tag.label),
            keywords: expect.arrayContaining(['mindfulness']),
            title: 'translated:theme.docs.tagDocListPageTitle:{nDocsTagged} with "{tagName}"',
          }),
        },
        personNode,
      ],
    });

    const { head } = document;
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      expect.stringContaining(props.tag.label),
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      'translated:theme.docs.tagDocListPageTitle:{nDocsTagged} with "{tagName}"',
    );

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    expect(DocTagDocListPage).toHaveBeenCalledTimes(1);
    expect(DocTagDocListPage).toHaveBeenNthCalledWith(1, expect.objectContaining(props), undefined);

    const list = screen.getByTestId('doc-tag-doc-list-page');
    expect(list).toBeInTheDocument();
    expect(list.textContent).toContain('"extra":"value"');
    expect(list.textContent).toContain('"label":"mindfulness"');
  });
});
