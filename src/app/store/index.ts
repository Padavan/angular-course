import { ActionReducerMap } from "@ngrx/store"
import { CoursesEffects } from "./courses/courses.effects"
import { coursesReducer, CoursesState } from "./courses/courses.reducer"


export interface AppState {
  courses: CoursesState
}

export const reducers: ActionReducerMap<AppState> = {
  courses: coursesReducer
}

export const effects = [
  CoursesEffects
]