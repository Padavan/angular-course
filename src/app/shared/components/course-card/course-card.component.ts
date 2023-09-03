import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  title: string = "Title";
  description: string = "Description";
  creationDate: string = "creationDate";
  duration: number = 0;
  authors: string[] = [];

  @Input() editable = true;
  @Input() course:any = {};

  @Input() clickOnShow() {
    console.log("clickOnShow");
  }

  @Input() editCourse() {
    console.log("course-card editCourse");
  }

  @Input() deleteCourse() {
    console.log("course-card deleteCourse");
  }

  ngOnInit() {
    const { title, description, creationDate, duration, authors } = this.course;
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.duration = duration;
    this.authors = authors;
  }
}
