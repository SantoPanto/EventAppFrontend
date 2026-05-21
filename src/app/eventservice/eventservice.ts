import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from '../models/events/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/event'; // Backend Base URL

  // 1. Tüm etkinlikleri getir (Liste)
  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/list`, { withCredentials: true });
  }

  // 2. Tek bir etkinlik detayını getir (Detay)
  // getDetail veya getEventById yerine tek bir isim seçelim: getById
  getById(eid: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiUrl}/detail/${eid}`, { withCredentials: true });
  }

  // 3. Yeni etkinlik kaydet
  createEvent(event: IEvent): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, event, { withCredentials: true });
  }

  // 4. Kullanıcının kendi etkinliklerini getir
  getMyEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/my-events`, { withCredentials: true });
  }

  // 5. Etkinlik sil
  deleteEvent(eid: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${eid}`, { withCredentials: true });
  }
}