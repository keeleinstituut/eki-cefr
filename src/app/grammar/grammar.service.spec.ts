import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GrammarService } from './grammar.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GrammarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: GrammarService = TestBed.inject(GrammarService);
    expect(service).toBeTruthy();
  });
});
