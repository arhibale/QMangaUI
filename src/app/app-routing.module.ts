import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {ResetComponent} from "./components/reset/reset.component";
import {BookComponent} from "./components/book/book.component";
import {ReaderComponent} from "./components/reader/reader.component";
import {BookAddComponent} from "./components/book-add/book-add.component";
import {translatorGuard} from "./guards/translator.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'reset', component: ResetComponent},
  {path: 'book/:name', component: BookComponent},
  {path: 'reader', component: ReaderComponent},
  {path: 'add', component: BookAddComponent, canActivate: [translatorGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
