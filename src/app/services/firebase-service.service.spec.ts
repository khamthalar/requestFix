import { TestBed } from '@angular/core/testing';

import { FirbaseServiceService } from './firebase-service.service';

describe('FirebaseServiceService', () => {
  let service: FirbaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirbaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
