/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import consecration from '#buddhism/rituals-ceremonies/_consecration_statue_stupa';
import { header, phrase, phrases } from '#buddhism/media/_common';

jest.mock('#buddhism/media/_common', () => ({
  header: jest.fn((title, note) => ({ mockedHeader: true, note, title })),
  main: jest.fn((a, b, n) => [{
    a, b, mockedMain: true, n,
  }]),
  phrase: jest.fn((path, note, n) => [{
    mockedPhrase: true, n, note, path,
  }]),
  phrases: jest.fn(() => ['P1', 'P2', 'P3']),
}));

const headerCalls = [...jest.mocked(header).mock.calls];
const phraseCalls = [...jest.mocked(phrase).mock.calls];
const phrasesCalls = [...jest.mocked(phrases).mock.calls];

describe('docs.buddhism.rituals-ceremonies._consecration_statue_stupa', () => {
  test('exports the correct top-level structure', () => {
    expect(consecration).toHaveProperty('pages');
    expect(consecration).toHaveProperty('path');
    expect(consecration).toHaveProperty('title');

    expect(Array.isArray(consecration.pages)).toBeTruthy();
    expect(consecration.title).toBe('Buddha Statue/Stupa/Sculpture Consecration');
  });

  test('calls phrases() once for pratityasamutpadaSamudayaNirodha', () => {
    expect(phrasesCalls).toHaveLength(1);
    expect(phrasesCalls[0]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_pratityasamutpada_samudaya_nirodha.ts',
    ]);
  });

  test('second page uses phrase() correctly for both columns', () => {
    const page = consecration.pages[1] as any;

    expect(page.chapters).toEqual(['Maṅgala', 'Abhiṣeka']);
    expect(page.number).toBe('3');

    expect(phraseCalls[0]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_mala.ts',
      ' (recite the prayer, gently blow on the mālā and rub it lightly)',
    ]);
    expect(phraseCalls[1]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_japa.ts',
    ]);
    expect(phraseCalls[2]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_dharma.ts',
    ]);
    expect(phraseCalls[3]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_namaskara.ts',
    ]);

    expect(phraseCalls[4]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_saranagamana_cittotpada.ts',
    ]);
    expect(phraseCalls[5]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_catvary_apramanani.ts',
    ]);
    expect(phraseCalls[6]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_prajna_paramita.ts',
      '',
      7,
    ]);
    expect(phraseCalls[7]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_sunyata.ts',
    ]);
  });

  test('third page uses phrases() result correctly', () => {
    const page = consecration.pages[2] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    // contents: [pratityasamutpadaSamudayaNirodha[1]] -> ['P2']
    expect(page.contents).toEqual(['P2']);
    expect(page.number).toBe('5');
  });

  test('fourth page uses phrase() for both columns', () => {
    const page = consecration.pages[3] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('6');

    expect(phraseCalls[8]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_anekajati.ts',
    ]);
    expect(phraseCalls[9]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_pratityasamutpada.ts',
    ]);

    expect(phraseCalls[10]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_vairocana_sarvakata_danavidhih.ts',
    ]);
    expect(phraseCalls[11]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_ratnadhvaja_parikrama.ts',
    ]);
    expect(phraseCalls[12]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_vimala_usnisa.ts',
    ]);
  });

  test('fifth page uses header() and phrase-set blocks', () => {
    const page = consecration.pages[4] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('4');

    expect(headerCalls[0]).toEqual(['Āhvāna [Invitation]']);
  });

  test('sixth page uses main() and header()', () => {
    const page = consecration.pages[6] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('7');
    expect(phraseCalls[13]).toEqual([
      '#buddhism/practical-daily-practice/phrases/_caksu_unmilana.ts',
      '',
      3,
      'Cakṣu Unmīlana [Eye-Opening]',
    ]);
  });

  test('last major page uses main() and header()', () => {
    const page = consecration.pages[11] as any;

    expect(page.chapters).toEqual(['Abhiṣeka']);
    expect(page.number).toBe('8');
    expect(phraseCalls.at(-1)).toEqual([
      '#buddhism/practical-daily-practice/phrases/_prarthanasiddhih.ts',
      '',
      0,
      'Prārthanāsiddhiḥ [Fulfillment of Aspiration]',
    ]);
  });
});
