/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { context } from '@site/src/data/common';
import DocCategoryGeneratedIndexPage from '@theme-original/DocCategoryGeneratedIndexPage';
import DocCategoryGeneratedIndexPageWrapper from '@theme/DocCategoryGeneratedIndexPage';
import { useWelcome } from '@site/src/hooks/observer';

jest.mock('@site/src/data/common', () => ({
  context: jest.fn((props: {}) => JSON.stringify({ ld: 'test', props })),
}));

describe('theme.DocCategoryGeneratedIndexPage', () => {
  it('injects meta tags, calls useWelcome, and forwards props to original DocCategoryGeneratedIndexPage', () => {
    const props = {
      categoryGeneratedIndex: {
        description: 'Category description here.',
        keywords: ['mindfulness'],
        navigation: {},
        permalink: '/category/mindfulness',
        slug: '/category/mindfulness',
        title: 'Category Title',
      },
    };

    render(<DocCategoryGeneratedIndexPageWrapper {...props} />);

    expect(context).toHaveBeenCalledTimes(1);
    expect(context).toHaveBeenNthCalledWith(1, expect.objectContaining({
      description: props.categoryGeneratedIndex.description,
      keywords: props.categoryGeneratedIndex.keywords,
      title: props.categoryGeneratedIndex.title,
    }));

    const script = screen.getByTestId('metadata')
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(JSON.parse(script?.textContent || '{}')).toEqual({
      ld: 'test',
      props: expect.objectContaining({
        description: props.categoryGeneratedIndex.description,
        keywords: props.categoryGeneratedIndex.keywords,
        title: props.categoryGeneratedIndex.title,
      }),
    });

    const { head } = document;
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:description"]'))
      .toHaveAttribute('content', props.categoryGeneratedIndex.description);
    // eslint-disable-next-line testing-library/no-node-access
    expect(head.querySelector('meta[name="twitter:title"]'))
      .toHaveAttribute('content', props.categoryGeneratedIndex.title);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    expect(DocCategoryGeneratedIndexPage).toHaveBeenCalledTimes(1);
    expect(DocCategoryGeneratedIndexPage)
      .toHaveBeenNthCalledWith(1, expect.objectContaining(props), undefined);

    const list = screen.getByTestId('doc-category-generated-index-page');
    expect(list).toBeInTheDocument();
    expect(list.textContent).toContain('"slug":"/category/mindfulness"');
    expect(list.textContent).toContain('"title":"Category Title"');
  });
});
