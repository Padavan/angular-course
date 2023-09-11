import { Component, Input } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course: any | null = null;

  getAuthors() {
    if (!this.course) {
      return "-";
    }

    const authorList = mockedAuthorsList.filter(author => this.course.authors.includes(author.id));
    return authorList.map(a => a.name).join(", ");
  }
}
