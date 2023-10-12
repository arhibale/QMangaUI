import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;

  constructor(private api: UserApiService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.api.profile(this.auth.getToken()!)
      .subscribe(res => {
        this.user = res;
      })
  }
}
