import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../eventservice/eventservice';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-event.html'
})
export class CreateEventComponent implements OnInit {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);

  eventForm!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];
  
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    // Formu başlatırken tarih alanına bugünün tarihini atıyoruz
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      date: [this.today, Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const eventPayload = {
      ...this.eventForm.value,
      published: true
    };

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