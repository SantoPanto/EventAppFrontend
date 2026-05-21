import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // ActivatedRoute eklendi
import { CommonModule } from '@angular/common';
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
  private eventService = inject(EventService);
  private authService = inject(AuthService); // Logout için gerekli
  private router = inject(Router);
  private route = inject(ActivatedRoute); // URL parametrelerini okumak için
  private cdr = inject(ChangeDetectorRef);

  events: IEvent[] = [];
  username: string | null = '';
  isLoading: boolean = true;
  currentPage: number = 0;
  totalPages: number = 0;
  
  currentQuery: string = ''; // Şu an aranan kelimeyi tutar

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    
    // Sayfa açıldığında veya URL değiştiğinde tetiklenir
    this.route.queryParams.subscribe(params => {
      this.currentQuery = params['q'] || ''; // URL'den 'q' parametresini al
      this.currentPage = 0; // Yeni aramada veya sayfa değişiminde başa dön
      this.loadEvents(); 
    });
  }

  loadEvents(): void {
    this.isLoading = true;

    // Eğer arama kutusu doluysa searchEvents'i çağır, boşsa tümünü getir
    const request = this.currentQuery 
      ? this.eventService.searchEvents(this.currentQuery, this.currentPage)
      : this.eventService.getAllEvents(this.currentPage);

    request.subscribe({
      next: (data: any) => { 
        if (data.content) {
            this.events = data.content; 
            this.totalPages = data.totalPages || 1;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => { 
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Navbar'dan çağrılacak arama fonksiyonu
  onSearch(query: string): void {
    // URL parametresini güncelle, bu ngOnInit'i tekrar tetikleyecek
    this.router.navigate(['/events'], { queryParams: { q: query } });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents();
    }
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
}