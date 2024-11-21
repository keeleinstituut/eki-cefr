import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TextService } from './text.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TextService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: TextService = TestBed.inject(TextService);
    expect(service).toBeTruthy();
  });
});
