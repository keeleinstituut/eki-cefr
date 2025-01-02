import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FeedbackModalService } from './feedback-modal.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeedbackModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it('should be created', () => {
    const service: FeedbackModalService = TestBed.inject(FeedbackModalService);
    expect(service).toBeTruthy();
  });
});
