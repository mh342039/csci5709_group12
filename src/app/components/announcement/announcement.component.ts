import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AnnouncementService} from 'src/app/services/announcement.service';
import { UtilityService } from 'src/app/services/utilityservice.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  Announcements:any;
  showMore:any;
  isReadMore: boolean= true;

  constructor(private router: Router, public utilityService: UtilityService ,public announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.getAnnouncements();
    this.utilityService.sectionTitle="Announcements";
  }

  getAnnouncements(){
  this.Announcements= this.announcementService.getAnnouncements();
  }

  onOpenAnnouncement(index:any){
    this.announcementService.setAnnouncement(this.Announcements[index]);
    this.router.navigate(['/main/announcementdetails']);
  } 

  showText() {
    this.isReadMore = !this.isReadMore
 }

}

