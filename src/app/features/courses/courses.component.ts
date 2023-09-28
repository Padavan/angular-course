import { Component, OnInit } from "@angular/core"
import { CoursesStateFacade } from "@app/store/courses/courses.facade"
import { UserStoreService } from "@app/user/services/user-store.service"
import { CoursesStoreService } from "@app/services/courses-store.service"

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"]
})
export class CoursesComponent implements OnInit {
  data = this.courseFacade.allCourses$
  isLoading = this.courseFacade.isAllCoursesLoading$

  constructor(
    private userStoreService: UserStoreService,
    private courseFacade: CoursesStateFacade,
    private courseStoreService: CoursesStoreService,
  ) {
    this.courseFacade.getAllCourses()
    this.courseStoreService.getAllAuthors().subscribe()
  }

  ngOnInit(): void {
    this.userStoreService.getUser().subscribe()
  }
}
