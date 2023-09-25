import { Injectable } from "@angular/core"
import { CanLoad, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root"
})
export class AuthorizedGuard implements CanLoad {
  constructor(
        private auth: AuthService,
        private router: Router
  ){}
  // Add your code here
  canLoad() {
    if (this.auth.isAuthorised) {
      return true
    } else {
      return this.router.parseUrl("/login")
    }
  }
}
