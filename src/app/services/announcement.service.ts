import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../components/message/message.component';
import {Announcement} from '../models/announcements.model';

@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {
  announcement:any;
  allAnnouncements: Announcement[];

  constructor(private dialog: MatDialog, private router: Router) { 

  this.allAnnouncements=[
    {
      id:1,
      title:"Consectetur Adipiscing Elit.....",
      createdBy: "Ipsum Dolor",
      createdOn: "June 7, 2021" ,
      category:"Recreational",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      LastModifiedOn: "June 9, 2021"
    },
    {
      id:2,
      title:"Tempor Incididunt Ut Labore Et",
      createdBy: "Duis Aute",
      createdOn: "June 8, 2021" ,
      category:"Educational",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      LastModifiedOn: "June 11, 2021"
    }
  ];
  }

getAnnouncements(){
  return this.allAnnouncements;
}

getAnnouncement(){
  return this.announcement ;
}

setAnnouncement(announcement:any){
this.announcement=announcement;
}

addAnnouncement(announcement:any){
this.allAnnouncements.push(announcement);
this.dialog.open(MessageComponent, {
  data: {
    type: 'C',
    title:'Added',
    message: 'New announcement added successfully and sent for review to Admin.',
    duration:2000
  }
});
}

saveAnnouncement(index:any, objRequest:any){
this.allAnnouncements[index]= objRequest;
this.dialog.open(MessageComponent, {
  data:{
    type: 'C',
    title: 'Saved',
    message:'Your changes for the announcement has been saved and sent for review to Admin.',
    duration:2000
  }
});
}

deleteAnnouncement(index:any){
  const dialogRef= this.dialog.open(MessageComponent, {
    data: {
      type: 'W',
      title:'Are you sure?',
      message: 'You will not be able to recover this announcement!',
      buttonText:'Yes, delete it!',
    }
  });

dialogRef.afterClosed().subscribe(result => {
  if(result.data == "Y"){
    this.allAnnouncements.splice(index,1);
    this.router.navigate(['/main/announcement']);
        this.dialog.open(MessageComponent, {
          data: {
            type: 'C',
            title:'Deleted',
            message: 'Announcement deleted successfully.',
            duration:2000
          }
        });
  }
});
}

getAnnouncementIndex(_id:any){
  return this.allAnnouncements.map(o => o.id).indexOf(_id);
}

}
