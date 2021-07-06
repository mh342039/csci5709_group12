import { Component, OnInit, Inject } from '@angular/core';
import { MemberProfile } from 'src/app/models/member-profile';
import { UtilityService } from '../../services/utilityservice.service';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { PeerMentorshipRegistrationService } from '../../services/peer-mentorship-registration.service';

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

  registrationForm: any;
  preferences = ['Male', 'Female', 'No Preference'];
  selected = this.preferences[2];
  selectedType="mentee";
  minDate = new Date(new Date().getFullYear() - 5, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 5, 0, 1);
  submitted = false;

  constructor(public util: UtilityService, private fb: FormBuilder, private dataservice: PeerMentorshipRegistrationService) {
    this.registrationForm = this.fb.group({
      type:[''],
      email:['', [Validators.pattern('[a-z0-9._%+-]+@(dal)+\\.(ca)')]],
      name:['', [Validators.pattern('^[A-Za-z0-9 ]+$')]],
      faculty:[''],
      program:[''],
      startDate:[moment(this.minDate)],
      endDate:[moment(this.minDate)],
      location:[''],
      preference:['']
    }, {validator: validateDates("startDate", "endDate")});
  }

  ngOnInit(): void {
    this.util.sectionTitle = "Peer Mentorship Registration";
  }

  chosenStartYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.registrationForm.value.startDate;
    ctrlValue.year(normalizedYear.year());
    this.registrationForm.controls['startDate'].setValue(ctrlValue);
  }

  chosenStartMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.registrationForm.value.startDate;
    ctrlValue.month(normalizedMonth.month());
    this.registrationForm.controls['startDate'].setValue(ctrlValue);
    datepicker.close();
  }

  chosenEndYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.registrationForm.value.endDate;
    ctrlValue.year(normalizedYear.year());
    this.registrationForm.controls['endDate'].setValue(ctrlValue);
  }

  chosenEndMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.registrationForm.value.endDate;
    ctrlValue.month(normalizedMonth.month());
    this.registrationForm.controls['endDate'].setValue(ctrlValue);
    datepicker.close();
  }

  openDialog() {
    if(this.submitted){
      this.registrationForm.get('type').disable();
      this.registrationForm.get('email').disable();
      this.registrationForm.get('name').disable();
      this.registrationForm.get('faculty').disable();
      this.registrationForm.get('program').disable();
      this.registrationForm.get('startDate').disable();
      this.registrationForm.get('endDate').disable();
      this.registrationForm.get('location').disable();
      this.registrationForm.get('preference').disable();
    }
    this.dataservice.saveUser();
  }
}

function validateDates(startDate: any, endDate: any) {
  return (formGroup: FormGroup) => {
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
  };
}
