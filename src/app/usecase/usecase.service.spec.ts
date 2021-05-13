import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsecaseService } from './usecase.service';

describe('UsecaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: UsecaseService = TestBed.inject(UsecaseService);
    expect(service).toBeTruthy();
  });
});
