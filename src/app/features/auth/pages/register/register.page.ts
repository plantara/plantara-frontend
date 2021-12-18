import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { TokenReponse } from '@core/models/TokenResponse';
import { User } from '@core/models/User';
import { UserResponse } from '@core/models/UserResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  isSpinnerVisible = false;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.isSpinnerVisible = true;
      const value = this.form.value;

      this.authService
        .register(value.email, value.password)
        .subscribe((userResponse: UserResponse) => {
          this.authService.user$.next(new User(userResponse));
          this.isSpinnerVisible = false;

          this.authService
            .login(value.email, value.password)
            .subscribe((tokenResponse: TokenReponse) => {
              this.authService.token = tokenResponse.token;
              this.router.navigate(['plants/']);
            });
        });
    }
  }

  private initForm() {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.matchPassword,
      }
    );
  }

  private matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control?.get('password')?.value;
    const confirmedPassword = control?.get('confirmPassword')?.value;

    if (password != confirmedPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
