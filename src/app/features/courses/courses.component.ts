import { Component, OnInit } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/types/shared.types';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  data: Course[] = [];
  isLoading: boolean = false;

  constructor(
    private courseStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.courseStoreService.getAll().subscribe();
    this.courseStoreService.courses$.subscribe(list => {
      this.data = list;
    })

    this.courseStoreService.isLoading$.subscribe(state => {
      this.isLoading = state
    });

    this.courseStoreService.getAllAuthors().subscribe();
    this.userStoreService.getUser().subscribe();
  }
}
