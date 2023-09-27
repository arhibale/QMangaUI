import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResetPassword} from "../models/reset-password.model";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl = "https://localhost:7087/api/v1/user/";

  constructor(private http: HttpClient) {
  }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseUrl}send-email-reset-password/${email}`, {});
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetPassword);
  }
}
