import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResetPasswordModel} from "../../models/reset-password.model";
import {ConfirmPasswordValidator} from "../../helpers/confirm-password";
import {ActivatedRoute, Router} from "@angular/router";
import ValidateForm from "../../helpers/validate-form";
import {ResetPasswordService} from "../../services/reset-password.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  resetForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPassword = new ResetPasswordModel();

  constructor(
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
    private toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: ConfirmPasswordValidator("password", "confirmPassword")
    })

    this.activateRoute.queryParams.subscribe(value => {
      this.emailToReset = value['email'];
      let uriToken = value['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onReset() {
    if (this.resetForm.valid) {
      this.resetPassword.email = this.emailToReset;
      this.resetPassword.newPassword = this.resetForm.value.password;
      this.resetPassword.confirmPassword = this.resetForm.value.confrimPassword;
      this.resetPassword.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPassword)
        .subscribe({
          next: (res) => {
            this.toast.success({detail: 'SUCCESS', summary: res.message, duration: 5000})
            this.router.navigate(['login'])
          },
          error: (err) => {
            this.toast.error({detail: 'ERROR', summary: err.message, duration: 5000})
          }
        });
    } else {
      ValidateForm.validateAllFormFields(this.resetForm);
    }
  }
}
