import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../eventservice/eventservice';
import { IEvent } from '../../models/events/events';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-events.html'
})
export class MyEventsComponent implements OnInit {
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);

  myEvents: IEvent[] = [];
  isLoading: boolean = true;
  
  currentPage: number = 1; // Frontend dilimlemesi için 1'den başlarız
  itemsPerPage: number = 9;

  ngOnInit(): void {
    this.loadMyEvents();
  }

  // Angular getter'ı: Listeyi anlık olarak dilimler
  get paginatedEvents(): IEvent[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.myEvents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.myEvents.length / this.itemsPerPage) || 1;
  }

  loadMyEvents(): void {
    this.isLoading = true;
    this.eventService.getMyEvents().subscribe({
      next: (data: any) => { 
        // Veriyi myEvents dizisine atıyoruz
        if (data.content) {
            this.myEvents = data.content;
        } else if (Array.isArray(data)) {
            this.myEvents = data;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => { 
        console.error("Kişisel etkinlikler yüklenirken hata", err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
}