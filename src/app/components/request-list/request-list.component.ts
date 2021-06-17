import { Component, OnInit, AfterViewInit, ViewChild, Inject, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RequesterDetailsModalComponent } from './requester-details-modal/requester-details-modal.component';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { Requests } from './requests';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, AfterViewInit {

  dialogValue: boolean;

  displayedColumns: string[] = ['requesterName', 'requestType', 'requestModificationDate', 'requestStatus'];

  requestData: Requests[] = [
    {requesterName: 'John Doe', requestType:'Role Change', requestModificationDate:'2021-06-06 15:00:00', requestStatus:'Pending'},
    {requesterName: 'John Doe', requestType:'Role Change', requestModificationDate:'2021-06-06 15:00:00', requestStatus:'Pending'}
  ];

  dataSource = new MatTableDataSource<Requests>(this.requestData);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialog: MatDialog, public util: UtilityService) {
  }

  openDialog(index: number) {
    const dialogRef = this.dialog.open(RequesterDetailsModalComponent, {
      data: {
        requesterName: this.requestData[index].requesterName,
        requestStatus: this.requestData[index].requestStatus,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogValue = result.data;
      if(this.dialogValue !== undefined)
        this.requestData[index].requestStatus = this.dialogValue ? "Accepted" : "Rejected";
    });
  }

  ngOnInit(){
    this.util.sectionTitle="Requests";
  }
}
