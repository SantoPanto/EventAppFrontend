import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../eventservice/eventservice';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-event.html'
})
export class EditEventComponent implements OnInit {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  editForm!: FormGroup;
  eventId!: number;
  isLoading: boolean = true;
  currentUserId: number | null = null;
  
  // HTML tarafında [min]="today" kullanımı için değişken
  today: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem('cid'));
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadEventData();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadEventData(): void {
    this.eventService.getById(this.eventId).subscribe({
      next: (data: any) => {
        // GÜVENLİK KONTROLÜ
        if (data.ownerCid !== this.currentUserId) {
          alert('Bu etkinliği düzenleme yetkiniz yok.');
          this.router.navigate(['/events']);
          return;
        }

        console.log("Düzenleme sayfasına gelen veri:", data);
        this.editForm.patchValue(data); 
        
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Veri yüklenirken hata oluştu', err);
        alert('Etkinlik bulunamadı veya yetkiniz yok.');
        this.router.navigate(['/events']);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.eventService.updateEvent(this.eventId, this.editForm.value).subscribe({
        next: () => {
          alert('Etkinlik başarıyla güncellendi!');
          this.router.navigate(['/event-detail', this.eventId]);
        },
        error: (err) => {
          console.error('Güncelleme hatası', err);
          alert('Güncelleme sırasında bir hata oluştu.');
        }
      });
    }
  }
}