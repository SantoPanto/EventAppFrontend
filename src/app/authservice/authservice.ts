// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomerLogin, ICustomerResponse } from '../models/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/customer';

  login(data: ICustomerLogin): Observable<ICustomerResponse> {
    // Session oluşması için withCredentials: true ekliyoruz
    return this.http.post<ICustomerResponse>(`${this.apiUrl}/login`, data, { withCredentials: true });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, { withCredentials: true });
  }
}