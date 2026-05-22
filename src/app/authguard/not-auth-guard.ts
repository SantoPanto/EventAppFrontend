import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authservice/authservice';
import { catchError, map, of } from 'rxjs';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Spring Boot'a oturumun durumunu soruyoruz
  return authService.checkSession().pipe(
    map(() => {
      // Backend 200 OK döndü: Oturum zaten var!
      // Kullanıcıyı login/register sayfasından çıkarıp ana sayfaya (events) yönlendiriyoruz.
      router.navigate(['/events']);
      return false; // Bu sayfaya (login) girmesini engelle
    }),
    catchError(() => {
      // Backend 401 döndü: Oturum yok.
      // Harika, tam da login veya register sayfasına girmeye hakkı var demektir.
      return of(true); // Sayfaya girmesine izin ver
    })
  );
};