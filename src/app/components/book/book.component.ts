import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {BookApiService} from "../../services/book-api.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  url: string = "https://localhost:7087/Resources/Images/";
  imageCover: string = "";
  name!: string;
  book!: any;

  constructor(private route: ActivatedRoute, private api: BookApiService) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(params => params.getAll('name')))
      .subscribe(data => this.name = data);

    this.api.getBook(this.name)
      .subscribe({
        next: (res) => {
          this.book = res;
          this.imageCover = this.url + this.book.name.replace(/\s/g, "_") + '/' + this.book.coverImagePath;
        }
      })

  }
}
