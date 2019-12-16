import { TestBed } from '@angular/core/testing';

import { FeedbackModalService } from './feedback-modal.service';

describe('FeedbackModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedbackModalService = TestBed.get(FeedbackModalService);
    expect(service).toBeTruthy();
  });
});
