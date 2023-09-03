import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: string | null = null;
  buttonText = "Login";
  headerButtonIcon = null;

  handleLogin = () => {
    if (this.user) {
      this.user = null;
      this.buttonText = "Login";
    } else {
      this.buttonText = "Logout";
      this.user = "U.N. Owen"
    }
  }
}
