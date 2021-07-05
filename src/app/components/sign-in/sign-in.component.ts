import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

 
  SigninForm!: FormGroup;

  Email: string = "";
  Password: string = "";
  invalidUser:boolean= false;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.SigninForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }
  
  gotoRegister(){
    this.router.navigate(['/signup'])
  }
 

  gotoProfile(){
    this.router.navigate(['/main/announcement'])
  }

  gotoForgotPassword()
  {
    this.router.navigate(['/forgotPassword'])
  }
 

}
