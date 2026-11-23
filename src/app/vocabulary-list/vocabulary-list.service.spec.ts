import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { VocabularyListService } from './vocabulary-list.service';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('VocabularyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: VocabularyListService = TestBed.inject(VocabularyListService);
    expect(service).toBeTruthy();
  });
  afterEach(() => TestBed.inject(HttpTestingController).verify());

  const query = {
    project: 'etLex', word: 'õun & pirn #1 + 50%?', levels: ['A1', 'B2'],
    partsOfSpeech: ['S', 'V'], theme: 'elu & töö', page: 2, pageSize: 20,
    sort: 'lemma', direction: '' as const
  };

  it('encodes search values and preserves repeated filters and cleared sorting', () => {
    TestBed.inject(VocabularyListService).getTableData(query).subscribe();
    const request = TestBed.inject(HttpTestingController).expectOne(req => req.url.endsWith('/projects/etLex/lemmas'));
    const params = new URL(request.request.urlWithParams, 'https://example.test').searchParams;
    expect(params.get('word')).toBe(query.word);
    expect(params.get('themes')).toBe(query.theme);
    expect(params.getAll('level')).toEqual(['A1', 'B2']);
    expect(params.getAll('pos')).toEqual(['S', 'V']);
    expect(params.get('direction')).toBe('');
    request.flush({ items: [] });
  });

  it('exports filters without pagination or sorting', () => {
    const url = TestBed.inject(VocabularyListService).getExportUrl(query, 'xlsx');
    const params = new URL(url, 'https://example.test').searchParams;
    expect(params.get('word')).toBe(query.word);
    expect(params.get('themes')).toBe(query.theme);
    expect(params.getAll('level')).toEqual(['A1', 'B2']);
    expect(params.getAll('pos')).toEqual(['S', 'V']);
    expect(params.get('format')).toBe('xlsx');
    for (const key of ['limit', 'offset', 'sort', 'direction']) {
      expect(params.has(key)).toBeFalse();
    }
  });

  it('omits optional filters when absent', () => {
    TestBed.inject(VocabularyListService).getTableData({ project: 'noor', page: 1, pageSize: 20 }).subscribe();
    const request = TestBed.inject(HttpTestingController).expectOne(req => req.url.endsWith('/projects/noor/lemmas'));
    expect(request.request.params.keys().sort()).toEqual(['limit', 'offset']);
    request.flush({ items: [] });
  });

});
