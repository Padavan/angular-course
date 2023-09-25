import { Injectable } from "@angular/core"
import { Router, CanLoad } from "@angular/router"
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root"
})
export class NotAuthorizedGuard implements CanLoad {
  // Add your code here
  constructor(
        private auth: AuthService,
        private router: Router
  ){}

  canLoad() {
    if (!this.auth.isAuthorised) {
      return true
    } else {
      return this.router.parseUrl("/course")
    }
  }
}
