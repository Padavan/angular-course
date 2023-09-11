import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.
  credentials: any;


  ngOnInit(): void {
    this.credentials = {
      name: "",
      email: "",
      password: "",
    };  

    this.registrationForm = new FormGroup({
      title: new FormControl(this.credentials.name, [
        Validators.required,
        Validators.minLength(6)
      ]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }); 

  }

  onSubmit(f: FormGroup) {
    console.log("onSubmit", f.value, f.valid);
  }
}
