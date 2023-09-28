import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { CoursesService } from "@app/services/courses.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, exhaustMap, of, tap } from "rxjs"
import * as CourseAction from "./courses.actions"

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private courseService: CoursesService,
    private router: Router
  ) {}

  // Add your code here

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(CourseAction.requestAllCourses),
    exhaustMap(() => this.courseService.getAll().pipe(
      map((courseResponse) => (CourseAction.requestAllCoursesSuccess({ courses: courseResponse.result }) )),
    )),
    catchError((errorResponse: Error) => of(CourseAction.requestAllCoursesFail({ error: errorResponse.message }) ))
  ))

  filteredCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CourseAction.requestFilteredCourses),
    exhaustMap((action) => this.courseService.filterCourses(action.title).pipe(
      map((response) => (CourseAction.requestFilteredCoursesSuccess({ courses: response.result }) ))
    )),
    catchError((error: Error) => of(CourseAction.requestFilteredCoursesFail({ error: error.message }) ))
  ))

  getSpecificCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CourseAction.requestSingleCourse),
    exhaustMap((action) => this.courseService.getCourse(action.id).pipe(
      map((response) => (CourseAction.requestSingleCourseSuccess({ course: response.result }) ))
    )),
    catchError((error: Error) => of(CourseAction.requestSingleCourseFail({ error: error.message }) ))
  ))

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CourseAction.requestDeleteCourse),
    exhaustMap((action) => this.courseService.deleteCourse(action.id).pipe(
      map(() => (CourseAction.requestDeleteCourseSuccess() ))
    )),
    catchError((error: Error) => of(CourseAction.requestDeleteCourseFail({ error: error.message }) ))
  ))

  editCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CourseAction.requestEditCourse),
    exhaustMap((action) => this.courseService.editCourse(action.id, action.course).pipe(
      map((response) => (CourseAction.requestEditCourseSuccess({ course: response.result }) ))
    )),
    catchError((error: Error) => of(CourseAction.requestEditCourseFail({ error: error.message}) ))
  ))

  createCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CourseAction.requestCreateCourse),
    exhaustMap((action) => this.courseService.createCourse(action.course).pipe(
      map((response) => (CourseAction.requestCreateCourseSuccess({ course: response.result }) ))
    )),
    catchError((error: Error) => of(CourseAction.requestCreateCourseFail({ error: error.message }) ))
  ))

  redirectToTheCoursesPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseAction.requestCreateCourseSuccess, CourseAction.requestEditCourseSuccess, CourseAction.requestSingleCourseFail),
      tap(() => this.router.navigate(["/courses"]))
    ),
    { dispatch: false }
  )
}


