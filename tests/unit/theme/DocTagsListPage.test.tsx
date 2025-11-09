/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { context } from '@site/src/data/common';
import DocTagsListPage from '@theme-original/DocTagsListPage';
import DocTagsListPageWrapper from '@theme/DocTagsListPage';
import { translateTagsPageTitle } from '@docusaurus/theme-common';
import { useWelcome } from '@site/src/hooks/observer';

jest.mock('@site/src/data/common', () => ({
  context: jest.fn((metadata: {}) => JSON.stringify({ ld: 'test', meta: metadata })),
}));

describe('theme.DocTagsListPage', () => {
  it('injects meta tags, calls useWelcome, and forwards props to original DocTagsListPage', () => {
    const description = expect.stringContaining('Practical notes on Buddhism');
    const props = { someProp: 'value', tags: [] };

    render(<DocTagsListPageWrapper {...props} />);

    expect(translateTagsPageTitle).toHaveBeenCalled();

    expect(context).toHaveBeenCalledTimes(1);
    expect(context).toHaveBeenNthCalledWith(1, expect.objectContaining({
      description: expect.stringContaining('Practical notes on Buddhism'),
      keywords: expect.arrayContaining(['mindfulness']),
      title: 'Tags',
    }));

    const script = screen.getByTestId('metadata')
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(JSON.parse(script?.textContent || '{}')).toEqual({
      ld: 'test',
      meta: expect.objectContaining({
        description,
        keywords: expect.arrayContaining(['mindfulness']),
        title: 'Tags',
      }),
    });

    const { head } = document;
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:description"]'))
      .toHaveAttribute('content', description);
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:title"]'))
      .toHaveAttribute('content', 'Tags');

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    expect(DocTagsListPage).toHaveBeenCalledTimes(1);
    expect(DocTagsListPage)
      .toHaveBeenNthCalledWith(1, expect.objectContaining(props), undefined);

    const list = screen.getByTestId('doc-tags-list-page');
    expect(list).toBeInTheDocument();
    expect(list.textContent).toContain('"someProp":"value"');
  });
});
