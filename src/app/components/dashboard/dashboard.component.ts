import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: any = [];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
      });
  }
}
