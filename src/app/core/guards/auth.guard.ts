import { CanActivateFn } from '@angular/router';

export const publicGuard: CanActivateFn = () => {
  // TODO: Add logic for public routes if needed
  return true;
};

export const authGuard: CanActivateFn = () => {
  // TODO: Implement authentication logic
  return true;
};
