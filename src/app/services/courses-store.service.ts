import { Injectable } from '@angular/core';
import { AddCourse, Author, Course } from '@app/shared/types/shared.types';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  courses$$ = new BehaviorSubject<Course[]>([]);
  courses$: Observable<any> = this.courses$$.asObservable();
  authors$$ = new BehaviorSubject<Author[]>([]);
  authors$: Observable<Author[]> = this.authors$$.asObservable();
  isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
 
  constructor(private courseService: CoursesService) {}

  getAll(): Observable<any> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.courseService.getAll().pipe(
      map((response:any) => response.result),
      tap(courses => this.courses$$.next(courses)),
      tap(() => this.isLoading$$.next(false)),
    );
  }

    createCourse(course: AddCourse) { // replace 'any' with the required interface
      // Add your code here
      return this.courseService.createCourse(course);
    }

    getCourse(id: string) {
      // Add your code here
      return this.courseService.getCourse(id).pipe(
        map((response:any) => response.result),
      );
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
      // Add your code here
      return this.courseService.editCourse(id, course).pipe(
        switchMap(() => this.getAll()),
        tap(courses => this.courses$$.next(courses))
      );
    }

    deleteCourse(id: string) {
      // Add your code here
      return this.courseService.deleteCourse(id).pipe(
        switchMap(() => this.getAll()),
        tap(courses => this.courses$$.next(courses)),
      );
    }

    filterCourses(value: string) {
      // Add your code here
      return this.courseService.filterCourses(value).pipe(
        map(res => res.result),
        tap(courses => this.courses$$.next(courses))
      );
    }

    getAllAuthors() {
      // Add your code here
      return this.courseService.getAllAuthors().pipe(
        map((response:any) => response.result),
        tap(authors => this.authors$$.next(authors))
      );
    }

    createAuthor(name: string) {
      // Add your code here
      return this.courseService.createAuthor(name).pipe(
        map((response: any) => response.result),
        tap(() => this.getAllAuthors().subscribe()),
      );
    }

    getAuthorById(id: string) {
      // Add your code here
      return this.courseService.getAuthorById(id).pipe(
        map((response:any) => response.result),
      );
    }
  }
