import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mock';
import { Course } from '../types';

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
  authors: string = "-";

  @Input() editable = true;
  @Input() course: Course | undefined;

  @Output() clickOnShow = new EventEmitter();

  handleShowCourse() {
    console.log("handleShowCourse");
    this.clickOnShow.emit();
  }

  ngOnInit() {
    if (!this.course) {
      return;
    }
    this.title = this.course.title;
    this.description = this.course.description;
    this.creationDate = this.course.creationDate;
    this.duration = this.course.duration;
    this.authors = this.getAuthors(this.course.authors);
  }

  getAuthors(authors: Array<string>): string {
    const authorList = mockedAuthorsList.filter(author => authors.includes(author.id));
    return authorList.map(a => a.name).join(", ");
  }
}
