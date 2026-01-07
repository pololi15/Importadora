import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  // Por ahora permitimos el acceso, luego integrarás Supabase Auth
  return true; 
};