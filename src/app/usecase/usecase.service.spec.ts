import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { UsecaseService } from './usecase.service';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('UsecaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: UsecaseService = TestBed.inject(UsecaseService);
    expect(service).toBeTruthy();
  });
  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('encodes JSON filters once and preserves repeated levels', () => {
    const filters = [{ maincategory: 'õun & pirn #1 + 50%?', subcategory: null,
      descriptors: [['a&b', null] as [string, null]] }];
    TestBed.inject(UsecaseService).getTableData({
      filters, levels: ['A1', 'B2'], page: 2, pageSize: 20
    }).subscribe();
    const request = TestBed.inject(HttpTestingController).expectOne(req => req.url.endsWith('/usecases'));
    const params = new URL(request.request.urlWithParams, 'https://example.test').searchParams;
    expect(JSON.parse(params.get('filter_json'))).toEqual(filters);
    expect(params.getAll('level')).toEqual(['A1', 'B2']);
    expect(params.has('sort')).toBeFalse();
    expect(params.has('direction')).toBeFalse();
    request.flush({ items: [] });
  });

});
