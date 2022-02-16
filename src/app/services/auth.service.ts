import decodeToken from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, catchError, of, share, EMPTY } from 'rxjs';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthResponse {
  data?: {
    token: string;
  };
  error?: { message: string };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  state = new Subject<{ user?: User; token?: string }>();

  constructor(private _http: HttpClient) {}

  private onError({ error }: HttpErrorResponse) {
    return of<AuthResponse>(error);
  }

  private onSuccess = ({ data }: AuthResponse) => {
    if (data) {
      this.state.next({
        token: data.token,
        user: decodeToken<User>(data.token),
      });
    } else {
      this.state.next({});
    }
  };

  register(credentials: { email: string; name: string; password: string }) {
    const res = this._http
      .post<AuthResponse>('/register', credentials, {
        headers: { 'content-type': 'application/json' },
        withCredentials: true,
      })
      .pipe(catchError(this.onError), share());

    res.subscribe(this.onSuccess);

    return res;
  }

  login(credentials: { email: string; password: string }) {
    const res = this._http
      .post<AuthResponse>('/login', credentials, {
        headers: { 'content-type': 'application/json' },
        withCredentials: true,
      })
      .pipe(catchError(this.onError), share());

    res.subscribe(this.onSuccess);

    return res;
  }

  authenticate() {
    const res = this._http
      .post<AuthResponse>('/authenticate', undefined, {
        withCredentials: true,
      })
      .pipe(catchError(this.onError), share());

    res.subscribe(this.onSuccess);

    return res;
  }

  logout() {
    const res = this._http
      .post('/logout', undefined, { withCredentials: true })
      .pipe(catchError(this.onError), share());

    res.subscribe(() => this.state.next({}));

    return res;
  }
}
