import { TestBed, inject } from '@angular/core/testing';

import { RfpService } from './rfp.service';

describe('RfpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RfpService]
    });
  });

  it('should be created', inject([RfpService], (service: RfpService) => {
    expect(service).toBeTruthy();
  }));
});
