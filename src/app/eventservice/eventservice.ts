// src/app/services/event.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEvent } from '../models/events/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/event';

  getAllEvents(): Observable<IEvent[]> {
    // Tüm isteklerde oturum çerezi gönderiliyor
    return this.http.get<IEvent[]>(`${this.apiUrl}/list`, { withCredentials: true });
  }

  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(`${this.apiUrl}/save`, event, { withCredentials: true });
  }
}