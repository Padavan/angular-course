import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CoursesStoreService } from "@app/services/courses-store.service"
import { Author } from "@app/shared/types/shared.types"
import { CoursesStateFacade } from "@app/store/courses/courses.facade"

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"]
})
export class CourseInfoComponent implements OnInit {
  courseInfo$ = this.courseFacade.course$
  authors:Author[] = []
  constructor(
    private courseFacade: CoursesStateFacade,
    private courseStoreService: CoursesStoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get("id")
    if (courseId) {
      this.courseFacade.getSingleCourse(courseId)
    }

    this.courseStoreService.authors$.subscribe(list => {
      this.authors = list
    })
  }

  handleBackButton() {
    this.router.navigate(["/courses"])
  }

  getAuthors(courseAuthors: string[]) {

    const authorList: Author[] = [] 
    this.authors.filter(author => courseAuthors.includes(author.id))
    return authorList.map(a => a.name).join(", ")
  }
}
