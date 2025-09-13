import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todolist } from './todolist.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  public getTodos(): Observable<Todolist[]> {
    return this.http.get<Todolist[]>(`${this.apiUrl}/todolists`);
  }

  public createTodo(title: string) {
    return this.http.post<Todolist>(`${this.apiUrl}/todolists`, { title });
  }
}
