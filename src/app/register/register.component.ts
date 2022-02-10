import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
  });

  isControlInvalid(name: string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  getControlError(controlName: string, errorName: string) {
    return this.form.controls[controlName].errors?.[errorName];
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
