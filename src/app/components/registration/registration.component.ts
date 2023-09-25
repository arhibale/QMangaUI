import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validate-form";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  regForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onReg() {
    if (this.regForm.valid) {
      this.auth.register(this.regForm.value)
        .subscribe({
          next:(res) => {
            this.regForm.reset()
            this.router.navigate(['login'])

            this.toast.success({detail:"SUCCESS", summary: res.message, duration: 5000})
          },
          error: (err) => {
            this.toast.error({detail:"ERROR", summary: err?.error.message, duration: 5000})
            console.log(err?.error.message);
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.regForm);
    }
  }
}
