import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
	token = '';
  
  constructor(private httpClient: HttpClient) {
	}

  login(credentials: { email: string; password: string }): Promise<any> {
    return firstValueFrom(this.httpClient.post('api/auth/login', {
      username: credentials.email,
      email: credentials.email,
      password: credentials.password
    }));
  }

  register(credentials: { email: string; password: string }): Promise<any> {
    return firstValueFrom(this.httpClient.post('api/auth/signup', {
      username: credentials.email,
      email: credentials.email,
      password: credentials.password
    }));
  }

	logout(): boolean {
    return true;
	}
}
