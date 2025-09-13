import { Component, Input } from '@angular/core';
import { Todolist } from './todolist.interface';
import { TuiCardLarge, TuiHeader, TuiCardMedium } from '@taiga-ui/layout';
import { TuiTitle, TuiAppearance } from '@taiga-ui/core';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [TuiCardLarge, TuiHeader, TuiTitle, TuiAppearance, TuiCardMedium],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  @Input() todo: Todolist;
  constructor() {
    this.todo = {} as Todolist;
  }
}
