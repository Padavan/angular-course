import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Router } from "@angular/router"
import { CoursesStoreService } from "@app/services/courses-store.service"
import { Author, Course } from "@app/shared/types/shared.types"
import { UserStoreService } from "@app/user/services/user-store.service"

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"]
})
export class CourseCardComponent {
  id: string = ""
  title: string = "Title"
  description: string = "Description"
  creationDate: string = "creationDate"
  duration: number = 0
  authors: string = "-"
  routerLink: string | undefined

  constructor(
    private router: Router,
    private courseStoreService: CoursesStoreService,
    private userStoreService: UserStoreService
  ){}

  @Input() editable = true
  @Input() course: Course | undefined

  @Output() clickOnShow = new EventEmitter<string>()

  handleShowCourse() {
    this.clickOnShow.emit(this.id)
  }

  ngOnInit() {
    if (!this.course) {
      return
    }
    this.courseStoreService.authors$.subscribe((fullList: Author[]) => {
      if (this.course?.authors) {
        this.authors = this.getAuthors(fullList, this.course.authors)
      }
    })

    this.title = this.course.title
    this.description = this.course.description
    this.creationDate = this.course.creationDate
    this.duration = this.course.duration
    
    this.id = this.course.id
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.editable = isAdmin
    })
  }

  getAuthors(fullAuthorList: Array<Author>, authors: Array<string>): string {
    const authorList = fullAuthorList.filter(author => authors.includes(author.id))
    return authorList.map(a => a.name).join(", ")
  }
}
