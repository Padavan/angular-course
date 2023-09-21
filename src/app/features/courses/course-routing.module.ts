import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseFormComponent } from "@app/shared/components";
 
const routes: Routes = [
  {
    path: "",
    component: CoursesComponent
  },
  // {
  //   path: "edit",
  //   component: CourseFormComponent
  // },
  // {
  //   path: ":id",
  //   loadChildren: () => import("../course-info/course-info.module").then(m => m.CourseInfoModule)
  // },
  // {
  //   path: "edit/:id",
  //   component: CourseFormComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}