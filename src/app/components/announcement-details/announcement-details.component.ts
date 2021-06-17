import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {AnnouncementService} from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcements.model';
import { UtilityService } from 'src/app/services/utilityservice.service';

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
  announcement: Announcement= new Announcement();
  addAnnouncementForm: FormGroup;
  alphanumericPattern = "([a-zA-Z0-9 ]+)";
  TitleFormControl= new FormControl('',[
    Validators.required,
    Validators.maxLength(20)
  ]
  );

  DescriptionFormControl= new FormControl('', 
  Validators.required
   );

   CategoryFormControl= new FormControl(
    //  ['']
   );



  hide = true;
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  @Input()
    requiredFileType:string;

  message: string;
  private _ngZone: any;

  constructor(private announcementService: AnnouncementService, public utilityService: UtilityService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private router: Router, private _snackBar: MatSnackBar) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    this.getAnnouncement();
    this.cdr.detectChanges();
    this.utilityService.sectionTitle="Announcements";
   // this.createForm();
  }

  getAnnouncement(){
    let temp= this.announcementService.getAnnouncement();
    if(temp){
      this.announcement=temp;
    }
    else
    this.announcement= new Announcement(); 
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

openSnackBar() {
  this.message="Announcement has been created succcessfully and sent for review";
  this._snackBar.open(this.message,'Dismiss', { duration: 3000 });
}

onSaveAnnouncement(){
if(this.announcement.id == -1){
  this.announcement.id = Math.floor(Math.random() * 10000);
  this.announcementService.addAnnouncement(this.announcement);
  this.router.navigate(['main/announcement']);
}
else{
  let index= this.announcementService.getAnnouncementIndex(this.announcement.id);
  this.announcementService.saveAnnouncement(index,this.announcement);
}
}

onDeleteAnnouncement(){
  let index= this.announcementService.getAnnouncementIndex(this.announcement.id);
  if(index > -1){
  this.announcementService.deleteAnnouncement(index);
  }
  }

}


