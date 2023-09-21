import {Injectable, Inject} from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(
    // private window: Window
  ) {}

  setToken(token: string){
    // Add your code here
    window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    // Add your code here
    const token = window.sessionStorage.getItem(TOKEN);

    return token;
  }

  deleteToken(){
    // Add your code here
    window.sessionStorage.removeItem(TOKEN);
  }
}
