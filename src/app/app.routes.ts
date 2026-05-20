// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './authguard/authguard';

export const routes: Routes = [
  // Boş rota doğrudan Login sayfasını açar
  { path: '', loadComponent: () => import('./pages/login/login').then(c => c.LoginComponent) },
  
  // Register (Kayıt Ol) sayfasının rotasını ekledik
  { path: 'register', loadComponent: () => import('./pages/register/register').then(c => c.RegisterComponent) },

  //Events sayfası rotası
  { path: 'events', loadComponent: () => import('./pages/events/events').then(c => c.Events), canActivate: [authGuard] }
];