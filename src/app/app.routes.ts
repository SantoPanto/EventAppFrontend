import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login'; 
import { RegisterComponent } from './pages/register/register';
import { EventsComponent } from './pages/events/events';
import { CreateEventComponent } from './pages/create-event/create-event'; 
import { MyEventsComponent } from './pages/my-events/my-events'; 
import { EventDetailComponent } from './pages/event-detail/event-detail';
import { EditEventComponent } from './pages/edit-event/edit-event';

// Guard'ları içeri aktarıyoruz (Dosya yollarını kendi yapına göre kontrol etmeyi unutma)
import { authGuard } from './authguard/authguard';
import { notAuthGuard } from './authguard/not-auth-guard'; 

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 🚫 Sadece giriş YAPMAMIŞ olanlar görebilir:
  { path: 'login', component: LoginComponent, canActivate: [notAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [notAuthGuard] },
  
  // 🔐 Sadece giriş YAPMIŞ olanlar görebilir:
  { path: 'events', component: EventsComponent, canActivate: [authGuard] },
  { path: 'create-event', component: CreateEventComponent, canActivate: [authGuard] },
  { path: 'my-events', component: MyEventsComponent, canActivate: [authGuard] },
  { path: 'event-detail/:id', component: EventDetailComponent, canActivate: [authGuard] },
  { path: 'edit-event/:id', component: EditEventComponent, canActivate: [authGuard] },


  { path: '**', redirectTo: 'login' }
];