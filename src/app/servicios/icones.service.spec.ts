import { TestBed } from '@angular/core/testing';

import { IconesService } from './icones.service';

describe('IconesService', () => {
  let service: IconesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
