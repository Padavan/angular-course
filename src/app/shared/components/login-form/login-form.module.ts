import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import {RouterModule, Routes} from "@angular/router"
import { SharedModule } from "@app/shared/shared.module"
import { LoginFormComponent } from "./login-form.component"
import { HttpClientModule } from "@angular/common/http"

const routes: Routes = [
  { path: "", component: LoginFormComponent }
]

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, LoginFormComponent]
})
export class LoginModule { }