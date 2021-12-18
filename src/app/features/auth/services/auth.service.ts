import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { User } from '@core/models/User';
import { UserResponse } from '@core/models/UserResponse';
import { TokenReponse } from '@core/models/TokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Subject<User> = new Subject();
  token: string;

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`api/users/`, {
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<TokenReponse> {
    return this.http.post<TokenReponse>(`api/token/`, {
      email,
      password,
    });
  }
}
