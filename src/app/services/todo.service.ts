import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface FetchTodosResponse {
  data: Todo[];
}

interface UpdateTodoResponse {
  data: Todo;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos = new BehaviorSubject<Todo[]>([]);
  isLoading = new BehaviorSubject(false);

  constructor(private _http: HttpClient) {}

  fetchTodos() {
    this.isLoading.next(true);
    this._http.get<FetchTodosResponse>('/todos').subscribe(({ data }) => {
      this.todos.next(data);
      this.isLoading.next(false);
    });
  }

  updateTodo({
    id,
    title,
    completed,
  }: {
    id: number;
    title?: string;
    completed?: boolean;
  }) {
    this._http
      .put<UpdateTodoResponse>(
        `/todos/${id}`,
        { title, completed },
        { headers: { 'content-type': 'application/json' } },
      )
      .subscribe(({ data }) => {
        this.todos.next(
          this.todos
            .getValue()
            .map((todo) => (todo.id === data.id ? data : todo)),
        );
      });
  }
}
