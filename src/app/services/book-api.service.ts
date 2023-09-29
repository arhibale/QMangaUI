import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
private baseUrl = "https://localhost:7087/"
  constructor(private http: HttpClient) { }

  getBooksPage(page: number, pageSize: number) {
    return this.http.get<any>(`${this.baseUrl}page=${page}&size=${pageSize}`);
  }
}
