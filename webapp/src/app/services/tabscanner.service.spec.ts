import { TestBed } from '@angular/core/testing';

import { TabscannerService } from './tabscanner.service';

describe('TabscannerService', () => {
  let service: TabscannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabscannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
