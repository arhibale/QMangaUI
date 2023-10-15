import {Component, OnInit} from '@angular/core';
import {BookApiService} from "../../services/book-api.service";
import {switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
  url: string = "";
  name!: string;
  imgUrl!: string;
  cur!: number;
  imageUrls: any = [];

  constructor(private route: ActivatedRoute, private api: BookApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(params => params.getAll('name')))
      .subscribe(data => this.name = data);

    this.url = `https://localhost:7087/Resources/Images/${this.name.replace(/\s/g, "_")}/`

    this.api.getImages(this.name)
      .subscribe({
        next: (res) => {
          this.imageUrls = res;
          this.imgUrl = `${this.url}${this.imageUrls[0]}`
          this.cur = 0;
        }
      })
  }

  prev() {
    if (this.cur <= 0) {
      this.router.navigate(['/book', this.name])
    }
    this.cur--;
    this.imgUrl = `${this.url}${this.imageUrls[this.cur]}`
  }

  next() {
    if (this.cur >= this.imageUrls.length - 1) {
      this.router.navigate(['/book', this.name])
    }
    this.cur++;
    this.imgUrl = `${this.url}${this.imageUrls[this.cur]}`
  }
}
