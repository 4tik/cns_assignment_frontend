import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from './service/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AccountService).isAuthenticated()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
