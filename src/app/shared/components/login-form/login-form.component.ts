import { Component, ViewChild } from "@angular/core"
import { NgForm } from "@angular/forms"
import { AuthService } from "@app/auth/services/auth.service"

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  constructor(private authService: AuthService) {}

  @ViewChild("loginForm") public loginForm!: NgForm
  //Use the names `email` and `password` for form controls.'
  credentials: { email: string | null, password: string | null } = {
    email: null,
    password: null,
  }

  onSubmit() {
    this.authService.login({
      email: this.credentials?.email || "",
      password: this.credentials?.password || ""
    })
  }
}
