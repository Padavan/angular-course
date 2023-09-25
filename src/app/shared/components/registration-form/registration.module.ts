 
import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import {RouterModule, Routes} from "@angular/router"
import { SharedModule } from "@app/shared/shared.module"
import { RegistrationFormComponent } from "./registration-form.component"

const routes: Routes = [
  { path: "", component: RegistrationFormComponent }
]

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule, RegistrationFormComponent]
})
export class RegistrrationModule { }