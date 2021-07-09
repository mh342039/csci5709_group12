import { Component, OnInit, Inject } from '@angular/core';
import { UtilityService } from '../../services/utilityservice.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { PeerMentorshipRegistrationModel } from 'src/app/models/peer-mentorship-registration.model';
import { HttpService } from 'src/app/services/httpservice.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-peer-mentorship-registration',
  templateUrl: './peer-mentorship-registration.component.html',
  styleUrls: ['./peer-mentorship-registration.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PeerMentorshipRegistrationComponent implements OnInit {
  registerUser: PeerMentorshipRegistrationModel = new PeerMentorshipRegistrationModel();
  registrationForm: any;
  preferences = ['Male', 'Female', 'No Preference'];
  selectedRole="mentee";
  locations = ['Canada', 'India', 'US', 'Brazil', 'China'];
  campusLocations = ['Halifax', 'Truro'];
  minDate = new Date(new Date().getFullYear() - 4, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 4, 0, 1);
  map: Map<string, string[]>;
  faculties: string[] = [];
  programs: string[] = [];

  constructor(public util: UtilityService, private fb: FormBuilder, private httpservice: HttpService, private dialog: MatDialog, private router: Router) {
    this.generateProgramMap();
    this.registrationForm = this.fb.group({
      role:[''],
      email:[''],
      name:['', [Validators.pattern('^[A-Za-z0-9 ]+$')]],
      faculty:[''],
      program:[''],
      startDate:[''],
      endDate:[''],
      location:[''],
      preference:[''],
      campusLocation:['']
    },
    {validators: [validateProgram("faculty", "program", this.map),
      validateDates("startDate", "endDate")]});
    this.registerUser.email = "gsaluja@dal.ca";
    //this.registerUser.startDate = moment(this.minDate);
    //this.registerUser.endDate = moment(this.maxDate);
  }

  ngOnInit(): void {
    this.util.sectionTitle = "Peer Mentorship Registration";
    this.registrationForm.get('email').disable();
    if(!this.checkRegistration()){
      this.registerUser.role = "Mentee";
      this.registerUser.preference = this.preferences[2];
    }
  }

  generateProgramMap(){
    this.map = new Map([
      ['Faculty of Computer Science', ['Bachelor of Computer Science', 'Master of Applied Computer Science']],
      ['Faculty of Management', ['Bachelor of Commerce', 'Master of Business Administration']]
    ]);
    for(let key of this.map.keys()){
      this.faculties.push(key);
    }
    for(let value of this.map.values()){
      for(let innerValue of value){
          this.programs.push(innerValue);
      }
    }
  }

  chosenStartYearHandler(normalizedYear: Moment) {
    if(this.registrationForm.value.startDate != undefined){
      const ctrlValue = this.registrationForm.value.startDate;
      ctrlValue.year(normalizedYear.year());
      this.registrationForm.controls['startDate'].setValue(ctrlValue);
    }
    else{
      const ctrlValue = moment(this.minDate);
      ctrlValue.year(normalizedYear.year());
      this.registrationForm.controls['startDate'].setValue(ctrlValue);
    }
  }

  chosenStartMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    if(this.registrationForm.value.startDate != undefined){
      const ctrlValue = this.registrationForm.value.startDate;
      ctrlValue.month(normalizedMonth.month());
      this.registrationForm.controls['startDate'].setValue(ctrlValue);
    }
    else{
      const ctrlValue = moment(this.minDate);
      ctrlValue.year(normalizedMonth.year());
      this.registrationForm.controls['startDate'].setValue(ctrlValue);
    }
    datepicker.close();
  }

  chosenEndYearHandler(normalizedYear: Moment) {
    if(this.registrationForm.value.endDate != undefined){
      const ctrlValue = this.registrationForm.value.endDate;
      ctrlValue.year(normalizedYear.year());
      this.registrationForm.controls['endDate'].setValue(ctrlValue);
    }
    else{
      const ctrlValue = moment(this.maxDate);
      ctrlValue.year(normalizedYear.year());
      this.registrationForm.controls['endDate'].setValue(ctrlValue);
    }
  }

  chosenEndMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    if(this.registrationForm.value.endDate != undefined){
      const ctrlValue = this.registrationForm.value.endDate;
      ctrlValue.month(normalizedMonth.month());
      this.registrationForm.controls['endDate'].setValue(ctrlValue);
    }
    else{
      const ctrlValue = moment(this.maxDate);
      ctrlValue.year(normalizedMonth.year());
      this.registrationForm.controls['endDate'].setValue(ctrlValue);
    }
    datepicker.close();
  }

  openDialog() {
    if(this.registerUser._id == -1){
      this.saveUser();
    }
    else{}
  }

  saveUser(){
    this.httpservice.postServiceCall('/peer-mentorship-registration', this.registerUser)
    .subscribe((result:any)=>{
      if(result.status){
        this.disableForm();
        this.dialog.open(MessageComponent, {
          data: {
            type: 'C',
            title:'Registration Successful',
            message: 'Registration request raised. You will be notified once it is approved.',
            duration:3000
          }
        });
      }
      else{
        this.dialog.open(MessageComponent, {
          data: {
            type: 'E',
            title:'System Error',
            message: result.message,
          }
        });
      }
    },
    (error:any)=>{
      this.dialog.open(MessageComponent, {
        data: {
          type: 'E',
          title:'System Error',
          message: 'Something Went Wrong. Please Try Again.',
        }
      });
    });
  }

  disableForm(){
    this.registrationForm.get('role').disable();
    this.registrationForm.get('name').disable();
    this.registrationForm.get('faculty').disable();
    this.registrationForm.get('program').disable();
    this.registrationForm.get('startDate').disable();
    this.registrationForm.get('endDate').disable();
    this.registrationForm.get('location').disable();
    this.registrationForm.get('preference').disable();
    this.registrationForm.get('campusLocation').disable();
  }

  checkRegistration(){
    this.httpservice.getServiceCall('/peer-mentorship-registration/'+this.registerUser.email)
    .subscribe((result:any)=>{
      if(result.status){
        this.registerUser = result.data;
        this.disableForm();
      }
    },
    (error:any)=>{
      this.dialog.open(MessageComponent, {
        data: {
          type: 'E',
          title:'System Error',
          message: 'Something Went Wrong. Kindly Refresh the Page.',
        }
      });
    });
    if(this.registerUser)
      return true;
    return false;
  }
}

