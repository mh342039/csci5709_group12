import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
