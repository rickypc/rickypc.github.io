/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { faqItems as aboutFaq } from '@site/src/data/about';
import { faqItems as homeFaq } from '@site/src/data/home';
import { faqItems as portfolioFaq } from '@site/src/data/portfolio';
import { faqItems as resumeFaq } from '@site/src/data/resume';
import { faqItems as storiesFaq } from '@site/src/data/stories';
import { textContent } from '@site/src/data/common';
import { faqItems as timelineFaq } from '@site/src/data/timeline';

describe('data.faq cross-page', () => {
  test('every Question.name is unique across all six pages', () => {
    const all = [
      ...homeFaq,
      ...aboutFaq,
      ...portfolioFaq,
      ...resumeFaq,
      ...storiesFaq,
      ...timelineFaq,
    ];
    const names = all.map((entry) => textContent(entry.question).trim());
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    expect(duplicates).toEqual([]);
  });

  test('each page FAQ count is at least 5', () => {
    [
      aboutFaq, homeFaq, portfolioFaq, resumeFaq, storiesFaq, timelineFaq,
    ].forEach((items) => {
      expect(items.length).toBeGreaterThanOrEqual(5);
    });
  });
});
