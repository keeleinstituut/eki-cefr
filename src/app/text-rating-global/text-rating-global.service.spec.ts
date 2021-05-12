import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TextRatingGlobalService } from './text-rating-global.service';

describe('TextRatingGlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TextRatingGlobalService = TestBed.inject(TextRatingGlobalService);
    expect(service).toBeTruthy();
  });
});
