import { TestBed } from '@angular/core/testing';

import { VocabularyListService } from './vocabulary-list.service';

describe('VocabularyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VocabularyListService = TestBed.get(VocabularyListService);
    expect(service).toBeTruthy();
  });
});
