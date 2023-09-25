import { Injectable, OnInit } from "@angular/core"
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Observable, tap } from "rxjs"
import { SessionStorageService } from "./session-storage.service"
import { Router } from "@angular/router"
import { ApiResponse, Credentials } from "@app/shared/types/shared.types"

const API_URL = "http://localhost:4000"

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnInit {
  private isAuthorized$$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable()

  constructor(
    private httpClient: HttpClient,
    private session: SessionStorageService,
    private router: Router
  ) { }

  login(user: { email: string, password: string }) { // replace 'any' with the required interface
    // Add your code here
    return this.httpClient.post<ApiResponse<string>>(API_URL + "/login", user)
      .subscribe(
        data => {
          this.session.setToken(data.result)
          this.isAuthorised = true
          this.router.navigate(["/courses"])
        },
        (err: HttpErrorResponse) => console.error(`Got error: ${err}`)
      )
  }

  logout(): Observable<void> {
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")

    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient.delete<void>(API_URL + "/logout", { headers: httpHeaders }).pipe(
      tap(() => {
        this.session.deleteToken()
        this.isAuthorised = false
      }),
    )
  }

  register(user: Credentials) { // replace 'any' with the required interface
    // Add your code here
    return this.httpClient.post<void>(API_URL + "/register", user)
  }

  get isAuthorised() {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.value
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value)
  }

  getLoginUrl() {
    // Add your code here
  }

  ngOnInit(): void {
    if (this.session.getToken()) {
      this.isAuthorised = true
    }
  }
}
