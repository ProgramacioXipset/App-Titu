import { TestBed } from '@angular/core/testing';

import { XoferService } from './xofer.service';

describe('XoferService', () => {
  let service: XoferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XoferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
