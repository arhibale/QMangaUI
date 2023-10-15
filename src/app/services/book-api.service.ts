import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  private baseUrl = "https://localhost:7087/api/v1/book/"

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getBooksPage(page: number, pageSize: number) {
    return this.http.get<any>(`${this.baseUrl}page=${page}&size=${pageSize}`);
  }

  getBook(name: string) {
    return this.http.get<any>(`${this.baseUrl}name=${name}`)
  }

  upload(book: any) {
    return this.http.post<any>(`${this.baseUrl}upload/token=${this.auth.getToken()}`, book);
  }

  getTags() {
    return this.http.get<any>(`${this.baseUrl}tags`);
  }

  getAuthors() {
    return this.http.get<any>(`${this.baseUrl}authors`);
  }

  getArtists() {
    return this.http.get<any>(`${this.baseUrl}artists`);
  }

  getImages(name: string) {
    return this.http.get<any>(`${this.baseUrl}reader/name=${name}`);
  }
}
