import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {HomeComponent} from "./components/home/home.component";
import {CatalogComponent} from "./components/catalog/catalog.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
