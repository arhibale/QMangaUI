import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {HomeComponent} from "./components/home/home.component";
import {CatalogComponent} from "./components/catalog/catalog.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";
import {creatorGuard} from "./guards/creator.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {ResetComponent} from "./components/reset/reset.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [creatorGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'reset', component: ResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
