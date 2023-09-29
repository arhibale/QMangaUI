import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {TokenApiModel} from "../models/token-api.model";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleAUnAuthorizedError(request, next);
          }
        }
        return throwError(() => new Error(err.message))
      })
    );
  }

  handleAUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenApiModel) => {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);

          req = req.clone({
            setHeaders: {Authorization: `Bearer ${data.accessToken}`}
          });

          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            this.toast.warning({detail: "WARNING", summary:"Token is expired, please login again"});
            this.router.navigate(['']);
          })
        })
      );
  }
}
