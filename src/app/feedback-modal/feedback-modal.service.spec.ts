import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FeedbackModalService } from './feedback-modal.service';

describe('FeedbackModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: FeedbackModalService = TestBed.inject(FeedbackModalService);
    expect(service).toBeTruthy();
  });
});
