import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { resourceUsage } from 'process';
import { DataService } from 'src/app/services/dataservice.service';
import { HttpService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isLinear = true;
  ProfileFormGroup!: FormGroup;
  SecurityQFormGroup!: FormGroup;
  EmailFormGroup!: FormGroup;
  
  // @ViewChild('EmailStepper') EmailStepper: MatStepper;
  // @ViewChild('SecurityStepper') SecurityStepper: MatStepper;
  // @ViewChild('EmailStepper') EmailStepper: MatStepper;

  // Email: "";
  // Password: "";
  // ConfirmPassword: "";

  // firstCtrl: "";
  // secondCtrl: "";
  
  constructor(private httpservice: HttpService, private _formBuilder: FormBuilder, private router: Router, private dataservice: DataService) {}

  ngOnInit() {

    this.EmailFormGroup = this._formBuilder.group({
      Email: [{value: this.dataservice.loggedInUser.data.email, disabled: true}, [Validators.required, Validators.pattern("([a-zA-Z0-9-_.]+[@]+[a-zA-Z0-9-_.]+[.]+[a-zA-Z0-9]+[a-zA-Z0-9]+)")]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
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

  validateCreds(stepper: MatStepper){
    
    var req ={
      email: this.EmailFormGroup.controls["Email"].value,
      password: this.EmailFormGroup.controls["Password"].value
    }
    this.httpservice.postServiceCall("/registration/login",req)
      .subscribe((result: any)=>{
        console.log(result)
        if(result.status){
          stepper.next();
        }
  
      }, (error: any)=>{
        console.log(error)
      })
}

validateSecretQuestion(stepper: MatStepper){
  let req = {
    firstQuestion: this.SecurityQFormGroup.controls["firstCtrl"].value,
    secondQuestion: this.SecurityQFormGroup.controls["secondCtrl"].value
}
  this.httpservice.postServiceCall("/updateprofile/checkquestion/" + this.dataservice.loggedInUser.data._id, req)
    .subscribe((result: any)=>{
      console.log(result)
      if(result.status){
        stepper.next();
      }
    }, (error: any)=>{
      console.log(error)
    })
}

save(){
    let req = {

    }
    this.httpservice.putServiceCall("/updateprofile/resetpassword/" + this.dataservice.loggedInUser.data._id,req)
      .subscribe((result: any)=>{

      },(error: any)=>{

      })
  }
}
