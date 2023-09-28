import { Component, OnInit } from "@angular/core"
import {
  FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { CoursesStoreService } from "@app/services/courses-store.service"
import { AddCourse, Author, Course } from "@app/shared/types/shared.types"
import { FaIconLibrary } from "@fortawesome/angular-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private courseStoreService: CoursesStoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    library.addIconPacks(fas)
  }
  courseForm!: FormGroup
  isEdit: string | null = null
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  allAuthorList: Array<{ id: string, name: string }> = [{ id: "1", name: "Author 1"}, { id: "2", name: "Author 2"}] 
  // authorList: Array<{ id: string, name: string }> = [];


  ngOnInit():void {
    const courseId = this.route.snapshot.paramMap.get("id")
    const initialValues: Partial<Course> = {
      title: "",
      description: "",
      authors: [],
      duration: 0,
    }

    this.courseStoreService.authors$.subscribe(a => {
      this.allAuthorList = a 
    })
    

    this.courseForm = this.fb.group({
      title: [initialValues.title, [Validators.required, Validators.minLength(2)]],
      description: [initialValues.description, [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array(initialValues.authors ?? []),
      duration: [initialValues.duration, [Validators.required, Validators.pattern("[0-9]*")]]
    })

    if (courseId) {
      this.isEdit = courseId
      this.courseStoreService
        .getCourse(courseId)
        .subscribe(courseData => {

          courseData.authors.forEach((id: string) => {
            const author = this.allAuthorList.find(a => a.id === id)
            if (author !== undefined) {
              this.authors.push(this.fb.group({
                id: [id, Validators.required],
                name: [author.name, Validators.required]
              }))
            }
          })

          this.courseForm.get("title")?.setValue(courseData.title)
          this.courseForm.get("description")?.setValue(courseData.description)
          this.courseForm.get("duration")?.setValue(courseData.duration)
        })
    }

    this.courseStoreService.authors$.subscribe(a => {
      this.allAuthorList = a
    })
  }

  author = new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9\\s]*") ])

  get authors() : FormArray<FormGroup> {
    return this.courseForm.controls["authors"] as FormArray<FormGroup>
  }

  selectAuthor = new FormControl("")

  addAuthor() {
    const name = this.author.getRawValue()

    if (!name) return

    this.courseStoreService.createAuthor(name).subscribe(
      newAuthor => {
        const newAuthorForm = this.fb.group({
          id: [newAuthor.id, Validators.required],
          name: [newAuthor.name, Validators.required]
        })
        this.authors.push(newAuthorForm)
        this.author.reset()
      }
    )
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex)
  }

  submitForm(form: FormGroup) {
    if (form.value !== undefined) {
      const addCourse: AddCourse = {
        title: form.value.title,
        description: form.value.description,
        duration: form.value.duration,
        authors: form.value.authors.map((author: Author) => author.id),
      }

      this.courseStoreService.createCourse(addCourse)
        .subscribe(resp => {
          if (resp.successful) {
            this.router.navigate(["/courses"])
          }
        })
    }
  }

  handleAuthorSelect(id: string) {
    const existingAuthor = this.allAuthorList.find(a => a.id === id)

    if (existingAuthor) {
      const newAuthor = this.fb.group({
        id: [existingAuthor.id, Validators.required],
        name: [existingAuthor.name, Validators.required]
      })

      this.authors.push(newAuthor)
      this.selectAuthor.reset()
    }
  }

  saveCourse(form: FormGroup) {
    if (form.value !== undefined && this.isEdit) {
      const saveCourse: AddCourse = {
        title: form.value.title,
        description: form.value.description,
        duration: form.value.duration,
        authors: form.value.authors.map((author: Author) => author.id),
      }

      this.courseStoreService.editCourse(this.isEdit, saveCourse)
        .subscribe(() => {
          this.router.navigate(["/courses"])
        })
    }
  }
}
