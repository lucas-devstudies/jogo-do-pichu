import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token-service';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const tokenService = inject(TokenService);
  const router = inject(Router);
  
  if(tokenService.isTokenValid()){
    router.navigate(['/home']);
    return false;
  }
  return true;
};
