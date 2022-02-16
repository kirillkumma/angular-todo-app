import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading = new BehaviorSubject(true);

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this._authService.state.subscribe(({ user }) => {
      if (user) {
        this._router.navigateByUrl('/');
      } else {
        this._router.navigateByUrl('/login');
      }
    });

    this._authService.authenticate().subscribe(() => {
      this.isLoading.next(false);
    });
  }
}
