import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../../services/utilityservice.service';
import { MatAccordion } from '@angular/material/expansion';
import { DataService } from '../../services/dataservice.service';

@Component({
  selector: 'app-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isAdmin: boolean = false
  constructor(public util: UtilityService, public dataservice: DataService) { }

  ngOnInit(): void { }


  @ViewChild(MatAccordion) accordion: MatAccordion;
}
