import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UtilityService } from '../../services/utilityservice.service';
import { RequesterDetailsModalComponent } from '../request-list/requester-details-modal/requester-details-modal.component';
import { MemberProfile } from 'src/app/models/member-profile';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modifymember',
  templateUrl: './modifymember.component.html',
  styleUrls: ['./modifymember.component.css']
})
export class ModifymemberComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'requestStatus', 'date'];

  memberData: MemberProfile[] = [
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
      requestStatus:'Role Changed',
      accessModificationType: '0000-00-00',
      accessModificationDate: '2021-06-06 15:05:00',
      accessStatus: '',
      roleModificationDate: '0000-00-00',
      mode: 'C'
    }
  ];

  searchPoolMemberData: MemberProfile[] = [
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
      mode: 'C'
    },
    {
      name: 'John Doe',
      email: 'jdoe2@dal.ca',
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
      mode: 'C'
    }
  ];

  dataSource = new MatTableDataSource<MemberProfile>(this.memberData);
  email = new FormControl('', Validators.pattern('[a-z0-9._%+-]+@(dal)+\\.(ca)'));
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  disableAccountForm: any;

  isSubmitted: boolean = false;

  success: boolean = false;

  dialogValue: boolean;

  index: number;

  searchEmail: string;

  constructor(private fb: FormBuilder, public util: UtilityService, public dialog: MatDialog){
    this.disableAccountForm = this.fb.group({
      email: ["", [Validators.pattern('[a-z0-9._%+-]+@(dal)+\\.(ca)')]]
    });
  }

  ngOnInit(){
    this.util.sectionTitle="Modify Access";
  }

  search(searchValue: any) {
    console.log(searchValue);
    const result = this.searchPoolMemberData.filter(elem => elem.email === searchValue);
      if(result.length == 0){
        this.disableAccountForm.controls.email.setErrors({invalid: true});
      }
      else{
        const DupResult = this.memberData.filter(elem => elem.email === searchValue);
        if(DupResult.length > 0){
          this.disableAccountForm.controls.email.setErrors({duplicate: true});
        }
        else{
          this.disableAccountForm.controls.email.setErrors(null);
          this.success = true;
          this.index = this.memberData.indexOf(searchValue)+1;
          this.searchEmail = searchValue;
        }
      }
  }

  validate(){
    if(!this.isSubmitted){
       if (this.disableAccountForm.controls.email.hasError('pattern')){
         return 'Invalid email format';
       }
    }
    else{
      if (this.disableAccountForm.controls.email.hasError('invalid')){
        this.isSubmitted = false;
        this.success = false;
        return 'User not found';
      }
      if (this.disableAccountForm.controls.email.hasError('duplicate')){
        this.isSubmitted = false;
        this.success = false;
        return 'Account already deactivated';
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(RequesterDetailsModalComponent, {
      data: {
        name: this.searchPoolMemberData[this.index].name,
        email: this.searchPoolMemberData[this.index].email,
        faculty: this.searchPoolMemberData[this.index].faculty,
        program: this.searchPoolMemberData[this.index].program,
        programStartDate: this.searchPoolMemberData[this.index].programStartDate,
        programEndDate: this.searchPoolMemberData[this.index].programEndDate,
        role: this.searchPoolMemberData[this.index].role,
        requestType: this.searchPoolMemberData[this.index].requestType,
        requestDate: this.searchPoolMemberData[this.index].requestDate,
        requestStatus: this.searchPoolMemberData[this.index].requestStatus,
        accessModificationType: this.searchPoolMemberData[this.index].accessModificationType,
        accessModificationDate: this.searchPoolMemberData[this.index].accessModificationDate,
        accessStatus: this.searchPoolMemberData[this.index].accessStatus,
        roleModificationDate: this.searchPoolMemberData[this.index].roleModificationDate,
        mode: this.searchPoolMemberData[this.index].mode
      }, width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.confirmed !== undefined && result.confirmed){
        if(result.requestType == 'Role Change')
          this.searchPoolMemberData[this.index].requestStatus = "Role Changed";
        else if(result.requestType == 'Deactivate Account')
          this.searchPoolMemberData[this.index].requestStatus = "Account Deactivated";
        else if(result.requestType == 'Remove Member')
          this.searchPoolMemberData[this.index].requestStatus = "Member Removed";

          this.memberData.push({
            name: 'John Doe',
            email: this.searchEmail,
            faculty: 'Computer Science',
            program: 'MACS',
            programStartDate: 'Winter 21',
            programEndDate: 'Summer 22',
            role: 'Mentee',
            requestType: result.requestType,
            requestDate: '2021-06-06 15:00:00',
            requestStatus: this.searchPoolMemberData[this.index].requestStatus,
            accessModificationType: '0000-00-00',
            accessModificationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            accessStatus: '',
            roleModificationDate: '0000-00-00',
            mode: 'C'
            //name: 'John Doe', email: searchValue, date: new Date().toISOString().slice(0, 19).replace('T', ' ')
          });
          this.dataSource.data = this.memberData;
      }
    });
  }
}
