import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/httpservice.service';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { SignUp } from 'src/app/models/sign-up.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signup: SignUp = new SignUp();
  isLinear = true;
  ProfileFormGroup!: FormGroup;
  SecurityQFormGroup!: FormGroup;

  FirstName: "";
  LastName: "";
  Email: "";
  Password: "";
  ConfirmPassword: "";

  firstCtrl: "";
  secondCtrl: "";
  constructor(private dialog: MatDialog, private httpservice: HttpService, public utilityService: UtilityService, private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.ProfileFormGroup = this._formBuilder.group({

      FirstName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      LastName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")]],

      Email: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9-_.]+[@]+[a-zA-Z0-9-_.]+[.]+[a-zA-Z0-9]+[a-zA-Z0-9]+)")]],

      Password: ['', [Validators.required, Validators.minLength(8)]],

      ConfirmPassword: ['', Validators.required]
    },
      {
        validator: this.checkPassword()
      });

    this.SecurityQFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });

  }

  checkPassword() {
    return (group: FormGroup) => {
      const password = group.controls['Password'];
      const confirmPassword = group.controls['ConfirmPassword'];
      if (confirmPassword.errors && confirmPassword.errors.mismatch) {
        return;
      }
      console.log(confirmPassword.value)
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      }
    }
  }

  gotoSecurityQuestions() {
    this.router.navigate(['/securityQuestions']);
  }

  gotoSignin() {
    //this.router.navigate(['/signin'])
    if (this.ProfileFormGroup.valid && this.SecurityQFormGroup.valid) {
      this.httpservice.postServiceCall('/signup', this.signup)
        .subscribe((result: any) => {
          if (result.status) {

            this.dialog.open(MessageComponent, {
              data: {
                type: 'C',
                title: 'Registration Successful!',
                message: 'Registration Successful!. Thank you for your time!',
                duration: 3000
              }
            });
            // this.router.navigate(['/main/rate-mentor']);
          }
          else {
            this.dialog.open(MessageComponent, {
              data: {
                type: 'E',
                title: 'System Error',
                message: result.message,
              }
            });
          }
        },
          (error: any) => {
            this.dialog.open(MessageComponent, {
              data: {
                type: 'E',
                title: 'System Error',
                message: 'Something Went Wrong. Please Try Again.',
              }
            });
          });
    }
  }
}