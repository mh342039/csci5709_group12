import { Component, OnInit, AfterViewInit, ViewChild, Inject, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RequesterDetailsModalComponent } from './requester-details-modal/requester-details-modal.component';
import { UtilityService } from 'src/app/services/utilityservice.service';
import { MemberProfile } from 'src/app/models/member-profile';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, AfterViewInit {

  dialogValue: boolean;

  displayedColumns: string[] = ['requesterName', 'requestType', 'requestModificationDate', 'requestStatus'];

  requestData: MemberProfile[] = [
    {
      name: 'John Doe',
      email: 'jdoe@dal.ca',
      faculty: 'Computer Science',
      program: 'MACS',
      programStartDate: 'Winter 21',
      programEndDate: 'Summer 22',
      role: 'Mentee',
      requestType:'Role Change',
      requestDate:'2021-06-06 15:00:00',
      requestStatus:'Pending',
      accessModificationType: '0000-00-00',
      accessModificationDate: '0000-00-00',
      accessStatus: '',
      roleModificationDate: '0000-00-00',
      mode: 'V'
    },
    {
      name: 'John Doe',
      email: 'jdoe1@dal.ca',
      faculty: 'Computer Science',
      program: 'MACS',
      programStartDate: 'Winter 21',
      programEndDate: 'Summer 22',
      role: 'Mentee',
      requestType:'Role Change',
      requestDate:'2021-06-06 15:00:00',
      requestStatus:'Pending',
      accessModificationType: '0000-00-00',
      accessModificationDate: '0000-00-00',
      accessStatus: '',
      roleModificationDate: '0000-00-00',
      mode: 'V'
    }
  ];

  dataSource = new MatTableDataSource<MemberProfile>(this.requestData);

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
        name: this.requestData[index].name,
        email: this.requestData[index].email,
        faculty: this.requestData[index].faculty,
        program: this.requestData[index].program,
        programStartDate: this.requestData[index].programStartDate,
        programEndDate: this.requestData[index].programEndDate,
        role: this.requestData[index].role,
        requestType: this.requestData[index].requestType,
        requestDate: this.requestData[index].requestDate,
        requestStatus: this.requestData[index].requestStatus,
        accessModificationType: this.requestData[index].accessModificationType,
        accessModificationDate: this.requestData[index].accessModificationDate,
        accessStatus: this.requestData[index].accessStatus,
        roleModificationDate: this.requestData[index].roleModificationDate,
        mode: this.requestData[index].mode,
      }, width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogValue = result.data.accepted;
      if(this.dialogValue !== undefined)
        this.requestData[index].requestStatus = this.dialogValue ? "Accepted" : "Rejected";
    });
  }

  ngOnInit(){
    this.util.sectionTitle="Requests";
  }
}
