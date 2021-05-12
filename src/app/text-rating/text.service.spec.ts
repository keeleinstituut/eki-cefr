import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TextService } from './text.service';

describe('TextService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TextService = TestBed.inject(TextService);
    expect(service).toBeTruthy();
  });
});
