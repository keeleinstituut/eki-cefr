import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FeedbackModalService } from './feedback-modal.service';

describe('FeedbackModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: FeedbackModalService = TestBed.get(FeedbackModalService);
    expect(service).toBeTruthy();
  });
});
