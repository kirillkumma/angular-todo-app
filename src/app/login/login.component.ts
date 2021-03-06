import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  error?: string;
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private _authService: AuthService) {}

  isControlInvalid(name: string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  getControlError(controlName: string, errorName: string) {
    return this.form.controls[controlName].errors?.[errorName];
  }

  onSubmit() {
    if (this.form.valid) {
      this._authService.login(this.form.value).subscribe(({ error }) => {
        if (error) {
          this.error = error.message;
        }
      });
    }
  }
}
