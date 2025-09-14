import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { Todolist } from './todolist.interface';
import { TuiHeader, TuiCardMedium } from '@taiga-ui/layout';
import { TuiTitle, TuiAppearance, TuiTextfield, TuiIcon } from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task';
import { TasksComponent } from '../tasks/tasks.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    TuiCardMedium,
    TuiHeader,
    TuiTitle,
    TuiAppearance,
    TuiCardMedium,
    TuiTextfield,
    TuiIcon,
    ReactiveFormsModule,
    TasksComponent,
    NgFor,
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  @Input() todo: Todolist;
  private readonly destroyRef = inject(DestroyRef);
  constructor(private taskService: TasksService) {
    this.todo = {} as Todolist;
  }
  public taskValue = new FormControl('');
  public tasks = signal<Task[]>([]);
  ngOnInit() {
    this.taskService
      .getTasks(this.todo.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tasks) => {
        this.tasks.set(tasks);
      });
  }
  public createTask() {
    if (this.taskValue.value?.trim()) {
      this.taskService
        .createTask(this.taskValue.value, this.todo.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.taskValue.reset();
            this.taskService.getTasks(this.todo.id);
          },
          error: (error) => {
            console.error('Error creating task:', error);
          },
        });
    }
  }
}
