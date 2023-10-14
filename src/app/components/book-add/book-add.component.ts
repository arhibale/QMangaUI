import {Component, OnInit} from '@angular/core';
import {BookApiService} from "../../services/book-api.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {from} from "rxjs";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  bookForm!: FormGroup;

  tags: Array<any> = [];
  authors: Array<any> = [];
  artists: Array<any> = [];

  dropdownSettings = {};

  constructor(private formBuilder: FormBuilder, private api: BookApiService, private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder
      .group({
        name: ['',Validators.required],
        description: ['', Validators.required],
        tags: ['', Validators.required],
        authors: ['', Validators.required],
        artists: ['', Validators.required],
        coverImage: this.formBuilder.array([]),
        images: this.formBuilder.array([])
      });

    this.api.getTags()
      .subscribe({
        next: (res: Array<any>) => {
          this.tags = res;
        }
      });

    this.api.getAuthors()
      .subscribe({
        next: (res: Array<any>) => {
          this.authors = res;
        }
      });

    this.api.getArtists()
      .subscribe({
        next: (res: Array<any>) => {
          this.artists = res;
        }
      });

    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  createItem({data}: { data: any }): FormGroup {
    return this.formBuilder.group(data);
  }

  get images(): FormArray {
    return this.bookForm.get('images') as FormArray;
  };

  get coverImage(): FormArray {
    return this.bookForm.get('coverImage') as FormArray;
  };

  detectFiles({event}: { event: any }) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(this.createItem({
            data: {
              file: <File>file,
              url: e.target.result
            }
          }));
        }
        reader.readAsDataURL(file);
      }
    }
  }

  detectFile({event}: { event: any }) {
    let file = event.target.files[0];
    this.coverImage.clear();
    if (file) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImage.push(this.createItem({
          data: {
            file: <File>file,
            url: e.target.result
          }
        }));
      }
      reader.readAsDataURL(file);
    }
  }

  removeImage({i}: { i: any }) {
    this.images.removeAt(i);
  }

  removeCoverImage() {
    this.coverImage.removeAt(0);
  }

  onSubmit() {
    if (this.coverImage.length == 0) {
      this.toast.warning({detail: "WARNING", summary: 'Cover image request!', duration: 5000});
      return;
    }

    if (this.images.length == 0) {
      this.toast.warning({detail: "WARNING", summary: 'Images request!', duration: 5000});
      return;
    }

    if (this.bookForm.valid) {
      let value = this.bookForm.value;
      let form = new FormData();
      form.append('name', value.name);
      form.append('description', value.description);

      for (let tag of value.authors) {
        form.append('authors', tag);
      }

      for (let tag of value.artists) {
        form.append('artists', tag);
      }

      for (let tag of value.tags) {
        form.append('tags', tag);
      }

      for (let file of this.coverImage.controls) {
        form.append('coverImage', file.value.file);
      }

      for (let file of this.images.controls) {
        form.append('images', file.value.file);
      }

      this.api.upload(form)
        .subscribe({
          next: (res) => {
            this.toast.success({detail: "SUCCESS", summary: res.message, duration: 5000});
            this.bookForm.reset();
            this.images.clear();
            this.coverImage.clear();
          },
          error: (err) => {
            this.toast.error({detail: "ERROR", summary: err, sticky: true, duration: 5000});
          }
        })
    } else {
      this.toast.warning({detail: "WARNING", summary: 'Something went wrong...', sticky: true, duration: 5000});
    }
  }
}
