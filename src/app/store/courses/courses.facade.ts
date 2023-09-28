import { Injectable } from "@angular/core"
import { AddCourse } from "@app/shared/types/shared.types"
import { Store } from "@ngrx/store"
import { AppState } from ".."
import * as CourseAction from "./courses.actions"
import * as CourseSelector from "./courses.selectors"

@Injectable({
  providedIn: "root"
})
export class CoursesStateFacade {
  // Add your code here
  isAllCoursesLoading$ = this.store.select(CourseSelector.isAllCoursesLoadingSelector)
  isSingleCourseLoading$ = this.store.select(CourseSelector.isSingleCourseLoadingSelector)
  isSearchingState$ = this.store.select(CourseSelector.isSearchingStateSelector)
  courses$ = this.store.select(CourseSelector.getAllCourses)
  course$ = this.store.select(CourseSelector.getCourse)
  errorMessage$ = this.store.select(CourseSelector.getErrorMessage)
  allCourses$ = this.store.select(CourseSelector.getAllCourses)

  constructor(
    private store: Store<AppState>
  ) {}

  getAllCourses() {
    this.store.dispatch(CourseAction.requestAllCourses())
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CourseAction.requestSingleCourse({ id }))
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(CourseAction.requestFilteredCourses({ title: searchValue }))
  }

  editCourse(body: AddCourse, id: string) {
    this.store.dispatch(CourseAction.requestEditCourse({ course: body, id }))
  }

  createCourse(body:AddCourse) {
    this.store.dispatch(CourseAction.requestCreateCourse({ course: body }))
  }

  deleteCourse(id: string) {
    this.store.dispatch(CourseAction.requestDeleteCourse({ id }))
  }
}
