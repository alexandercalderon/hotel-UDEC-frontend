import { TestBed } from '@angular/core/testing';

import { OcupacionService } from './ocupacion.service';

describe('OcupacionService', () => {
  let service: OcupacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcupacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
