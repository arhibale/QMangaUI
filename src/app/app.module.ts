import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {NgOptimizedImage} from "@angular/common";
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgToastModule} from "ng-angular-popup";
import {ProfileComponent} from './components/profile/profile.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {ResetComponent} from './components/reset/reset.component';
import {NgxPaginationModule} from "ngx-pagination";
import {BookComponent} from './components/book/book.component';
import { ReaderComponent } from './components/reader/reader.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ResetComponent,
    BookComponent,
    ReaderComponent,
    BookAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
