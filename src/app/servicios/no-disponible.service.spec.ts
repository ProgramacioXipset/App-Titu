import { TestBed } from '@angular/core/testing';

import { NoDisponibleService } from './no-disponible.service';

describe('NoDisponibleService', () => {
  let service: NoDisponibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoDisponibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
