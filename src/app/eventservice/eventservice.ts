import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../models/events/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/event'; // Backend Controller adresin

  // Tüm yayınlanmış etkinlikleri getir
  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/list`, { withCredentials: true });
  }

  // Yeni etkinlik ekle
  createEvent(event: IEvent): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, event, { withCredentials: true });
  }

  // Kullanıcının kendi etkinliklerini getir
  getMyEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/my-events`, { withCredentials: true });
  }

  // Etkinlik Detayı getir
  getEventById(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiUrl}/detail/${id}`, { withCredentials: true });
  }
}