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

  login(credentials: { email: string; password: string , username:string}): Promise<any> {
    return firstValueFrom(this.httpClient.post('api/auth/login', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    }));
  }

  register(credentials: { email: string; password: string , username:string}): Promise<any> {
    return firstValueFrom(this.httpClient.post('api/auth/signup', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    }));
  }

  setUserLogged(user : string){
    sessionStorage.setItem('user',user);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }

  logout() {
    sessionStorage.removeItem('user');
  }
  
  resetSessionData(){
    sessionStorage.clear();
  }
}
