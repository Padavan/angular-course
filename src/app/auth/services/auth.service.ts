import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';

const API_URL = "http://localhost:4000";

type User = {
    name: string,
    password: string,
    username: string,
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private isAuthorized$$ = new Observable<boolean>(observer => observer.next(false));

    private isAuthorized$$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    constructor(
        private httpClient: HttpClient,
        private session: SessionStorageService,
        private router: Router
    ) { }

    login(user: { email: string, password: string }) { // replace 'any' with the required interface
        // Add your code here
        this.httpClient.post<any>(API_URL + '/login', user)
           .subscribe(
            data => {
                console.log(`data:`, data)
                this.session.setToken(data.result);
                this.isAuthorised = true;
                this.router.navigate(["/courses"]);
            },
             (err: HttpErrorResponse) => console.log(`Got error: ${err}`)
           );
    }

    logout() {
        // Add your code here
        const token = this.session.getToken();

        if (token) {
            let httpHeaders = new HttpHeaders()
               .set('Content-Type', 'application/json')
               .set('Authorization', token);

            this.httpClient.delete(API_URL + "/logout", { headers: httpHeaders }).subscribe(
                (data) => {
                    console.log(`data:`, data)
                    this.session.deleteToken();
                    this.isAuthorised = false;
                },
                (err: HttpErrorResponse) => console.log(`Got error: ${err}`)
            );

        }
    }

    register(user: any) { // replace 'any' with the required interface
        // Add your code here
    }

    get isAuthorised() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
        // Add your code here. Change isAuthorized$$ value
    }

    getLoginUrl() {
        // Add your code here
    }
}
