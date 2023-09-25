import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/types/shared.types';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CourseListComponent implements OnInit {
  title = 'app-courses-app';

  constructor(
    private courseStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  @Input() courses: Array<Course> = [];
  @Input() editable = false;

  @Output() showCourse() {
    console.log("showCourse courses-list");
  }

  @Output() editCourse(id: string) {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  @Output() deleteCourse(id: string) {
    this.courseStoreService.deleteCourse(id).subscribe();
  }

  ngOnInit(): void {
    // this.courseService.getAll();
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.editable = isAdmin;
    })

    this.courseStoreService.courses$.subscribe(list => {
      if (list.length === 0) {
        this.emptyInfoText = "Your list is empty";
        this.emptyInfoText = "Please use 'Add New Course' button to add your first course";
      } else {
        this.emptyInfoText = "";
        this.emptyInfoText = "";
      }
    })
  }

  onSearchEvent(searchValue: any) {
    console.log("onSearchEvent course list", searchValue);
    this.courseStoreService.filterCourses(searchValue).subscribe();
  }

  handleAddNewCourse() {
    this.router.navigate([`/courses/add`]);
  }

  emptyInfoText = "";
  emptyInfoTitle = "";
}

