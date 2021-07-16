import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../../services/utilityservice.service';
import { MatAccordion } from '@angular/material/expansion';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isAdmin: boolean = false
  constructor(public util: UtilityService, private dataservice: DataService) { }

  ngOnInit(): void {
    this.isAdmin = (this.dataservice.loggedInUser.data.role == "ADMIN")
  }


  @ViewChild(MatAccordion) accordion: MatAccordion;
}
