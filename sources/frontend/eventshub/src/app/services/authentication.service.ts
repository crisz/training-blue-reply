import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserObj } from '../models/user';

@Injectable({
  providedIn: 'root',
})



export class AuthenticationService {
  
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

  setUserLogged(user : UserObj){
    sessionStorage.setItem('user',JSON.stringify(user));
  }

  getUserLogged():UserObj{
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
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
