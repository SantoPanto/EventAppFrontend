import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authservice/authservice'; // Yol ismini kendi projene göre kontrol et
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Spring Boot'a oturumun durumunu soruyoruz
  return authService.checkSession().pipe(
    map((user) => {
      // Backend 200 OK döndü: Oturum hala aktif!
      // LocalStorage'ı güncelleyip geçişe izin veriyoruz
      localStorage.setItem('cid', user.cid.toString());
      localStorage.setItem('username', `${user.name} ${user.surname}`);
      return true; 
    }),
    catchError(() => {
      // Backend 401 döndü: Oturum düşmüş veya yok!
      console.warn("Oturum geçersiz, giriş sayfasına yönlendiriliyor.");
      localStorage.clear(); // Geçersiz bilgileri temizle
      router.navigate(['/login']); // Giriş sayfasına fırlat
      return of(false); // Sayfaya girmesini engelle
    })
  );
};