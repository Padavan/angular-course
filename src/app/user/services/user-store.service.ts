import { Injectable } from "@angular/core"
import { User } from "@app/shared/types/shared.types"
import { BehaviorSubject, Observable } from "rxjs"
import { map, tap } from "rxjs/operators"
import { UserService } from "./user.service"

@Injectable({
  providedIn: "root"
})
export class UserStoreService {
  name$$ = new BehaviorSubject<string>("")
  name$: Observable<string> = this.name$$.asObservable()
  isAdmin$$ = new BehaviorSubject<boolean>(false)
  isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable()

  constructor(
    private userService: UserService,
  ) {}

  getUser() {
    // Add your code here
    return this.userService.getUser().pipe(
      map((response) => response.result),
      tap((user: User) => {
        this.name$$.next(user.name)
        this.isAdmin = (user.role === "admin")
      })
    )
  }

  get isAdmin(): boolean {
    // Add your code here. Get isAdmin$$ value
    return this.isAdmin$$.value
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
    this.isAdmin$$.next(value)
  }
}
