import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.'
  credentials: any;
  
  ngOnInit() {
    this.credentials = {
      email: "",
      password: "",
    };
  }

 onSubmit(form: NgForm) {
    console.log(form.valid, { credentials: this.credentials});
  }

}
