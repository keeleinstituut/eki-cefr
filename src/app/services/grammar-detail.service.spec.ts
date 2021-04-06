import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GrammarDetailService } from './grammar-detail.service';

describe('GrammarDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: GrammarDetailService = TestBed.get(GrammarDetailService);
    expect(service).toBeTruthy();
  });
});
