import { Component, OnInit } from '@angular/core';

import { TodoService, Todo } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  isLoading = false;

  constructor(private _todoService: TodoService) {
    this._todoService.todos.subscribe((todos) => {
      this.todos = todos;
    });
    this._todoService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
    this._todoService.fetchTodos();
  }

  onCompletedChange({
    id,
    completed,
    title,
  }: {
    id: number;
    completed: boolean;
    title: string;
  }) {
    this._todoService.updateTodo({ id, completed, title });
  }
}
