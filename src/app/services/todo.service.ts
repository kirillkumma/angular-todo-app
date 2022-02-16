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

interface CreateTodoResponse {
  data: Todo;
}

interface UpdateTodoResponse {
  data: Todo;
}

interface DeleteTodoResponse {
  data: number;
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

  createTodo(newTodo: { title: string }) {
    this._http
      .post<CreateTodoResponse>('/todos', newTodo, {
        headers: { 'content-type': 'application/json' },
      })
      .subscribe(({ data }) => {
        this.todos.next([...this.todos.getValue(), data]);
      });
  }

  updateTodo({
    id,
    ...updatedTodo
  }: {
    id: number;
    title?: string;
    completed?: boolean;
  }) {
    this._http
      .put<UpdateTodoResponse>(`/todos/${id}`, updatedTodo, {
        headers: { 'content-type': 'application/json' },
      })
      .subscribe(({ data }) => {
        this.todos.next(
          this.todos
            .getValue()
            .map((todo) => (todo.id === data.id ? data : todo)),
        );
      });
  }

  deleteTodo(id: number) {
    this._http
      .delete<DeleteTodoResponse>(`/todos/${id}`)
      .subscribe(({ data }) => {
        this.todos.next(
          this.todos.getValue().filter((todo) => todo.id !== data),
        );
      });
  }
}
