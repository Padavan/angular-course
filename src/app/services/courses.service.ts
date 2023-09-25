import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { SessionStorageService } from "@app/auth/services/session-storage.service"
import { AddCourse, ApiResponse, Author, Course } from "@app/shared/types/shared.types"
import { map, Observable } from "rxjs"

const API_URL = "http://localhost:4000"

// API CALLS
@Injectable({
  providedIn: "root"
})
export class CoursesService {
  constructor(
    private httpClient: HttpClient,
    private session: SessionStorageService,
  ) {}

  getAll():Observable<ApiResponse<Array<Course>>> {
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")

    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .get<ApiResponse<Course[]>>(API_URL + "/courses/all", { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }

  createCourse(course: AddCourse) { // replace 'any' with the required interface
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")

    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .post<Course>(API_URL + "/courses/add", course, { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }

  editCourse(id: string, course: AddCourse) { // replace 'any' with the required interface
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .put<Course>(API_URL + `/courses/${id}`, course, { headers: httpHeaders }).pipe(
        map(res => res),
      )

  }

  getCourse(id: string) {
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .get<ApiResponse<Course>>(API_URL + `/courses/${id}`, { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }

  deleteCourse(id: string) {
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .delete<void>(API_URL + `/courses/${id}`, { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }

  filterCourses(value: string) {
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .get<ApiResponse<Course[]>>(API_URL + `/courses/filter?title=${value}`, { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }

  getAllAuthors() {
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .get<ApiResponse<Author[]>>(API_URL + "/authors/all", { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }

  createAuthor(name: string) {
    // Add your code here

    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")

    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .post<ApiResponse<Author>>(API_URL + "/authors/add", { name }, { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }

  getAuthorById(id: string) {
    // Add your code here
    const sessionToken = this.session.getToken()
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")

    if (sessionToken) {
      httpHeaders = httpHeaders.set("Authorization", sessionToken)
    }

    return this.httpClient
      .get<ApiResponse<Author>>(API_URL + `/authors/${id}`, { headers: httpHeaders }).pipe(
        map(res => res),
      )
  }
}
