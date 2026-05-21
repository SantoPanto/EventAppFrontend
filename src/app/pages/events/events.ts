import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// DİKKAT: İçe aktarma yolları senin klasör yapına göre düzeltildi! (.service veya .component YOK)
import { EventService } from '../../eventservice/eventservice'; // Eğer klasörün services ise '../../services/event' yap.
import { AuthService } from '../../authservice/authservice';
import { IEvent } from '../../models/events/events'; 

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.html' // .component.html değil, senin yapına göre .html
})
export class EventsComponent implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private router = inject(Router);

  events: IEvent[] = [];
  username: string | null = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.loadEvents();
  }

loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data: any) => { 
        console.log("Backend'den gelen ham veri:", data);
        
        // Çözüm: Verinin yapısına göre doğru kısmı seçiyoruz.
        // Eğer backend Page dönüyorsa 'data.content' kullanmalısın.
        // Eğer backend doğrudan List dönüyorsa 'data' kullanmalısın.
        // Güvenli yöntem:
        if (data.content) {
            this.events = data.content;
        } else if (Array.isArray(data)) {
            this.events = data;
        } else {
            console.error("Beklenmedik veri yapısı:", data);
        }
      },
      error: (err: any) => { 
        console.error("Etkinlikler yüklenirken hata", err);
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      // HATA ÇÖZÜMÜ: res ve err yanına ": any" eklendi (Object is of type unknown hatası çözümü)
      next: (res: any) => { 
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}