import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username = '';
  userRole = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      this.username = username;
    });
    this.userRole = this.authService.getUserRole();
    this.isLoggedIn = this.authService.isUserLoggedIn();
    console.log("username: ", this.username);
    console.log("userRole: ", this.userRole);
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
  }
}
