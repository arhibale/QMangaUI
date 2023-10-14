import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;

  constructor(private api: UserApiService, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.api.profile(this.auth.getToken()!)
      .subscribe(res => {
        this.user = res;
      })
  }

  followBook(name: string) {
    const buttonRef = document.getElementById("closeModalBtn");
    buttonRef?.click();
    this.router.navigate(['book', name]);
  }
}
