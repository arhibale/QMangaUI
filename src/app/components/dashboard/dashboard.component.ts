import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: any = [];

  constructor(private api: UserApiService) {
  }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
      });
  }
}
