import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: string = "false";
  name:string = "";

  constructor(
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.userStoreService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin.toString());
    this.userStoreService.name$.subscribe(name => this.name = name);
  }

  getUserString() {
    return `${this.name}, isAdmin: ${this.isAdmin.toString()}`
  }
}
