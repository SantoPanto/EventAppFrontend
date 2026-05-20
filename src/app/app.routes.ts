// src/app/pages/login/login.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html' // <-- Dosya yolunu güncelledik
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  errorMessage: string = '';

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('cid', response.cid.toString());
          localStorage.setItem('username', `${response.name} ${response.surname}`);
          this.router.navigate(['/events']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Giriş başarısız. Bilgilerinizi kontrol edin.';
        }
      });
    }
  }
}