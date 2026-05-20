// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const customerId = localStorage.getItem('cid'); // Backend'den dönen ID veya token

  if (customerId) {
    return true; // Giriş yapılmış, sayfaya girmeye izin ver
  } else {
    router.navigate(['/']); // Giriş yapılmamış, logine yönlendir
    return false;
  }
};