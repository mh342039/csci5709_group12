import { Component, OnInit, Output, Inject, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from '../../../services/utilityservice.service';
import { HttpService } from 'src/app/services/httpservice.service';
import { ModifymemberService } from '../../../services/modifymember.service';
import * as moment from 'moment';

@Component({
  selector: 'app-requester-details-modal',
  templateUrl: './requester-details-modal.component.html',
  styleUrls: ['./requester-details-modal.component.css']
})
export class RequesterDetailsModalComponent implements OnInit {

  accepted: boolean;

  confirmed: boolean;

  originalRequestTypeValue: string;

  enableConfirmBtn: boolean = false;

  requestType: string;

  selectedType: string;

  selectedRole: string;

  originalRoleValue: string;

  isRoleChangeRequest: boolean;

  isDiffLess: boolean;

  ngOnInit(): void {
    if(this.data.mode === 'C'){
      this.selectedType = this.types[0];
      this.selectedRole = this.data.role;
    }
    else{
      this.selectedType = this.data.requestType;
      this.selectedRole = this.data.requestRole;
    }
    this.originalRequestTypeValue = this.selectedType;
    this.originalRoleValue = this.selectedRole;
    this.isRoleChangeRequest = true;
  }

  constructor(public dialogRef: MatDialogRef<RequesterDetailsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public util: UtilityService, private httpservice: HttpService, private dataservice: ModifymemberService) {
      dialogRef.disableClose = true;
      util.modalTitle="Member Details";
      if(data.mode == undefined)
        data.mode = 'C';
  }

  close(): void {
    this.dialogRef.close({event: 'close', data: this.data});
  }

  types = ['Role Change', 'Remove Member'];
  roles = ['Mentee', 'Mentor'];

  enableConfirm(typeValue: string, roleValue: string){
    if(this.originalRequestTypeValue != typeValue){
      this.enableConfirmBtn = true;
      this.selectedRole = this.originalRoleValue;
      this.isRoleChangeRequest = false;
    }
    else{
      if(typeValue === typeValue && this.originalRoleValue != roleValue){
        this.enableConfirmBtn = true;
        this.checkDiff();
      }
      else{
        this.enableConfirmBtn = false;
      }
    }
  }

  modifyUserRequest(action: string){
    this.data.requestStatus = action;
    this.data.modificationDate = new Date();
    if(action === 'Approved')
      this.data.isRegistered = true;
    else if(action === 'Declined')
      this.data.isRegistered = false;
    this.httpservice.putServiceCall('/peer-mentorship-registration/'+this.data._id, this.data)
    .subscribe((result:any)=>{
      if(result.status){
        this.accepted = true;
      }
    });
  }

  modifyUser(action: string){
    this.data.requestStatus = action;
    this.data.requestType = this.selectedType;
    this.data.modificationDate = new Date();
    if(this.data.requestType === 'Role Change'){
      this.data.role = this.selectedRole;
      this.httpservice.putServiceCall('/peer-mentorship-registration/'+this.data._id, this.data).subscribe((result:any)=>{
        if(result.status){
          console.log("User's role changed!");
        }
      });
    }
    else{
      this.data.isRegistered = false;
      this.httpservice.deleteServiceCall('/peer-mentorship-registration/'+this.data._id, this.data).subscribe((result:any)=>{
        if(result.status){
          console.log("User deleted!");
        }
      });
    }
    this.httpservice.getServiceCall('/modify-member/'+this.data.email)
    .subscribe((result:any)=>{
      if(result.status && result.data){
        this.httpservice.putServiceCall('/modify-member/'+result.data._id, this.data)
        .subscribe((result:any)=>{
          if(result.status){
            this.accepted = true;
            this.dataservice.isRecordUpdated = true;
            console.log("User updated in modified users!");
          }
        });
      }
      else{
        this.httpservice.postServiceCall('/modify-member/', this.data)
        .subscribe((result:any)=>{
          if(result.status){
            this.accepted = true;
            this.dataservice.isRecordUpdated = true;
            console.log("User added to modified users!");
          }
        });
      }
    });
  }

  checkDiff(){
    console.log(moment(moment.now()));
    console.log(moment(this.data.startDate, "MM/YYYY"));
    if(moment(moment.now()).diff(moment(this.data.startDate, "MM/YYYY"), 'months') <= 8
      && this.selectedType ==='Role Change' && this.selectedRole === 'Mentor'){
      this.isDiffLess = true;
    }
    else{
      this.isDiffLess = false;
    }
  }
}
