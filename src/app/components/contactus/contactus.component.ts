import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private utilityService:  UtilityService, private router: Router) { }


  ngOnInit(): void {
    this.utilityService.sectionTitle = "Contact Admin"
  }


}
