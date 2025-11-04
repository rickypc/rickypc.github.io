/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { context } from '@site/src/data/common';
import DocTagDocListPage from '@theme-original/DocTagDocListPage';
import DocTagDocListPageWrapper from '@theme/DocTagDocListPage';
import { usePluralForm } from '@docusaurus/theme-common';
import { useWelcome } from '@site/src/hooks/observer';

jest.mock('@site/src/data/common', () => ({
  context: jest.fn((metadata: {}) => JSON.stringify({ ld: 'test', meta: metadata })),
}));

describe('theme.DocTagDocListPage', () => {
  it('injects meta tags, calls useWelcome, and forwards props to original DocTagDocListPage', () => {
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

    expect(context).toHaveBeenCalledTimes(1);
    expect(context).toHaveBeenNthCalledWith(1, expect.objectContaining({
      description: expect.stringContaining(props.tag.label),
      keywords: expect.arrayContaining(['mindfulness']),
      title: 'translated:theme.docs.tagDocListPageTitle:{nDocsTagged} with "{tagName}"',
    }));

    const script = screen.getByTestId('metadata')
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(JSON.parse(script?.textContent || '{}')).toEqual({
      ld: 'test',
      meta: expect.objectContaining({
        description: expect.stringContaining(props.tag.label),
        keywords: expect.arrayContaining(['mindfulness']),
        title: 'translated:theme.docs.tagDocListPageTitle:{nDocsTagged} with "{tagName}"',
      }),
    });

    const { head } = document;
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:description"]'))
      .toHaveAttribute('content', expect.stringContaining(props.tag.label));
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:title"]'))
      .toHaveAttribute(
        'content',
        'translated:theme.docs.tagDocListPageTitle:{nDocsTagged} with "{tagName}"',
      );

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    expect(DocTagDocListPage).toHaveBeenCalledTimes(1);
    expect(DocTagDocListPage)
      .toHaveBeenNthCalledWith(1, expect.objectContaining(props), undefined);

    const list = screen.getByTestId('doc-tag-doc-list-page');
    expect(list).toBeInTheDocument();
    expect(list.textContent).toContain('"extra":"value"');
    expect(list.textContent).toContain('"label":"mindfulness"');
  });
});
