import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Kendi dosya yollarına göre güncelledin, burası doğru kalsın
import { EventService } from '../../eventservice/eventservice';
import { AuthService } from '../../authservice/authservice';
import { IEvent } from '../../models/events/events'; 

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.html'
})
export class EventsComponent implements OnInit {
  // Bağımlılıkları burada (sınıfın içinde) tanımlıyoruz
  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  events: IEvent[] = [];
  username: string | null = '';
  isLoading: boolean = true;

  // ngOnInit, sınıfın içinde yer almalı
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe({
      next: (data: any) => { 
        // Veri yapısına göre atama
        if (data.content) {
            this.events = data.content;
        } else if (Array.isArray(data)) {
            this.events = data;
        }
        this.isLoading = false;
        this.cdr.detectChanges(); // Ekranın güncellenmesini zorla
      },
      error: (err: any) => { 
        console.error("Etkinlikler yüklenirken hata", err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
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