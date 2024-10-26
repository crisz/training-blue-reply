import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // Consenti accesso se l'utente è loggato
  } else {
    return router.createUrlTree(['/login-page']);  // manda su login page se non è loggato
  }
};
