import { Component, computed, DestroyRef, inject, input, Input, signal } from '@angular/core';
import { Task } from './task';
import { TuiCheckbox } from '@taiga-ui/kit';
import { TasksService } from './tasks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TuiCheckbox],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  readonly task = input.required<Task>();
  public isDone = computed(() => this.task().isDone);
  private readonly destroyRef = inject(DestroyRef);
  constructor(private taskService: TasksService) {}

  public updateTask(task: Partial<Task>) {
    this.taskService
      .updateTask(this.task().id, task)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.taskService
            .getTasks(this.task().todoId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
        },
        error: (error) => {
          console.error('Error updating task:', error);
        },
      });
  }
}
