import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { ModalComponent } from "./components/modal/modal.component"
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  CourseFormComponent
} from "./components"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { DurationPipe } from "./pipes/duration.pipe"
import { CustomDatePipe } from "./pipes/custom-date.pipe"
import { EmailValidatorDirective } from "@shared/directives/email.directive"
import { HidePasswordDirective } from "@shared/directives/hide-passord.directive"
import { RouterModule } from "@angular/router"

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  CourseFormComponent,
  DurationPipe,
  CustomDatePipe,
  EmailValidatorDirective,
  HidePasswordDirective
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [components]
})
export class SharedModule { }
