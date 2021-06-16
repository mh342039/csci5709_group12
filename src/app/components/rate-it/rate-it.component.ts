import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

interface Mentor {
  value: string;
  viewValue: string;
}

interface Rating {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rate-it',
  templateUrl: './rate-it.component.html',
  styleUrls: ['./rate-it.component.css']
})
export class RateItComponent implements OnInit {
  feedbackForMentorForm: FormGroup;
  alphanumericPattern = "([a-zA-Z0-9 ]+)";
  message: string;

  constructor(private formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
    MentorName: ['',Validators.required],
    Feedback: ['', Validators.required],
    Rating: ['', Validators.required],
   });
  }

  openSnackBarForFeedback() {
    this.message="Your feedback for your mentor has been succcessfully submitted";
    this._snackBar.open(this.message,'Dismiss', { duration: 3000 });
  }

  onSubmit(){

  }

}
