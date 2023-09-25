import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {NgOptimizedImage} from "@angular/common";
import {HomeComponent} from './components/home/home.component';
import {CatalogComponent} from './components/catalog/catalog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgToastModule} from "ng-angular-popup";
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    CatalogComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
