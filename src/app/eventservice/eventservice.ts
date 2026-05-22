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
  getAllEvents(page: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/list?page=${page}`, { withCredentials: true });
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

  // 6. Etkinlik Güncelle
  updateEvent(eid: number, eventData: any): Observable<any> {
    // Backend URL'de ID beklemiyor, Body içinde bekliyor.
    const requestBody = { eid: eid, ...eventData }; 
    return this.http.put(`http://localhost:8080/event/update`, requestBody, { withCredentials: true });
  }

  // 7. Bir etkinliğe katılan kişilerin listesini getir (Katılımcıları Listele)
  getParticipants(eid: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/participation/list/${eid}`, { withCredentials: true });
  }

  // 8. Etkinliğe Katıl
  joinEvent(eid: number): Observable<any> {
    return this.http.post(`${this.apiUrl.replace('/event', '/participation')}/join/${eid}`, {}, { withCredentials: true });
  }

  // 9. Katılımcı sayısını getir
  getParticipantCount(eid: number): Observable<any> {
    return this.http.get(`${this.apiUrl.replace('/event', '/participation')}/count/${eid}`);
  }

  // 10. Arama metodu (Backend'deki @GetMapping("/search") ile konuşur)
  searchEvents(query: string, page: number = 0, sort: string = 'asc'): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}&page=${page}&daySort=${sort}`, { withCredentials: true });
  }

  // 11. Etkinlik Durumunu Güncelle (PUBLISHED, UNPUBLISHED, ARCHIVED)
  updateEventStatus(eid: number, status: string): Observable<any> {
    // Backend @RequestParam beklediği için URL sonuna ?status= şeklinde ekliyoruz
    return this.http.put(`${this.apiUrl}/updateStatus/${eid}?status=${status}`, {}, { withCredentials: true });
  }
}