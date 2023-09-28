import { Component, Input, OnInit, Output } from "@angular/core"
import { Router } from "@angular/router"
import { Course } from "@app/shared/types/shared.types"
import { CoursesStateFacade } from "@app/store/courses/courses.facade"
import { UserStoreService } from "@app/user/services/user-store.service"

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CourseListComponent implements OnInit {
  title = "app-courses-app"

  constructor(
    private userStoreService: UserStoreService,
    private router: Router,
    private courseFacade: CoursesStateFacade,
  ) {}

  @Input() courses: Array<Course> | null = null
  @Input() editable = false

  @Output() showCourse(id: string) {
    this.router.navigate([`/courses/${id}`])
  }

  @Output() editCourse(id: string) {
    this.router.navigate([`/courses/edit/${id}`])
  }

  @Output() deleteCourse(id: string) {
    this.courseFacade.deleteCourse(id)
  }

  ngOnInit(): void {
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.editable = isAdmin
    })
  }

  onSearchEvent(searchValue: string) {
    this.courseFacade.getFilteredCourses(searchValue)
  }

  handleAddNewCourse() {
    this.router.navigate(["/courses/add"])
  }
}

