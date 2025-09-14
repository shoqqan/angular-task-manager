import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  constructor() {}
  public createTask(title: string, todoId: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, { title, todolistId: todoId });
  }
  public getTasks(todoId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/${todoId}`);
  }
  public updateTask(taskId: string, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, task);
  }
  public deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`);
  }
}
