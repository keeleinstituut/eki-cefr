import { TestBed } from '@angular/core/testing';

import { TextRatingGlobalService } from './text-rating-global.service';

describe('TextRatingGlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextRatingGlobalService = TestBed.get(TextRatingGlobalService);
    expect(service).toBeTruthy();
  });
});
