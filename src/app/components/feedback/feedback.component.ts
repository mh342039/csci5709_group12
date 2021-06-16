import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

interface UsageFrequecny {
  value: string;
  viewValue: string;
}

interface Rating {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  websiteFeedbackForm: FormGroup;
  alphanumericPattern = "([a-zA-Z0-9 ]+)";
  message: string;

  constructor(private formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

  createAppFeedbackForm(){

    this.websiteFeedbackForm = this.formBuilder.group({
    UsageFrequency: ['',Validators.required],
    Feedback: ['', [Validators.required,Validators.pattern(this.alphanumericPattern), Validators.maxLength(10)]],
    Rating: ['', Validators.required],
    // Location: ['',[Validators.required, Validators.pattern(this.alphanumericPattern), Validators.maxLength(30)]],
   });
  }

  openSnackBarForFeedback() {
    this.message="Your feedback has been succcessfully submitted";
    this._snackBar.open(this.message,'Dismiss', { duration: 3000 });
  }

  onSubmit(){

  }

}
