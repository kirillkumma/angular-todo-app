import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { TodoService, Todo } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(''),
  });
  todos: Todo[] = [];
  isLoading = false;

  constructor(private _todoService: TodoService) {}

  ngOnInit() {
    this._todoService.todos.subscribe((todos) => {
      this.todos = todos;
    });

    this._todoService.isLoading
      .pipe(debounceTime(1000))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });

    this._todoService.fetchTodos();
  }

  isControlInvalid(name: string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  getControlError(controlName: string, errorName: string) {
    return this.form.controls[controlName].errors?.[errorName];
  }

  onCreateTodo() {
    if (this.form.valid) {
      this._todoService.createTodo({ title: this.form.value.title.trim() });
      this.form.reset();
    }
  }

  onChange(updatedTodo: { id: number; completed: boolean; title: string }) {
    this._todoService.updateTodo(updatedTodo);
  }

  onDelete(id: number) {
    this._todoService.deleteTodo(id);
  }
}
