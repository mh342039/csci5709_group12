import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})

export class AnnouncementDetailsComponent implements OnInit {
  addAnnouncementForm: FormGroup;
  alphanumericPattern = "([a-zA-Z0-9 ]+)";
  hide = true;
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  @Input()
    requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  message: string;
  private _ngZone: any;

  constructor(private formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    this.createForm();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  categories: Category[] = [
    {value: 'cat-0', viewValue: 'Educational'},
    {value: 'cat-1', viewValue: 'Recreational'}
  ];

  createForm(){
    this.addAnnouncementForm = this.formBuilder.group({
    Title: ['',[Validators.required,Validators.maxLength(20)]],
    Category: ['', Validators.required],
    Description: ['', Validators.required],
   });
  }

cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = null;
  this.uploadSub = null;
}

openSnackBar() {
  this.message="Announcement has been created succcessfully and sent for review";
  this._snackBar.open(this.message,'Dismiss', { duration: 3000 });
}

  onSubmit(){


  }

}

