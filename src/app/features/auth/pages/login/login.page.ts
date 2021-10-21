import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { TokenReponse } from '@core/models/TokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isSpinnerVisible = false;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
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
        .login(value.email, value.password)
        .subscribe((tokenResponse: TokenReponse) => {
          this.authService.token = tokenResponse.token;
          this.router.navigate(['plants/']);
        });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
