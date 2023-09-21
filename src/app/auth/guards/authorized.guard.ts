import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(
        private auth: AuthService,
        private router: Router
    ){}
    // Add your code here
    canLoad(route: Route, segments: UrlSegment[]) {
        const isAuthorised = this.auth.isAuthorised;
        console.log("ROUTE", isAuthorised);
        if (isAuthorised) {
            return this.auth.isAuthorised;
        } else {
            return this.router.parseUrl('/login');
            // this.route.navigate()
        }
    }
}