function validateProgram(faculty: any, program: any, map: Map<string, string[]>){
  return (formGroup: FormGroup) => {
    if(map != undefined && formGroup.controls[faculty].value != undefined && map.has(formGroup.controls[faculty].value)){
      const programs = map.get(formGroup.controls[faculty].value);
      const programFound = programs.find(elem => elem === formGroup.controls[program].value);
      if(!programFound){
        formGroup.controls[program].setErrors({mismatch: true});
      }
      else{
        formGroup.controls[program].setErrors(null);
      }
    }
  }
}

function validateDates(startDate: any, endDate: any) {
  return (formGroup: FormGroup) => {
    if(formGroup.controls[startDate].value != undefined && formGroup.controls[startDate].value._d != undefined
      && formGroup.controls[endDate].value != undefined && formGroup.controls[endDate].value._d != undefined){
      if ((formGroup.controls[startDate]?.errors && !formGroup.controls[startDate].errors?.match)
            || (formGroup.controls[endDate]?.errors && !formGroup.controls[endDate].errors?.match)
            || (formGroup.controls[endDate]?.invalid && !formGroup.controls[endDate].errors?.invalid)) {
        return;
      }
      if(formGroup.controls[startDate].value._d.getFullYear() == formGroup.controls[endDate].value._d.getFullYear() && formGroup.controls[startDate].value._d.getMonth() == formGroup.controls[endDate].value._d.getMonth()){
        formGroup.controls[startDate].setErrors({match: true});
        formGroup.controls[endDate].setErrors({match: true});
      }
      else{
        formGroup.controls[startDate].setErrors(null);
        formGroup.controls[endDate].setErrors(null);
      }
      if(formGroup.controls[endDate].value._d.getFullYear() <= new Date().getFullYear() && formGroup.controls[endDate].value._d.getMonth() <= new Date().getMonth()){
        formGroup.controls[endDate].setErrors({invalid: true});
      }
      else{
        formGroup.controls[endDate].setErrors(null);
      }
    }
  }
}
