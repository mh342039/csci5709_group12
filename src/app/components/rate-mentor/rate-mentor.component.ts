import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';import { RateMentorserviceService } from 'src/app/services/rate-mentorservice.service';
import { UtilityService } from 'src/app/services/utilityservice.service';
;

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
  feedbackForMentorForm: FormGroup;
  alphanumericPattern = "([a-zA-Z0-9 ]+)";
  message: string;

  constructor(private utilityService: UtilityService, private rateMentorService: RateMentorserviceService, private formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.utilityService.sectionTitle="Mentor Feedback";
    this.createFeedbackForm();
  }

  mentors: Mentor[] = [
    {value: 'v1', viewValue: 'Nikunj Goenka'},
    {value: 'v2', viewValue: 'Shehzeen Huda'}
  ];

  ratings: Rating[] = [
    {value: 'v1', viewValue: '1'},
    {value: 'v2', viewValue: '2'},
    {value: 'v2', viewValue: '3'},
    {value: 'v2', viewValue: '4'},
    {value: 'v2', viewValue: '5'}
  ];

  createFeedbackForm(){

    this.feedbackForMentorForm = this.formBuilder.group({
    Mentor: ['',Validators.required],
    Feedback: ['', Validators.required],
    Rating: ['', Validators.required],
   });
  }

  onSubmit(){
  if(this.feedbackForMentorForm.valid){
    this.rateMentorService.submitMentorFeedback();
  }
  }

}
