import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { VocabularyListService } from './vocabulary-list.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('VocabularyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: VocabularyListService = TestBed.inject(VocabularyListService);
    expect(service).toBeTruthy();
  });
});
