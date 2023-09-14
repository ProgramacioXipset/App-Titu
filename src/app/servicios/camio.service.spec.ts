import { TestBed } from '@angular/core/testing';

import { CamioService } from './camio.service';

describe('CamioService', () => {
  let service: CamioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
