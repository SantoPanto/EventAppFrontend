import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  event: IEvent | null = null;
  currentUserId: number | null = null; 
  participants: any[] = []; 
  participantCount: number = 0; // Yeni değişkenimiz

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('cid'));
    const eid = Number(this.route.snapshot.paramMap.get('id'));

    // 1. Etkinlik Detayını Getir
    this.eventService.getById(eid).subscribe({
      next: (data: IEvent) => {
        this.event = data; 
        this.cdr.detectChanges(); 
        
        // HERKES sayıyı görebilsin diye count isteği at
        this.eventService.getParticipantCount(eid).subscribe(res => {
            this.participantCount = res.count;
            this.cdr.detectChanges();
        });

        // SADECE etkinliğin sahibi giriş yapan kişiyse listeyi çek
        if (this.event.ownerCid === this.currentUserId) {
            this.loadParticipants(eid);
        }
      },
      error: (err) => {
        console.error("HATA DETAYI:", err);
        if (err.status === 401 || err.status === 403) {
           this.router.navigate(['/login']);
        }
      }
    });
  }

  // Katılımcıları yükleyen fonksiyon
  loadParticipants(eid: number): void {
    this.eventService.getParticipants(eid).subscribe({
      next: (data: any[]) => {
        this.participants = data || [];
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("Katılımcı listesi alınamadı:", err);
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

  joinCurrentEvent(): void {
    if (!this.event) return;

    this.eventService.joinEvent(this.event.eid).subscribe({
      next: () => {
        alert("Etkinliğe başarıyla katıldınız! 🎉");
        this.participantCount++; // Katıldığımız an sayıyı anında 1 artırıyoruz
        this.cdr.detectChanges();
        
        // Eğer sahibiyseniz listeyi de güncelleyin
        if (this.event?.ownerCid === this.currentUserId) {
            this.loadParticipants(this.event.eid);
        }
      },
      error: (err) => {
        console.error("Katılım hatası:", err);
        if (err.status === 400) {
          alert("Bu etkinliğe zaten kayıtlısınız.");
        } else {
          alert("Katılım sağlanamadı. Lütfen giriş yaptığınızdan emin olun.");
        }
      }
    });
  }
}