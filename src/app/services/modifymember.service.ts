import { Injectable } from '@angular/core';
import { RequesterDetailsModalComponent } from '../components/request-list/requester-details-modal/requester-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MemberProfile } from 'src/app/models/member-profile';

@Injectable({
  providedIn: 'root'
})
export class ModifymemberService {

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

  constructor(private dialog: MatDialog) { }

  openDialog(index: number, searchEmail: string) {
    const dialogRef = this.dialog.open(RequesterDetailsModalComponent, {
      data: {
        name: this.searchPoolMemberData[index].name,
        email: this.searchPoolMemberData[index].email,
        faculty: this.searchPoolMemberData[index].faculty,
        program: this.searchPoolMemberData[index].program,
        programStartDate: this.searchPoolMemberData[index].programStartDate,
        programEndDate: this.searchPoolMemberData[index].programEndDate,
        role: this.searchPoolMemberData[index].role,
        requestType: this.searchPoolMemberData[index].requestType,
        requestDate: this.searchPoolMemberData[index].requestDate,
        requestStatus: this.searchPoolMemberData[index].requestStatus,
        accessModificationType: this.searchPoolMemberData[index].accessModificationType,
        accessModificationDate: this.searchPoolMemberData[index].accessModificationDate,
        accessStatus: this.searchPoolMemberData[index].accessStatus,
        roleModificationDate: this.searchPoolMemberData[index].roleModificationDate,
        mode: this.searchPoolMemberData[index].mode
      }, width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.confirmed !== undefined && result.confirmed){
        if(result.requestType == 'Role Change')
          this.searchPoolMemberData[index].requestStatus = "Role Changed";
        else if(result.requestType == 'Deactivate Account')
          this.searchPoolMemberData[index].requestStatus = "Account Deactivated";
        else if(result.requestType == 'Remove Member')
          this.searchPoolMemberData[index].requestStatus = "Member Removed";

        this.memberData.push({
          name: 'John Doe',
          email: searchEmail,
          faculty: 'Computer Science',
          program: 'MACS',
          programStartDate: 'Winter 21',
          programEndDate: 'Summer 22',
          role: 'Mentee',
          requestType: result.requestType,
          requestDate: '2021-06-06 15:00:00',
          requestStatus: this.searchPoolMemberData[index].requestStatus,
          accessModificationType: '0000-00-00',
          accessModificationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
          accessStatus: '',
          roleModificationDate: '0000-00-00',
          mode: 'C'
        });
      }
    });
  }
}
