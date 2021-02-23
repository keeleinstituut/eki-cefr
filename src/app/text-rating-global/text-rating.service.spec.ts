import { TestBed } from '@angular/core/testing';

import { TextRatingService } from './text-rating.service';

describe('TextRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextService = TestBed.get(TextRatingService);
    expect(service).toBeTruthy();
  });
});
