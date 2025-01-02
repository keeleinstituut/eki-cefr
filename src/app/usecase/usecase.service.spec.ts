import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { UsecaseService } from './usecase.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UsecaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: UsecaseService = TestBed.inject(UsecaseService);
    expect(service).toBeTruthy();
  });
});
