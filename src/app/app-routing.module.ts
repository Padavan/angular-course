import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router" // CLI imports router
import { AuthorizedGuard } from "./auth/guards/authorized.guard"
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard"

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./shared/components/login-form/login-form.module").then(m => m.LoginModule),
    canLoad: [ NotAuthorizedGuard ],
  },
  {
    path: "registration",
    loadChildren: () => import("./shared/components/registration-form/registration.module").then(m => m.RegistrrationModule),
    canLoad: [ NotAuthorizedGuard ],
  },
  {
    path: "courses",
    loadChildren: () => import("./features/courses/courses.module").then(m => m.CoursesModule),
    canLoad: [ AuthorizedGuard ],
  },
  { path: "", redirectTo: "/courses", pathMatch: "full" },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }