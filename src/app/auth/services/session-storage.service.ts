import {Inject, Injectable} from "@angular/core"
import { WINDOW } from "@app/window.token"

const TOKEN = "SESSION_TOKEN" // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: "root"
})
export class SessionStorageService {

  constructor(
    @Inject(WINDOW) private windowWrapper: Window
  ) {}

  setToken(token: string){
    // Add your code here
    this.windowWrapper.sessionStorage.setItem(TOKEN, token)
  }

  getToken(): string | null {
    // Add your code here
    const token = this.windowWrapper.sessionStorage.getItem(TOKEN)

    return token
  }

  deleteToken(){
    // Add your code here
    this.windowWrapper.sessionStorage.removeItem(TOKEN)
  }
}
