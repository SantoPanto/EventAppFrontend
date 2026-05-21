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

  events: IEvent[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadMyEvents();
  }

  loadMyEvents(): void {
    this.isLoading = true;
    this.eventService.getMyEvents().subscribe({
      next: (data: any) => { 
        // Backend'den gelen veri yapısı (Page veya List) EventsComponent ile aynıdır
        if (data.content) {
            this.events = data.content;
        } else if (Array.isArray(data)) {
            this.events = data;
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
}