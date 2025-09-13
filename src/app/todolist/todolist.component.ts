import { Component, Input } from '@angular/core';
import { Todolist } from './todolist.interface';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  @Input() todo: Todolist;
  constructor() {
    this.todo = {} as Todolist;
  }
}
