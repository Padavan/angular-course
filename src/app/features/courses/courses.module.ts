import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [CoursesComponent, CourseListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutingModule
  ],
  exports: [CoursesComponent, CourseListComponent]
})
export class CoursesModule { }
