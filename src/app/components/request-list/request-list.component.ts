import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RequesterDetailsModalComponent } from './requester-details-modal/requester-details-modal.component';
import { UtilityService } from 'src/app/services/utilityservice.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'type', 'date', 'status'];
  dataSource = new MatTableDataSource<RequestListElements>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialog: MatDialog, public util: UtilityService) {
  }

  openDialog() {
    this.dialog.open(RequesterDetailsModalComponent);
  }

  ngOnInit(){
    this.util.sectionTitle="Requests";
  }
}

export interface RequestListElements {
  name: string;
  type: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: RequestListElements[] = [
  {name: 'John Doe', type:'Role Change', date:'2021-06-06 15:00:00', status:'Pending'},
  {name: 'John Doe', type:'Registration', date:'2021-06-06 15:05:00', status:'Pending'},
  {name: 'John Doe', type:'Role Change', date:'2021-06-06 15:10:00', status:'Approved'},
  {name: 'John Doe', type:'Registration', date:'2021-06-06 15:15:00', status:'Rejected'},
  {name: 'John Doe', type:'Role Change', date:'2021-06-06 15:20:00', status:'Pending'},
  {name: 'John Doe', type:'Registration', date:'2021-06-06 15:25:00', status:'Approved'},
];
