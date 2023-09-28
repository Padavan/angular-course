import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CoursesStoreService } from "@app/services/courses-store.service"
import { Author, Course } from "@app/shared/types/shared.types"

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"]
})
export class CourseInfoComponent implements OnInit {
  courseInfo: Course | undefined = undefined
  authorsList: Author[] = []
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

    this.courseStoreService.authors$.subscribe(list => {
      this.authorsList = list
    })
  }

  handleBackButton() {
    this.router.navigate(["/courses"])
  }

  getAuthors(authors: string[]) {
    if (this.courseInfo === undefined) {
      return "-"
    }

    const authorList = this.authorsList.filter(author => authors.includes(author.id))
    return authorList.map(a => a.name).join(", ")
  }
}
