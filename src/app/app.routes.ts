import { Routes } from '@angular/router';
// Dosya yolları senin isimlendirmene göre uyarlandı (.component yok)
import { LoginComponent } from './pages/login/login'; 
import { RegisterComponent } from './pages/register/register';
import { EventsComponent } from './pages/events/events';
import { CreateEventComponent } from './pages/create-event/create-event'; // Dosya yolunu kendine göre ayarla

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events', component: EventsComponent },
  { path: 'create-event', component: CreateEventComponent },

];