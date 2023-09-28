import { Injectable } from "@angular/core"
import { CanActivate } from "@angular/router"
import { UserStoreService } from "../services/user-store.service"

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate{
  // Add your code here
  constructor(
    private userService: UserStoreService,
  ){}
  
  // Add your code here
  canActivate() {
    if (this.userService.isAdmin) {
      return true
    } else {
      return false
    }
  }
}
