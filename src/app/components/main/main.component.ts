import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';
import { UtilityService } from 'src/app/services/utilityservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  announcementAccod: any
  constructor(public utilityservice: UtilityService, private dataservice: DataService, private router: Router) { }

  ngOnInit(): void {
    
    if(!this.dataservice.loggedInUser || (this.dataservice.loggedInUser && !this.dataservice.loggedInUser.status)){
      this.router.navigateByUrl('/signin')
    }
  }

}
