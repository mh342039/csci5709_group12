import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLinear = true;
  ProfileFormGroup!: FormGroup;
  SecurityQFormGroup!: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.ProfileFormGroup = this._formBuilder.group({

      FirstName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")] ],

      LastName: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9 ]+)")] ],

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

  gotoSecurityQuestions()
  {
    this.router.navigate(['/securityQuestions']);
  }

  gotoSignin()
  {
    this.router.navigate(['/signin'])
  }
}
