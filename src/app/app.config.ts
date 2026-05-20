import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Spring Boot API'leri ile haberleşmek için HTTP Client ekliyoruz
    provideHttpClient(withFetch()) 
  ]
};