import { TestBed } from '@angular/core/testing';

import { AnadaService } from './anada.service';

describe('AnadaService', () => {
  let service: AnadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
