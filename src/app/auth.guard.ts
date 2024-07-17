import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLogin;
  
  if (typeof window !== 'undefined') {
    isLogin = localStorage.getItem('isLogin');
  } else {
    isLogin = 'false';
  }

  if (isLogin == 'true') {
    return true
  } else {
     router.navigate(['/login']);
    return false;
  }
};
