import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GrammarService } from './grammar.service';

describe('GrammarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: GrammarService = TestBed.get(GrammarService);
    expect(service).toBeTruthy();
  });
});
