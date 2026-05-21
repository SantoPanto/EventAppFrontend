import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar'; // Navbar'ı import et

@Component({
  selector: 'app-root',
  standalone: true, // Standalone olduğunu belirtelim
  imports: [RouterOutlet, NavbarComponent], // NavbarComponent'i buraya ekledik
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('event-app-frontend');

  // Navbar'ın görünürlüğünü kontrol eden fonksiyon
  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }
}