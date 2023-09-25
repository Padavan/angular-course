import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseFormComponent } from "@app/shared/components";
import { AdminGuard } from "@app/user/guards/admin.guard";
 
const routes: Routes = [
  {
    path: "",
    component: CoursesComponent
  },
  {
    path: "add",
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
  {
    path: ":id",
    loadChildren: () => import("../course-info/course-info.module").then(m => m.CourseInfoModule),
  },
  {
    path: "edit/:id",
    component: CourseFormComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}