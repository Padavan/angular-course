import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CourseListComponent {
  title = 'app-courses-app';
  @Input() courses: Array<any> = [];
  @Input() editable = false;

  @Output() showCourse() {
    console.log("showCourse");
  }

  @Output() editCourse() {
    console.log("editCourse");
  }

  @Output() deleteCourse() {
    console.log("deleteCourse");
  }
}

