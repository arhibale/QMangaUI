import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl = "https://localhost:7087/api/v1/user/";

  constructor(private http: HttpClient) {
  }
}
