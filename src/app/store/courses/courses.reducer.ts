import { Course } from "@app/shared/types/shared.types"
import { Action, createReducer, on } from "@ngrx/store"
import * as CourseAction from "./courses.actions"

// Add your code here
export const coursesFeatureKey = "courses"

export interface CoursesState {
    // Add your code here
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading:  boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null
  // Add your code here
}

// Add your code here
export const coursesReducer = createReducer(
  initialState,
  on(CourseAction.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
  })),
  on(CourseAction.requestAllCoursesSuccess, (state, action) => ({
    ...state,
    isAllCoursesLoading: false,
    allCourses: action.courses,
  })),
  on(CourseAction.requestAllCoursesFail, (state, action) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: action.error
  })),

  on(CourseAction.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
  })),
  on(CourseAction.requestSingleCourseSuccess, (state,action) => ({
    ...state,
    isSingleCourseLoading: false,
    course: action.course,
    errorMessage: null
  })),
  on(CourseAction.requestSingleCourseFail, (state, action) => ({
    ...state,
    isSingleCourseLoading: false,
    course: null,
    errorMessage: action.error,
  })),

  on(CourseAction.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,

  })),
  on(CourseAction.requestFilteredCoursesSuccess, (state, action) => ({
    ...state,
    isAllCoursesLoading: false,
    allCourses: action.courses,
    errorMessage: null,
  })),
  on(CourseAction.requestFilteredCoursesFail, (state, action) => ({
    ...state,
    isAllCoursesLoading: false,
    allCourses: [],
    errorMessage: action.error,
  })),

  on(CourseAction.requestDeleteCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    course: null,
    errorMessage: null,
  })),
  on(CourseAction.requestDeleteCourseSuccess, (state) => ({
    ...state,
    isSingleCourseLoading: false,
    course: null,
    errorMessage: null,
  })),
  on(CourseAction.requestDeleteCourseFail, (state, action) => ({
    ...state,
    isSingleCourseLoading: false,
    course: null,
    errorMessage: action.error,
  })),

  on(CourseAction.requestEditCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CourseAction.requestEditCourseSuccess, (state, action) => ({
    ...state,
    isSingleCourseLoading: false,
    course: action.course,
    errorMessage: null,
  })),
  on(CourseAction.requestEditCourseFail, (state, action) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: action.error,
  })),

  on(CourseAction.requestCreateCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    // course: action.course,
    errorMessage: null,
  })),
  on(CourseAction.requestCreateCourseSuccess, (state, action) => ({
    ...state,
    isSingleCourseLoading: false,
    course: action.course,
    errorMessage: null,
  })),
  on(CourseAction.requestCreateCourseFail, (state, action) => ({
    ...state,
    isSingleCourseLoading: false,
    course: null,
    errorMessage: action.error,
  })),

) 

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action)
