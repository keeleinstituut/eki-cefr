import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GrammarDetailService } from './grammar-detail.service';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('GrammarDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: GrammarDetailService = TestBed.inject(GrammarDetailService);
    expect(service).toBeTruthy();
  });
});
