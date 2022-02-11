import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todos/todo-list.component';
import { TodoComponent } from './todos/todo.component';
import { AuthService } from './services/auth.service';
import { TodoService } from './services/todo.service';
import { httpInterceptros } from './http/';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TodoListComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, httpInterceptros, TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
