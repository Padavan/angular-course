import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';
import { AppLoader } from '@app/loader/loader.component';

@NgModule({
  declarations: [CoursesComponent, CourseListComponent, AppLoader],
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutingModule
  ],
  exports: [CoursesComponent, CourseListComponent, AppLoader]
})
export class CoursesModule { }
