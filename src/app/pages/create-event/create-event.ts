import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../eventservice/eventservice'; // Klasör ismine dikkat et

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-event.html'
})
export class CreateEventComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);

  // PDF gereksinimlerine göre Form ve Validasyon Kuralları
  eventForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  errorMessage: string = '';
  successMessage: string = '';

  onSubmit(): void {
  if (this.eventForm.invalid) {
    this.eventForm.markAllAsTouched();
    return;
  }

  // BURASI EKLENDİ: Form verisini al ve published (yayınlandı) değerini true yap
  const eventPayload = this.eventForm.value;
  eventPayload.published = true; 

  // Backend'e eventPayload'u gönder
  this.eventService.createEvent(eventPayload).subscribe({
    next: (res: any) => {
      this.successMessage = 'Etkinlik başarıyla oluşturuldu ve yayınlandı!';
      this.errorMessage = '';
      
      setTimeout(() => {
        this.router.navigate(['/events']);
      }, 1500);
    },
    error: (err: any) => {
      this.successMessage = '';
      this.errorMessage = err.error?.message || 'Etkinlik kaydedilirken bir hata oluştu.';
    }
  });
  }
}