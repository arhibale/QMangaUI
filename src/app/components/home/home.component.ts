import {Component, OnInit} from '@angular/core';
import {BookApiService} from "../../services/book-api.service";
import {NgToastService} from "ng-angular-popup";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public books: any = [];
  public pageNumber = 1;
  public count!: number;

  constructor(private api: BookApiService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.onPageChange(1);
  }

  onPageChange(event: number) {
    this.api.getBooksPage(event, 12)
      .subscribe({
        next: (res) => {
          this.pageNumber = res.pageIndex;
          this.count = res.count;
          this.books = res.items;
          console.log(res);
        },
        error: (err) => {
          this.toast.error({detail: "ERROR", summary: err.message, sticky: true, duration: 5000})
          console.log(err);
        }
      })
  }
}
