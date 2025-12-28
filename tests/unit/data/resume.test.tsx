/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { catalog } from '@site/src/data/portfolio';
import {
  catalogMap,
  certifications,
  educations,
  experiences,
  header,
  layout,
  leadership,
  preamble,
  skills,
  storyMap,
  strengths,
  testimonials,
  timelineMap,
} from '@site/src/data/resume';
import { type DocusaurusConfig } from '@docusaurus/types';
import { isValidElement, type ReactElement } from 'react';
import { stories } from '@site/src/data/stories';
import { timelines } from '@site/src/data/timeline';

describe('data.resume', () => {
  describe('catalogMap', () => {
    it('creates a map keyed by prefix', () => {
      expect(catalogMap).toBeDefined();
      expect(typeof catalogMap).toBe('object');

      // Ensure every prefix maps to the correct item.
      catalog.forEach((item) => {
        expect(catalogMap[item.prefix]).toEqual(item);
      });
    });

    it('contains the same number of entries as catalog', () => {
      expect(Object.keys(catalogMap)).toHaveLength(catalog.length);
    });
  });

  describe('certifications', () => {
    it('has a heading with correct structure', () => {
      expect(certifications.heading).toBeDefined();
      expect(certifications.heading.as).toBe('h2');
      expect(certifications.heading.children).toBe('Certifications');
    });

    it('has content array', () => {
      expect(Array.isArray(certifications.content)).toBeTruthy();
      expect(certifications.content).toHaveLength(1);
      const first = certifications.content[0];
      expect(isValidElement(first.achievements)).toBeTruthy();
      expect(first.key).toBe('stanford');
    });
  });

  describe('educations', () => {
    it('has a heading with correct structure', () => {
      expect(educations.heading).toBeDefined();
      expect(educations.heading.as).toBe('h2');
      expect(educations.heading.children).toBe('Education');
    });

    it('has content array', () => {
      expect(Array.isArray(educations.content)).toBeTruthy();
      expect(educations.content).toHaveLength(2);
      const first = educations.content[0];
      expect(isValidElement(first.achievements)).toBeTruthy();
      expect(first.key).toBe('calstate-fullerton');
      const second = educations.content[1];
      expect(second.key).toBe('petra');
      expect(second.achievements).toBeUndefined();
    });
  });

  describe('experiences', () => {
    it('has a heading with correct structure', () => {
      expect(experiences.heading).toBeDefined();
      expect(experiences.heading.as).toBe('h2');
      expect(experiences.heading.children).toBe('Professional Experience');
    });

    it('has content array', () => {
      expect(Array.isArray(experiences.content)).toBeTruthy();
      expect(experiences.content).toHaveLength(5);
      experiences.content.forEach((item) => {
        expect(isValidElement(item.achievements)).toBeTruthy();
        expect(typeof item.key).toBe('string');
        expect(item.key.length).toBeGreaterThan(0);
        expect(Array.isArray(item.summaries)).toBe(true);
        expect(item.summaries.length).toBeGreaterThan(0);
        item.summaries.forEach((sum) => {
          expect(typeof sum.key).toBe('string');
          expect(typeof sum.content).toBe('string');
          expect(sum.content.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('header', () => {
    const mockSiteConfig: Partial<DocusaurusConfig> = {
      themeConfig: {
        navbar: {
          items: [
            { to: '/blog' },
            { to: '/projects' },
            { to: 'https://github.com/me' },
            { to: 'https://linkedin.com/in/me' },
          ],
        },
      },
      title: 'My Site',
      url: 'https://domain.test',
    };

    it('returns an object with contacts, heading, and roles', () => {
      const result = header({ siteConfig: mockSiteConfig as DocusaurusConfig });

      expect(result).toHaveProperty('contacts');
      expect(result).toHaveProperty('heading');
      expect(result).toHaveProperty('roles');

      const { contacts, heading, roles } = result;

      expect(Array.isArray(contacts)).toBeTruthy();
      // Check JSX elements.
      const items = contacts.filter((item) => isValidElement(item));
      expect(items).toHaveLength(4);

      // Check separators.
      const separators = contacts.filter((item) => item === ' • ');
      expect(separators).toHaveLength(3);

      expect(heading.as).toBe('h1');
      expect(isValidElement(heading.children)).toBeTruthy();

      const child = heading.children;
      expect(child.props.href).toBe(mockSiteConfig.url);
      expect(child.props.children).toBe(mockSiteConfig.title);

      const github = contacts.find((item): item is ReactElement<any> => isValidElement(item) && item.key === 'github');
      const linkedin = contacts.find((item): item is ReactElement<any> => isValidElement(item) && item.key === 'linkedin');

      expect(github?.props.href).toBe('https://github.com/me');
      expect(linkedin?.props.href).toBe('https://linkedin.com/in/me');

      expect(roles).toEqual([
        'Principal Engineer',
        ' • ',
        'Senior Software Engineer',
        ' • ',
        'Full-Stack Architect',
      ]);
    });

    it('returns default object with contacts, heading, and roles', () => {
      const result = header({
        siteConfig: {
          ...mockSiteConfig,
          themeConfig: {},
        } as DocusaurusConfig,
      });

      expect(result).toHaveProperty('contacts');
      expect(result).toHaveProperty('heading');
      expect(result).toHaveProperty('roles');

      const { contacts, heading, roles } = result;

      expect(Array.isArray(contacts)).toBeTruthy();
      // Check JSX elements.
      const items = contacts.filter((item) => isValidElement(item));
      expect(items).toHaveLength(4);

      // Check separators.
      const separators = contacts.filter((item) => item === ' • ');
      expect(separators).toHaveLength(3);

      expect(heading.as).toBe('h1');
      expect(isValidElement(heading.children)).toBeTruthy();

      const child = heading.children;
      expect(child.props.href).toBe(mockSiteConfig.url);
      expect(child.props.children).toBe(mockSiteConfig.title);

      const github = contacts.find((item): item is ReactElement<any> => isValidElement(item) && item.key === 'github');
      const linkedin = contacts.find((item): item is ReactElement<any> => isValidElement(item) && item.key === 'linkedin');

      expect(github?.props.href).toBeUndefined();
      expect(linkedin?.props.href).toBeUndefined();

      expect(roles).toEqual([
        'Principal Engineer',
        ' • ',
        'Senior Software Engineer',
        ' • ',
        'Full-Stack Architect',
      ]);
    });
  });

  describe('layout', () => {
    it('contains required metadata fields', () => {
      expect(layout).toHaveProperty('description');
      expect(typeof layout.description).toBe('string');
      expect(layout.description?.length).toBeGreaterThan(0);

      expect(layout).toHaveProperty('keywords');
      expect(Array.isArray(layout.keywords)).toBeTruthy();
      layout.keywords?.forEach((keyword) => {
        expect(typeof keyword).toBe('string');
        expect(keyword.length).toBeGreaterThan(0);
      });

      expect(layout).toHaveProperty('title');
      expect(typeof layout.title).toBe('string');
      expect(layout.title?.length).toBeGreaterThan(0);
    });
  });

  describe('leadership', () => {
    it('has a heading with correct structure', () => {
      expect(leadership.heading).toBeDefined();
      expect(leadership.heading.as).toBe('h2');
      expect(leadership.heading.children).toBe('Leadership Profile');
    });

    it('has children array', () => {
      expect(isValidElement(leadership.children)).toBeTruthy();
      const { children } = leadership;
      expect(children.type).toBe('ul');

      const items = children.props.children;
      expect(Array.isArray(items)).toBeTruthy();
      expect(items).toHaveLength(5);

      items.forEach((li: ReactElement) => {
        expect(isValidElement(li)).toBeTruthy();
        expect(li.type).toBe('li');
      });
    });
  });

  describe('preamble', () => {
    it('has a heading with correct structure', () => {
      expect(preamble.heading).toBeDefined();
      expect(preamble.heading.as).toBe('h2');
      expect(preamble.heading.children).toBe('Professional Summary');
    });

    it('content is a non-empty string', () => {
      expect(typeof preamble.content).toBe('string');
      expect(preamble.content.length).toBeGreaterThan(0);
    });
  });

  describe('skills', () => {
    it('has a heading with correct structure', () => {
      expect(skills.heading).toBeDefined();
      expect(skills.heading.as).toBe('h2');
      expect(skills.heading.children).toBe('Technical Skills');
    });

    it('has children array', () => {
      expect(isValidElement(skills.children)).toBeTruthy();
      const { children } = skills;
      expect(children.type).toBe('ul');

      const items = children.props.children;
      expect(Array.isArray(items)).toBeTruthy();
      expect(items).toHaveLength(9);

      items.forEach((li: ReactElement) => {
        expect(isValidElement(li)).toBeTruthy();
        expect(li.type).toBe('li');
      });
    });
  });

  describe('storyMap', () => {
    it('creates a map keyed by prefix', () => {
      expect(storyMap).toBeDefined();
      expect(typeof storyMap).toBe('object');

      // Ensure every prefix maps to the correct item.
      stories.forEach((item) => {
        expect(storyMap[item.prefix]).toEqual(item);
      });
    });

    it('contains the same number of entries as catalog', () => {
      expect(Object.keys(storyMap)).toHaveLength(stories.length);
    });
  });

  describe('strengths', () => {
    it('has a heading with correct structure', () => {
      expect(strengths.heading).toBeDefined();
      expect(strengths.heading.as).toBe('h2');
      expect(strengths.heading.children).toBe('Core Strengths');
    });

    it('has children array', () => {
      expect(isValidElement(strengths.children)).toBeTruthy();
      const { children } = strengths;
      expect(children.type).toBe('ul');

      const items = children.props.children;
      expect(Array.isArray(items)).toBeTruthy();
      expect(items).toHaveLength(6);

      items.forEach((li: ReactElement) => {
        expect(isValidElement(li)).toBeTruthy();
        expect(li.type).toBe('li');
      });
    });
  });

  describe('testimonials', () => {
    it('has a heading with correct structure', () => {
      expect(testimonials.heading).toBeDefined();
      expect(testimonials.heading.as).toBe('h2');
      expect(testimonials.heading.children).toBe('Testimonials');
    });

    it('content is an array of objects with keys', () => {
      expect(Array.isArray(testimonials.content)).toBeTruthy();
      expect(testimonials.content).toHaveLength(4);

      testimonials.content.forEach((item: { key: string }) => {
        expect(typeof item.key).toBe('string');
        expect(item.key.length).toBeGreaterThan(0);
      });
    });
  });

  describe('timelineMap', () => {
    it('creates a map keyed by prefix', () => {
      expect(timelineMap).toBeDefined();
      expect(typeof timelineMap).toBe('object');

      // Ensure every prefix maps to the correct item.
      timelines.forEach((item) => {
        expect(timelineMap[item.prefix]).toEqual(item);
      });
    });

    it('contains the same number of entries as catalog', () => {
      expect(Object.keys(timelineMap)).toHaveLength(timelines.length);
    });
  });
});
