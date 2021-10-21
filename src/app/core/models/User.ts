import { UserResponse } from './UserResponse';

export class User {
  email: string;
  url: string;
  date_joined: Date;
  last_login: Date;

  constructor(rawUser: UserResponse) {
    this.email = rawUser.email;
    this.url = rawUser.url;
    this.date_joined = new Date(rawUser.date_joined);
    this.last_login = new Date(rawUser.last_login);
  }
}
