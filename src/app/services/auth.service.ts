import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenApiModel} from "../models/token-api.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "https://localhost:7087/api/v1/user/";
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
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

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;

    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken() {
    if (this.userPayload) {
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
}
