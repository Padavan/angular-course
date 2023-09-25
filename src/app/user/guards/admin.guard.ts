import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  // Add your code here
  constructor(
    private userService: UserStoreService,
    private router: Router
  ){}
  
  // Add your code here
  canActivate(route: Route, segments: UrlSegment[]) {
    if (this.userService.isAdmin) {
      return true;
    } else {
      return this.router.parseUrl('/courses');
    }
  }
}
