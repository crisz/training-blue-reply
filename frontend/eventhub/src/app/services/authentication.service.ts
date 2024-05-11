import { Injectable } from '@angular/core';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
	token = '';
  
  constructor() {
		this.loadToken();
	}


	async loadToken() {
	
	}

  login(credentials: { email: string; password: string }): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true); 
    });
  }

	logout(): boolean {
    return true;
	}
}
