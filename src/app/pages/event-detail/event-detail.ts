import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef eklendi
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../eventservice/eventservice';
import { IEvent } from '../../models/events/events';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.html'
})
export class EventDetailComponent implements OnInit {
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // Entegre edildi

  event: IEvent | null = null;
  currentUserId: number | null = null; 

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('userId'));
    
    const eid = Number(this.route.snapshot.paramMap.get('id'));
    console.log("İstek atılan ID:", eid);

    this.eventService.getById(eid).subscribe({
      next: (data: IEvent) => {
        console.log("Backend'den başarıyla gelen veri:", data);
        this.event = data; 
        
        // Veri geldiğinde arayüzü zorla güncelle
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("HATA DETAYI:", err);
        if (err.status === 401 || err.status === 403) {
           this.router.navigate(['/login']);
        }
      }
    });
  }

  deleteEvent(): void {
    if (!this.event) return;

    if (confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) {
      this.eventService.deleteEvent(this.event.eid).subscribe({
        next: () => {
          alert("Etkinlik silindi.");
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error("Silme hatası:", err);
          alert("Silme işlemi başarısız.");
        }
      });
    }
  }

  editEvent(): void {
    this.router.navigate(['/edit-event', this.event?.eid]);
  }
}