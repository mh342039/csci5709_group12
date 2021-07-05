import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor-chat',
  templateUrl: './mentor-chat.component.html',
  styleUrls: ['./mentor-chat.component.css']
})
export class MentorChatComponent implements OnInit {

  constructor(private utilityService:  UtilityService, private router: Router) { }


  ngOnInit(): void {
    this.utilityService.sectionTitle = "Contact the Mentors"
  }

}
