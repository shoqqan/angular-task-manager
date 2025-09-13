import { ChangeDetectionStrategy, Component, DestroyRef, signal } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiProgress } from '@taiga-ui/kit';
import { TuiAppBar } from '@taiga-ui/layout';
import { DashboardService } from './dashboard.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Todolist } from '../todolist/todolist.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodolistComponent } from '../todolist/todolist.component';
import { TodolistService } from '../todolist/todolist.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TuiAppBar, TuiButton, TuiTextfield, ReactiveFormsModule, TodolistComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(
    private dashboardService: DashboardService,
    private todolistService: TodolistService,
    private destroyRef: DestroyRef,
  ) {}
  public createTodoValue = new FormControl('');

  public todos = signal<Todolist[]>([]);
  ngOnInit() {
    this.getTodos();
  }
  public logout() {
    this.dashboardService.logout();
  }
  public getTodos() {
    this.todolistService
      .getTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((todos) => {
        console.log('todos', todos);
        this.todos.set(todos);
      });
  }

  public onEnterKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.createTodoValue.value?.trim()) {
        this.todolistService
          .createTodo(this.createTodoValue.value.trim())
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              // Очищаем поле ввода
              this.createTodoValue.reset();
              // Перезагружаем список todos после успешного создания
              this.getTodos();
            },
            error: (error) => {
              console.error('Error creating todo:', error);
            },
          });
      }
    }
  }
}
