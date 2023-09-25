import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "./auth/services/auth.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}
  title = "courses-app"
  isAuth: boolean = false

  user: string | null = null
  buttonText = "Login"

  ngOnInit() {
    this.auth.isAuthorized$.subscribe(isAuth => {
      this.isAuth = isAuth
      this.buttonText = isAuth ? "Logout" : "Login" 
    })
  }

  handleLogin() {
    if (this.isAuth) {
      this.auth.logout().subscribe(() => {
        this.router.navigate(["/login"])
      })
    } else {
      this.router.navigate(["/login"])
    }
  }
}

