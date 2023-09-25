import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "https://localhost:7087/api/v1/user/"

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: any) {
    return this.http.post<any>(`${this.baseUrl}registration`, user);
  }

  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}login`, user);
  }

  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
