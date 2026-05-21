import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../authservice/authservice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Username'i getter ile alalım ki localStorage değiştiğinde güncel kalsın
  get username(): string | null {
    return localStorage.getItem('username');
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  // Eğer import edilmediyse en üste ekle: import { Router } from '@angular/router';
  
  onSearch(query: string): void {
    if (query.trim()) {
      // Aranan kelimeyi URL parametresi olarak ekleyip Tüm Etkinlikler sayfasına yönlendir
      this.router.navigate(['/events'], { queryParams: { q: query.trim() } });
    } else {
      // Kutu boşsa normal etkinlikler sayfasına git
      this.router.navigate(['/events']);
    }
  }
}