import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../components/message/message.component';
import {Announcement} from '../models/announcements.model';
import { DataService } from './dataservice.service';
import { HttpService } from './httpservice.service';
import { UtilityService } from './utilityservice.service';

@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {
  announcement:any;
  allAnnouncements: Announcement[] =[];

  constructor(public userdataservice: DataService, public utilityservice: UtilityService, private httpservice: HttpService, private dialog: MatDialog, private router: Router) { 
  }

// getAnnouncements(){
//   return this.allAnnouncements;
// }

getAnnouncement(){
  return this.announcement ;
}

setAnnouncement(announcement:any){
this.announcement=announcement;
}

setAllAnnouncements(announcements:Announcement[]){
  this.allAnnouncements = announcements;
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

deleteAnnouncement(id:any){
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
    this.httpservice.deleteServiceCall('/announcements/' + id, {})
        .subscribe( (result:any)=>{
          console.log(result)
          if(result.status){
            let index = this.allAnnouncements.findIndex(o=>{ return o._id = id})
              this.allAnnouncements.splice(id,1);
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
  });
}

getAnnouncementIndex(id:number){
  return this.allAnnouncements.map(o => o._id).indexOf(id);
}


getAnnouncements(){
  this.httpservice.getServiceCall('/announcements')
  .subscribe( (result:any)=>{
    if(result.status){
      this.allAnnouncements = result.data;
      if(this.utilityservice && this.utilityservice.isViewMyAnnouncementControlsVisible){
        
        this.allAnnouncements = this.allAnnouncements.filter((announcement: any) => {
          return announcement.createdById == this.userdataservice.loggedInUser.data._id;
      });
    }
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


}
