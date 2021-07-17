import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {AnnouncementService} from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcements.model';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { HttpService } from 'src/app/services/httpservice.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { DataService } from 'src/app/services/dataservice.service';

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
  isVisible : boolean=false; 
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

   CategoryFormControl= new FormControl('',
    Validators.required
   );

  hide = true;
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  @Input()
    requiredFileType:string;

  message: string;
  private _ngZone: any;
  isCreate: boolean;

  constructor(private userdataservice: DataService , private httpservice: HttpService, private dialog: MatDialog,private announcementService: AnnouncementService, public utilityService: UtilityService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private router: Router, private _snackBar: MatSnackBar) { }

  // @ViewChild('autosize') autosize: CdkTextareaAutosize;

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
      this.isVisible = true;
    }
    else
    this.announcement= new Announcement(); 
    console.log(this.userdataservice.loggedInUser.data._id)
    this.announcement.createdById = this.userdataservice.loggedInUser.data._id
    this.announcement.createdByName= this.userdataservice.loggedInUser.data.firstName + " " + this.userdataservice.loggedInUser.data.lastName
    this.announcement.createdOn = new Date();
  }

  // triggerResize() {
  //   // Wait for changes to be applied, then trigger textarea resize.
  //   this._ngZone.onStable.pipe(take(1))
  //       .subscribe(() => this.autosize.resizeToFitContent(true));
  // }

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

onSaveAnnouncement(){
  if (this.announcement._id == -1) {
    this.postAnnouncement()
  }
  else {
    this.putAnnouncement()
  }
}

postAnnouncement(){
  this.httpservice.postServiceCall('/announcements', this.announcement)
  .subscribe( (result:any)=>{
    console.log(result)
    if(result.status){
      this.router.navigate(['/main/announcement']);
      this.dialog.open(MessageComponent, {
        data: {
          type: 'C',
          title:'Announcement Added',
          message: result.message,
          duration:2000
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

  })

}


putAnnouncement(){
  this.httpservice.putServiceCall('/announcements/'+ this.announcement._id, this.announcement)
  .subscribe( (result:any)=>{
    console.log(result)
    if(result.status){
      this.dialog.open(MessageComponent, {
        data: {
          type: 'C',
          title:'Announcement Updated',
          message: result.message,
          duration:2000
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
        message: 'Something Went Wrong. Kindly Refresh the Page.',
      }
    });

  })

}

onDeleteAnnouncement(){
  let index= this.announcementService.getAnnouncementIndex(this.announcement._id);
  if(index > -1){
  this.announcementService.deleteAnnouncement(this.announcement._id);
  }
  }

}


