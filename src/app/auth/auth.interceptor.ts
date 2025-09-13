import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Добавляем токен к запросу, если он есть
  let newReq = req;
  if (token) {
    newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
  }

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Если получили 401 Unauthorized
      if (error.status === 401) {
        // Очищаем токен из localStorage
        localStorage.removeItem('token');

        // Перенаправляем на страницу авторизации
        router.navigate(['/auth']);
      }

      // Пробрасываем ошибку дальше
      return throwError(() => error);
    }),
  );
};
