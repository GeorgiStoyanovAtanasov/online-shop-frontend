import { TestBed } from '@angular/core/testing';

import { AuthServiceForJwt } from './auth-service-for-jwt';

describe('AuthServiceForJwt', () => {
  let service: AuthServiceForJwt;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceForJwt);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
