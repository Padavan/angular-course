import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { mockedCoursesList } from './shared/mocks/mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}
  title = 'courses-app';
  emptyInfoTitle = "Your list is empty";
  emptyInfoText = "Please use 'Add New Course' button to add your first course";

  handleAddNewCourse() {
    console.log("handleAddNewCourse");
  }

  mockCourse = mockedCoursesList[0];

  user: string | null = null;
  buttonText = "Login";

  ngOnInit() {}

  handleLogin() {
    console.log("this.auth.isAuthorised", this.auth.isAuthorised);
    if (this.auth.isAuthorised) {
      this.auth.logout();
      // this.user = null;
      // this.buttonText = "Login";
    } else {
      this.router.navigate(['/login']);
      // this.buttonText = "Logout";
      // this.user = "John Doe"
    }
  }
}

