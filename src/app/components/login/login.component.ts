import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validate-form";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.auth.storeToken(res.token);
            this.loginForm.reset();
            this.router.navigate(['']);

            this.toast.success({detail:"SUCCESS", summary: res.message, duration: 5000})
          },
          error: (err) => {
            this.toast.error({detail:"ERROR", summary: "Something when wrong!", duration: 5000})
            console.log(err);
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
