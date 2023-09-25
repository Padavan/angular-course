import { Injectable } from "@angular/core"
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { catchError, throwError } from "rxjs"
import { SessionStorageService } from "../services/session-storage.service"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Add your code here
  constructor(
    private sessionService: SessionStorageService,
  ) {} 

  intercept(request: HttpRequest<string>, next: HttpHandler) {  
    const token = this.sessionService.getToken()

    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }


    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect user to the logout page
          }
        }
        return throwError(err)
      }))

  }
}
