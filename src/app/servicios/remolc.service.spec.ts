import { TestBed } from '@angular/core/testing';

import { RemolcService } from './remolc.service';

describe('RemolcService', () => {
  let service: RemolcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemolcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
