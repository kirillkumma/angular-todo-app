import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() onCompletedChange: EventEmitter<{
    id: number;
    completed: boolean;
    title: string;
  }> = new EventEmitter();

  onClick(e: any) {
    this.onCompletedChange.emit({
      id: this.todo.id,
      completed: e.target.checked,
      title: this.todo.title,
    });
  }
}
