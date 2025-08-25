import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../user/user.interface';
import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private userService = inject(UserService);
  public login(name: string, password: string): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/auth/login`, {
        name,
        password,
      })
      .pipe(
        tap(({ access_token }) => {
          localStorage.setItem('token', access_token);
        }),
      );
  }

  public register(name: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, {
      name,
      password,
    });
  }
}
