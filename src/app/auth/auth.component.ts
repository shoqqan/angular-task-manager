import { Component, inject, signal } from '@angular/core';
import { TuiLabel, TuiButton, TuiTitle, TuiTextfield } from '@taiga-ui/core';
import { AuthService } from './auth.service';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [TuiTextfield, TuiLabel, ReactiveFormsModule, NgIf, TuiButton, TuiTitle],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  readonly type = signal<string>('login');
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor() {
    this.type.set(this.route.snapshot.data['type'] as 'login' | 'register');
  }
  public authForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    secondPassword: new FormControl(''),
  });

  private login(name: string, password: string) {
    this.authService
      .login(name, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ access_token }) => {
          console.log('Успешный логин:', access_token);

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Ошибка логина:', error);
        },
      });
  }

  private register(name: string, password: string) {
    this.authService
      .register(name, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          console.log('Успешная регистрация:', user);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Ошибка регистрации:', error);
        },
      });
  }

  public onSubmit() {
    if (this.authForm.invalid) {
      console.log('Форма невалидна');
      return;
    }

    const { name, password, secondPassword } = this.authForm.value;

    if (this.type() === 'register' && password !== secondPassword) {
      console.error('Пароли не совпадают');
      return;
    }

    if (this.type() === 'login') {
      this.login(name!, password!);
    } else {
      this.register(name!, password!);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
