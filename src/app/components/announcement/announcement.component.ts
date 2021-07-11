import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/models/announcements.model';
import {AnnouncementService} from 'src/app/services/announcement.service';
import { HttpService } from 'src/app/services/httpservice.service';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  Announcements:Announcement[];
  showMore:any;
  isReadMore: boolean= true;

  constructor(private dialog: MatDialog, private httpservice: HttpService,private router: Router, public utilityService: UtilityService ,public announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.getAnnouncements();
    this.utilityService.sectionTitle="Announcements";
  }

  getAnnouncements(){
    this.httpservice.getServiceCall('/announcements')
    .subscribe( (result:any)=>{
      if(result.status){
      this.Announcements = result.data;
      this.announcementService.setAllAnnouncements(this.Announcements)
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

  onOpenAnnouncement(index:any){
    if(index != -1){
      this.announcementService.setAnnouncement(this.Announcements[index]);
      }
      else{
        this.announcementService.setAnnouncement(null);
      }
      this.router.navigate(["/main/announcementdetails"])
  } 

  showText(id:any) {
    this.isReadMore = !this.isReadMore
 }

}

