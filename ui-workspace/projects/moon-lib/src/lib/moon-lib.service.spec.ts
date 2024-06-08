import { TestBed } from '@angular/core/testing';

import { MoonLibService } from './moon-lib.service';

describe('MoonLibService', () => {
  let service: MoonLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoonLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
