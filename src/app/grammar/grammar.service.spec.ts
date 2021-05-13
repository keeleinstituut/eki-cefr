import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GrammarService } from './grammar.service';

describe('GrammarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: GrammarService = TestBed.inject(GrammarService);
    expect(service).toBeTruthy();
  });
});
