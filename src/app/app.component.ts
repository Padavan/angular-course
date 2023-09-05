import { Component, OnInit } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
    console.log("handleLogin")
    if (this.user) {
      this.user = null;
      this.buttonText = "Login";
    } else {
      this.buttonText = "Logout";
      this.user = "John Doe"
    }
  }

}

