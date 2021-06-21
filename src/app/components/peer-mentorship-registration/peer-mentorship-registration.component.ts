import { Component, OnInit, Inject } from '@angular/core';
import { MemberProfile } from 'src/app/models/member-profile';
import { UtilityService } from '../../services/utilityservice.service';
import {FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  constructor(public util: UtilityService, private fb: FormBuilder, public dialog: MatDialog) {
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
    }, {validator: matchDates("startDate", "endDate")});
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
    this.dialog.open(ConfirmationDialog, {
      data: {
        email: this.registrationForm.value.email
      }
    });
  }
}

function matchDates(startDate: any, endDate: any) {
  return (formGroup: FormGroup) => {
    if (formGroup.controls[startDate]?.errors && !formGroup.controls[startDate].errors?.match) {
      return;
    }
    if(formGroup.controls[startDate].value._d.getYear() == formGroup.controls[endDate].value._d.getYear() && formGroup.controls[startDate].value._d.getMonth() == formGroup.controls[endDate].value._d.getMonth()){
      formGroup.controls[startDate].setErrors({match: true});
      formGroup.controls[endDate].setErrors({match: true});
    }
    else{
      formGroup.controls[startDate].setErrors(null);
      formGroup.controls[endDate].setErrors(null);
    }
  };
}

export interface DialogData {
  email: string;
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
