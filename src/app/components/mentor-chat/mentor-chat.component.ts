import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { Router } from '@angular/router';
import { mentorModel } from 'src/app/models/mentor.model';
import { HttpService } from 'src/app/services/httpservice.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mentor-chat',
  templateUrl: './mentor-chat.component.html',
  styleUrls: ['./mentor-chat.component.css']
})
export class MentorChatComponent implements OnInit {

  constructor(private utilityService:  UtilityService, private router: Router,private httpservice: HttpService, private dialog: MatDialog) { }

  mentor : mentorModel = new mentorModel();

  ngOnInit(): void {
    this.utilityService.sectionTitle = "Contact the Mentors"
  }

  getMentorData(){

  }
}
