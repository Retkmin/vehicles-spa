import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard, publicGuard } from './auth.guard';

describe('authGuard', () => {
  it('should return true by default', () => {
    expect(authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });
});

describe('publicGuard', () => {
  it('should return true by default', () => {
    expect(publicGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });
});
