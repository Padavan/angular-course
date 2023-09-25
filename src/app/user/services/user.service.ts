import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { map } from 'rxjs/operators';

const API_URL = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private session: SessionStorageService,
  ) {}

  getUser() {
  // Add your code here
    const sessionToken = this.session.getToken();
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    if (sessionToken) {
      httpHeaders = httpHeaders.set('Authorization', sessionToken);
    }

    return this.httpClient
      .get<any>(API_URL + `/users/me`, { headers: httpHeaders }).pipe(
        map(res => res),
      );  
  }
}
