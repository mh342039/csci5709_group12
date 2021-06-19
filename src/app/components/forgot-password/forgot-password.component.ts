import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isLinear = true;
  ProfileFormGroup!: FormGroup;
  SecurityQFormGroup!: FormGroup;
  EmailFormGroup!: FormGroup;

  Email: "";
  Password: "";
  ConfirmPassword: "";

  firstCtrl: "";
  secondCtrl: "";
  
  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.EmailFormGroup = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9-_.]+[@]+[a-zA-Z0-9-_.]+[.]+[a-zA-Z0-9]+[a-zA-Z0-9]+)")]],
    });

    this.ProfileFormGroup = this._formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: ['', Validators.required]
   },{
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

  
  gotoSignin()
  {
    this.router.navigate(['/signin'])
  }

}
