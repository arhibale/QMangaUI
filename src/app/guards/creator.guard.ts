import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const creatorGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.getRoleFromToken() === 'Creator') {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
