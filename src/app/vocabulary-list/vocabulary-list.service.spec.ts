import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VocabularyListService } from './vocabulary-list.service';

describe('VocabularyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: VocabularyListService = TestBed.inject(VocabularyListService);
    expect(service).toBeTruthy();
  });
});
