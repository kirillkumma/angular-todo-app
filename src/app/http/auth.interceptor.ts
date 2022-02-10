import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private token?: string;

  constructor(private _authService: AuthService) {
    this._authService.state.subscribe(({ token }) => {
      this.token = token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authorizedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`),
    });

    return next.handle(authorizedReq);
  }
}
