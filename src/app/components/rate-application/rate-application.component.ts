import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { MessageComponent } from '../message/message.component';

interface UsageFrequecny {
  value: string;
  viewValue: string;
}

interface Rating {
  value: string;
  viewValue: string;
}

interface LikedFeature{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rate-application',
  templateUrl: './rate-application.component.html',
  styleUrls: ['./rate-application.component.css']
})
export class RateApplicationComponent implements OnInit {

  websiteFeedbackForm: FormGroup;
  alphanumericPattern = "([a-zA-Z0-9 ]+)";
  message: string;

  constructor(private utilityService: UtilityService, private dialog: MatDialog, private formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.utilityService.sectionTitle="Application Feedback";
    this.createAppFeedbackForm();
  }

  usageFreqs: UsageFrequecny[] = [
    {value: 'v1', viewValue: 'I use it everyday'},
    {value: 'v2', viewValue: 'I use it sometimes'},
    {value: 'v3', viewValue: 'I do not use it at all'},
  ];

  ratings: Rating[] = [
    {value: 'v1', viewValue: '1'},
    {value: 'v2', viewValue: '2'},
    {value: 'v2', viewValue: '3'},
    {value: 'v2', viewValue: '4'},
    {value: 'v2', viewValue: '5'}
  ];

  likedFeatures: LikedFeature[] = [
    {value: 'v1', viewValue: 'Application UI'},
    {value: 'v2', viewValue: 'Application Functionality: Notes'},
    {value: 'v3', viewValue: 'Application Functionality: Scheduler'},
    {value: 'v2', viewValue: 'Application Functionality: Announcements'},
  ];

  createAppFeedbackForm(){

    this.websiteFeedbackForm = this.formBuilder.group({
    UsageFrequency: ['',Validators.required],
    Feedback: ['', Validators.required],
    Rating: ['', Validators.required],
    LikedFeature: ['', Validators.required]
    // Location: ['',[Validators.required, Validators.pattern(this.alphanumericPattern), Validators.maxLength(30)]],
   });
  }

  onSubmit() {
    if(this.websiteFeedbackForm.valid){
      this.dialog.open(MessageComponent, {
        data: {
          type: 'C',
          title:'Submitted',
          message: 'Application Feedback submitted successfully.',
          duration:2000
        }
      });
      this.router.navigate(['/main/rate-mentor']);
    }
    }
}

