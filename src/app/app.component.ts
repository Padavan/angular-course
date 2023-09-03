import { Component } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  emptyInfoTitle = "Your list is empty";
  emptyInfoText = "Please use 'Add New Course' button to add your first course";

  addNewCourse() {
    console.log("addNewCourse()");
  } 

  mockCourse = mockedCoursesList[0];
}

