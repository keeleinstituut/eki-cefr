import { TestBed } from '@angular/core/testing';

import { GrammarDetailService } from './grammar-detail.service';

describe('GrammarDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrammarDetailService = TestBed.get(GrammarDetailService);
    expect(service).toBeTruthy();
  });
});
