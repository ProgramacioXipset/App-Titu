import { TestBed } from '@angular/core/testing';

import { DireccioService } from './direccio.service';

describe('DireccioService', () => {
  let service: DireccioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
