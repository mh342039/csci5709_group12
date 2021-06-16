
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utilityservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

  announcementAccod: any
  constructor(public utilityservice: UtilityService) { }


  ngOnInit(): void {
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
