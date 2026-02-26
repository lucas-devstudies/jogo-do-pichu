import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../core/services/token-service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getToken();

  // Se não houver token → redireciona
  if (!token) {
    return router.parseUrl('/login');
  }

  // Se o token for inválido/expirado → limpar e redirecionar
  if (!tokenService.isTokenValid()) {
    tokenService.logout();
    return router.parseUrl('/login');
  }

  // Tudo certo → permitir acesso
  return true;
};