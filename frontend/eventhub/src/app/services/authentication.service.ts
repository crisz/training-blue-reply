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
    return Promise.resolve(true);
  }

	logout(): boolean {
    return true;
	}
}
