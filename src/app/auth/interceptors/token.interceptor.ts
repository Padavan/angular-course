import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Add your code here
    constructor(private authService: AuthService) {} 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        const token = this.authService.getAuthToken();

    if (token) {
     // If we have a token, we set it to the header
        request = request.clone({
        setHeaders: {Authorization: `Authorization token ${token}`}
     });
  }
}
