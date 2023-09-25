import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
import { Credentials } from '@app/shared/types/shared.types';

const API_URL = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private isAuthorized$$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private session: SessionStorageService,
    private router: Router
    ) { }

    login(user: { email: string, password: string }) { // replace 'any' with the required interface
      // Add your code here
      return this.httpClient.post<any>(API_URL + '/login', user)
      .subscribe(
        data => {
          this.session.setToken(data.result);
          this.isAuthorised = true;
          this.router.navigate(["/courses"]);
        },
        (err: HttpErrorResponse) => console.error(`Got error: ${err}`)
      );
    }

    logout(): Observable<any> {
      // Add your code here
      const sessionToken = this.session.getToken();
      let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

      if (sessionToken) {
        httpHeaders = httpHeaders.set('Authorization', sessionToken);
      }

      return this.httpClient.delete(API_URL + "/logout", { headers: httpHeaders }).pipe(
        map(res => res),
        tap((data) => {
          this.session.deleteToken();
          this.isAuthorised = false;
        }),
        catchError((err, caugth) => {
          console.error(`Got error: ${err}`)
          return caugth;
        }),
        );
    }

    register(user: Credentials) { // replace 'any' with the required interface
      // Add your code here
      return this.httpClient.post<any>(API_URL + '/register', user).pipe(
        map(res => res)
      )
    }

    get isAuthorised() {
      // Add your code here. Get isAuthorized$$ value
      return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
      // Add your code here. Change isAuthorized$$ value
      this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
      // Add your code here
    }

    ngOnInit(): void {
      if (this.session.getToken()) {
        this.isAuthorised = true;
      }
    }
  }
