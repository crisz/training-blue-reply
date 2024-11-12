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

  setUserLogged(user : UserObj) {
    //memorizza utente nello storage
    sessionStorage.setItem('user',JSON.stringify(user));
    // Genera un valore casuale
    const randomValue = Math.random().toString(36).substring(2, 10); // stringa alfanumerica casuale
    // Concatena l'id dell'utente con il valore casuale
    const userToken = `${user.id}-${randomValue}`;
    // Calcola la scadenza del cookie a 1 ora
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + (1 * 60 * 60 * 1000)); // 1 ora in millisecondi

    // Salva il token nel cookie
    document.cookie = `userId=${userToken}; expires=${expirationTime.toUTCString()}; path=/; secure; samesite=strict`;
  }

  getUserLogged():UserObj{
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  isLoggedIn(): boolean {
   // Verifica l’esistenza del cookie 'userId'
    return document.cookie.split('; ').some(cookie => cookie.startsWith('userId='));
  }

  logout() {
    sessionStorage.removeItem('user');
  }
  
  resetSessionData(){
    sessionStorage.clear();
  }
}
