import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CoursesStoreService } from "@app/services/courses-store.service"
import { mockedAuthorsList } from "@app/shared/mocks/mock"
import { Course } from "@app/shared/types/shared.types"

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"]
})
export class CourseInfoComponent implements OnInit {
  courseInfo: Course | undefined = undefined
  constructor(
    private courseStoreService: CoursesStoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get("id")
    if (courseId) {
      this.courseStoreService
        .getCourse(courseId)
        .subscribe(info => {
          this.courseInfo = info
        })
    }
  }

  handleBackButton() {
    this.router.navigate(["/courses"])
  }

  getAuthors() {
    if (this.courseInfo === undefined) {
      return "-"
    }

    const authorList = mockedAuthorsList.filter(author => this.courseInfo?.authors.includes(author.id))
    return authorList.map(a => a.name).join(", ")
  }
}
