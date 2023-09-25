import { Component, OnInit } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "@app/auth/services/auth.service"
import { emailValidator } from "@app/shared/directives/email.directive"
import { Credentials } from "@app/shared/types/shared.types"

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup
  // Use the names `name`, `email`, `password` for the form controls.
  credentials:Credentials = {
    name: "",
    email: "",
    password: "",
  }  

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl(this.credentials.name, [
        Validators.required,
        Validators.minLength(6)
      ]),
      email: new FormControl("", [Validators.required, emailValidator()]),
      password: new FormControl("", [Validators.required]),
    }) 
  }

  onSubmit(f: FormGroup) {
    this.authService.register(f.value)
      .subscribe(res => {
        if (res.successful) {
          this.router.navigate(["/login"])
        }
      })
  }
}
