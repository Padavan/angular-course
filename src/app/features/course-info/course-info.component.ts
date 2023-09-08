import { Component, Input } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course: any | null = null;

  getCreationDate() {
    if (!this.course) {
      return "-";
    }

    return this.course.creationDate.split("/").join(".");
  }

  getDuration() {
    if (!this.course) {
      return "-";
    }

    const hours = Math.floor(this.course.duration / 60).toString();
    const minutes = Math.floor(this.course.duration % 60).toString();

    return hours.padStart(1, "0") + ":" + minutes.padStart(2, "0");

  }

  getAuthors() {
    if (!this.course) {
      return "-";
    }

    const authorList = mockedAuthorsList.filter(author => this.course.authors.includes(author.id));
    return authorList.map(a => a.name).join(", ");
  }
}
