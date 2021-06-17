import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../../services/utilityservice.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public util: UtilityService) { }

  ngOnInit(): void {
  }


  @ViewChild(MatAccordion) accordion: MatAccordion;
}
