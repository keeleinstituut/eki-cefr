import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GrammarService } from '../../grammar/grammar.service';
import { UsecaseService } from '../../usecase/usecase.service';
import { VocabularyListService } from '../../vocabulary-list/vocabulary-list.service';
import { pagingParams } from './paging-query';

describe('Paging parameters', () => {
  it('uses one-based offsets', () => {
    expect(pagingParams({ page: 1, pageSize: 20 }).get('offset')).toBe('1');
    expect(pagingParams({ page: 3, pageSize: 20 }).get('offset')).toBe('41');
    expect(pagingParams({ page: 2, pageSize: 50 }).get('offset')).toBe('51');
    expect(pagingParams({ page: 2, pageSize: 50 }).get('limit')).toBe('50');
  });

  it('normalizes invalid page numbers', () => {
    for (const page of [0, -1, NaN, Infinity]) {
      expect(pagingParams({ page, pageSize: 20 }).get('offset')).toBe('1');
    }
    expect(pagingParams({ page: 2.5, pageSize: 20 }).get('offset')).toBe('21');
  });

  describe('search requests', () => {
    beforeEach(() => TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }));

    afterEach(() => TestBed.inject(HttpTestingController).verify());

    for (const feature of ['grammar', 'usecase', 'vocabulary']) {
      it(`adds paging once while retaining ${feature} filters and sorting`, () => {
        const paging = { page: 3, pageSize: 20 };
        const sort = '&sort=level';
        const direction = '&direction=asc';
        if (feature === 'grammar') {
          TestBed.inject(GrammarService).getTableData('etLex', '[]', '&level=A1', paging, sort, direction).subscribe();
        } else if (feature === 'usecase') {
          TestBed.inject(UsecaseService).getTableData('[]', '&level=A1', paging, sort, direction).subscribe();
        } else {
          TestBed.inject(VocabularyListService).getTableData('&word=test', 'etLex', paging, sort, direction,
            '&level=A1', '&pos=S', '&themes=test').subscribe();
        }
        const request = TestBed.inject(HttpTestingController).expectOne(() => true);
        const params = new URL(request.request.urlWithParams, 'https://example.test').searchParams;
        expect(params.getAll('limit')).toEqual(['20']);
        expect(params.getAll('offset')).toEqual(['41']);
        expect(params.get('sort')).toBe('level');
        expect(params.get('direction')).toBe('asc');
        expect(params.get('level')).toBe('A1');
        if (feature === 'vocabulary') {
          expect(params.get('word')).toBe('test');
          expect(params.get('pos')).toBe('S');
          expect(params.get('themes')).toBe('test');
        } else {
          expect(params.get('filter_json')).toBe('[]');
          expect(params.get('project')).toBe(feature === 'grammar' ? 'etLex' : 'noor');
        }
        request.flush({ items: [] });
      });
    }
  });
});
