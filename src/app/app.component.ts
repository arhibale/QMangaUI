import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserStoreService} from "./services/user-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username: string = "";
  role: string = "";

  constructor(private auth: AuthService, private userStore: UserStoreService) {
  }

  ngOnInit(): void {
    this.userStore.getUsernameFromStore()
      .subscribe(val => {
        const usernameFromToken = this.auth.getUsernameFromToken();
        this.username = val || usernameFromToken;
      })

    this.userStore.getRoleFromStore()
      .subscribe(value => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = value || roleFromToken;
      })
  }

  logout() {
    this.auth.logout();
  }

  isAuth() {
    return this.auth.isLoggedIn();
  }
}
