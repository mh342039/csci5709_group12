import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RateMentorserviceService } from 'src/app/services/rate-mentorservice.service';
import { UtilityService } from 'src/app/services/utilityservice.service';
import {MentorFeedbackModel} from '../../models/mentorFeedback.model';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/httpservice.service';

interface Mentor {
  value: string;
  viewValue: string;
}

interface Rating {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rate-mentor',
  templateUrl: './rate-mentor.component.html',
  styleUrls: ['./rate-mentor.component.css']
})
export class RateMentorComponent implements OnInit {
  mentorForm: MentorFeedbackModel = new MentorFeedbackModel();
  feedbackForMentorForm: FormGroup;
  alphanumericPattern = "([a-zA-Z0-9 ]+)";
  message: string;

  constructor(private dialog: MatDialog,private httpservice: HttpService, private utilityService: UtilityService, private rateMentorService: RateMentorserviceService, private formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.utilityService.sectionTitle="Mentor Feedback";
    this.createFeedbackForm();
  }

  mentors: Mentor[] = [
    {value: 'v1', viewValue: 'Nikunj Goenka'},
    {value: 'v2', viewValue: 'Hari Arunachalam'},
    {value: 'v3', viewValue: 'Shehzeen Huda'},
    {value: 'v4', viewValue: 'Yash Jaiswal'},
    {value: 'v5', viewValue: 'Bala Sundeep Krishna Dasari'},
    {value: 'v6', viewValue: 'Neharika Sehgal'},
    {value: 'v7', viewValue: 'Aadesh Shah'},
    {value: 'v8', viewValue: 'Suman Singh'}
  ];

  ratings: Rating[] = [
    {value: 'v1', viewValue: '1'},
    {value: 'v2', viewValue: '2'},
    {value: 'v2', viewValue: '3'},
    {value: 'v2', viewValue: '4'},
    {value: 'v2', viewValue: '5'}
  ];

  //for creating a form for mentor feedback
  createFeedbackForm(){
    this.feedbackForMentorForm = this.formBuilder.group({
    Mentor: ['',Validators.required],
    Feedback: ['', [Validators.required, this.cannotContainSpace]],
    Rating: ['', Validators.required],
   });
  }

  cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { cannotContainSpace: true };
  }

  //for submitting mentor feedback
  onSubmit(){
  if(this.feedbackForMentorForm.valid){
    this.httpservice.postServiceCall('/feedback/mentor', this.mentorForm)
    .subscribe((result:any)=>{
      if(result.status){
         this.disableForm();
        this.dialog.open(MessageComponent, {
          data: {
            type: 'C',
            title:'Mentor Feedback Submitted Successful',
            message: 'Your feedback has been submitted. Thank you for your time!',
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
  }

  //for disabling feedback form after submitting it
  disableForm(){
    this.feedbackForMentorForm.get('Mentor').disable();
    this.feedbackForMentorForm.get('Rating').disable();
    this.feedbackForMentorForm.get('Feedback').disable();
  }

}
