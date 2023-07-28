import { TestBed } from '@angular/core/testing';

import { ViatgesService } from './viatges.service';

describe('ViatgesService', () => {
  let service: ViatgesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViatgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
